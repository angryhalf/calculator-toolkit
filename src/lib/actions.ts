"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { RESERVED_WORDS, defineVariable, evaluate } from "@/lib/evaluate";
import { calculatorUrl, isReserved, slugify, variableFromLabel } from "@/lib/slug";
import { mutate } from "@/lib/store";
import type { Calculator, CalculationStep } from "@/lib/store";

export type FormState = { error: string } | null;

const VARIABLE_PATTERN = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

type Row = { variable: string; explicit: boolean };

/** Validates one input/step row's variable against the shared `taken` set
 *  (updated with the lowercase name when the row passes). Returns an error
 *  message, or null. */
function validateRow(row: Row, taken: Set<string>, kind: "input" | "step", index: number): string | null {
  const at = `${kind} ${index + 1}`;
  if (!VARIABLE_PATTERN.test(row.variable)) {
    return kind === "input"
      ? `${at}: give it a label starting with a letter — the label becomes the formula variable, and units in parentheses are ignored (e.g. "Mass (kg)" → mass).`
      : `${at}: give it a label starting with a letter — it becomes the variable later steps can use.`;
  }
  // The evaluator resolves names case-insensitively, so reserved words must be
  // rejected case-insensitively too ("SQRT", "Pi", …). Only labels that were
  // auto-derived from text get this check; explicit variables (carried over
  // from existing calculators) are grandfathered.
  if (!row.explicit && RESERVED_WORDS.has(row.variable.toLowerCase())) {
    return `${at}: its label would become "${row.variable}", which is reserved — use a different label.`;
  }
  // Uniqueness applies to every row, explicit or derived — two inputs with the
  // same variable silently collide in the formula scope otherwise.
  const lower = row.variable.toLowerCase();
  if (taken.has(lower)) {
    return `"${row.variable}" is used by more than one input or step — labels must be distinct.`;
  }
  taken.add(lower);
  return null;
}

export async function saveCalculator(_prev: FormState, formData: FormData): Promise<FormState> {
  const id = (formData.get("id") as string | null) ?? undefined;
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const unit = String(formData.get("unit") ?? "").trim();
  const subjectName = String(formData.get("subject") ?? "").trim();
  const mode = formData.get("mode") === "steps" ? "steps" : "expression";

  // Rows arrive as parallel arrays. The variable field is hidden in the form —
  // blank means "derive it from the label".
  const labels = formData.getAll("label").map(String);
  const variables = formData.getAll("variable").map(String);
  const defaults = formData.getAll("default").map(String);
  const inputs = labels.map((label, i) => {
    const explicit = (variables[i] ?? "").trim();
    const derived = explicit || variableFromLabel(label);
    const fallback = Number(defaults[i]);
    return {
      label: label.trim() || derived,
      variable: derived,
      defaultValue: Number.isFinite(fallback) ? fallback : 0,
    };
  });

  if (!name) return { error: "Name is required." };
  const slug = slugify(name);
  if (!slug) return { error: "The name needs at least one letter or digit." };

  const subject = subjectName ? slugify(subjectName) : null;
  if (subjectName && !subject) return { error: `"${subjectName}" can't be turned into a URL slug.` };
  if (subject && isReserved(subject)) return { error: `"${subjectName}" is a reserved subject name.` };

  // Names must resolve uniquely, case-insensitively. Variables carried over
  // from existing calculators are grandfathered; newly derived ones are checked.
  const taken = new Set<string>();
  for (const [i, input] of inputs.entries()) {
    const explicit = (variables[i] ?? "").trim() !== "";
    const error = validateRow({ variable: input.variable, explicit }, taken, "input", i);
    if (error) return { error };
  }

  // Build the formula from whichever mode the form used.
  let formula: Calculator["formula"];
  if (mode === "steps") {
    const stepLabels = formData.getAll("stepLabel").map(String);
    const stepVariables = formData.getAll("stepVariable").map(String);
    const stepExpressions = formData.getAll("stepExpression").map(String);
    if (stepLabels.length === 0) return { error: "Add at least one step (or switch to a single expression)." };

    const steps: CalculationStep[] = [];
    for (let i = 0; i < stepLabels.length; i++) {
      const label = stepLabels[i].trim();
      const explicit = (stepVariables[i] ?? "").trim();
      const variable = explicit || variableFromLabel(label);
      const expression = (stepExpressions[i] ?? "").trim();
      const error = validateRow({ variable, explicit: explicit !== "" }, taken, "step", i);
      if (error) return { error };
      if (!expression) return { error: `Step ${i + 1}: expression is required.` };
      steps.push({ label: label || variable, variable, expression });
    }
    formula = { kind: "steps", steps };
  } else {
    const expression = String(formData.get("expression") ?? "").trim();
    if (!expression) return { error: "Expression is required." };
    formula = { kind: "expression", expression };
  }

  // Dry-run: check that every name in every expression resolves. Values don't
  // matter here — bad results (division by zero, sqrt of a negative, …) are
  // reported live when Calculate is pressed, not at save time.
  const scope: Record<string, number> = {};
  for (const input of inputs) defineVariable(scope, input.label, input.variable, input.defaultValue);

  if (formula.kind === "steps") {
    for (const [i, step] of formula.steps.entries()) {
      try {
        evaluate(step.expression, scope);
      } catch (error) {
        return { error: `Step ${i + 1} (${step.label}): ${error instanceof Error ? error.message : "invalid expression."}` };
      }
      defineVariable(scope, step.label, step.variable, 0);
    }
  } else {
    try {
      evaluate(formula.expression, scope);
    } catch (error) {
      return { error: `Expression: ${error instanceof Error ? error.message : "invalid expression."}` };
    }
  }

  const calculator: Calculator = { id: id ?? randomUUID(), name, slug, description, subject, inputs, formula, unit };
  const error = await mutate<string | null>((calculators) => {
    if (calculators.some((c) => c.slug === slug && c.id !== calculator.id)) {
      return `A calculator with the slug "${slug}" already exists — pick a different name.`;
    }
    const index = calculators.findIndex((c) => c.id === calculator.id);
    if (index === -1) calculators.push(calculator);
    else calculators[index] = calculator;
    return null;
  });

  if (error) return { error };
  redirect(calculatorUrl({ subject, slug }));
}

export async function deleteCalculator(id: string): Promise<void> {
  await mutate((calculators) => {
    const index = calculators.findIndex((c) => c.id === id);
    if (index !== -1) calculators.splice(index, 1);
  });
  redirect("/");
}

/** "Deleting" a subject just ungroups its calculators; they move to /calculators. */
export async function deleteSubject(slug: string): Promise<void> {
  await mutate((calculators) => {
    for (const calculator of calculators) {
      if (calculator.subject === slug) calculator.subject = null;
    }
  });
  redirect("/");
}
