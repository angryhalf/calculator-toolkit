"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { RESERVED_WORDS, evaluate } from "@/lib/evaluate";
import { calculatorUrl, isReserved, slugify } from "@/lib/slug";
import { mutate } from "@/lib/store";
import type { Calculator } from "@/lib/store";

export type FormState = { error: string } | null;

export async function saveCalculator(_prev: FormState, formData: FormData): Promise<FormState> {
  const id = (formData.get("id") as string | null) ?? undefined;
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const unit = String(formData.get("unit") ?? "").trim();
  const subjectName = String(formData.get("subject") ?? "").trim();
  const expression = String(formData.get("expression") ?? "").trim();

  // Input rows are submitted as parallel arrays.
  const labels = formData.getAll("label").map(String);
  const variables = formData.getAll("variable").map(String);
  const defaults = formData.getAll("default").map(String);
  const inputs = labels.map((label, i) => {
    const fallback = Number(defaults[i]);
    return {
      label: label.trim() || variables[i]?.trim() || "Value",
      variable: (variables[i] ?? "").trim(),
      defaultValue: Number.isFinite(fallback) ? fallback : 0,
    };
  });

  if (!name) return { error: "Name is required." };
  const slug = slugify(name);
  if (!slug) return { error: "The name needs at least one letter or digit." };

  const subject = subjectName ? slugify(subjectName) : null;
  if (subjectName && !subject) return { error: `"${subjectName}" can't be turned into a URL slug.` };
  if (subject && isReserved(subject)) return { error: `"${subjectName}" is a reserved subject name.` };

  const seen = new Set<string>();
  for (const input of inputs) {
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(input.variable)) {
      return { error: `Variable "${input.variable || "(blank)"}" must look like m, v0, or tax_rate.` };
    }
    if (RESERVED_WORDS.has(input.variable)) {
      return { error: `Variable "${input.variable}" is reserved (built-in function or constant).` };
    }
    if (seen.has(input.variable)) return { error: `Variable "${input.variable}" is used twice.` };
    seen.add(input.variable);
  }

  if (!expression) return { error: "Expression is required." };
  try {
    evaluate(expression, Object.fromEntries(inputs.map((i) => [i.variable, i.defaultValue])));
  } catch (error) {
    return { error: error instanceof Error ? `Expression: ${error.message}` : "Invalid expression." };
  }

  const error = await mutate<string | null>((calculators) => {
    if (calculators.some((c) => c.slug === slug && c.id !== id)) {
      return `A calculator with the slug "${slug}" already exists — pick a different name.`;
    }
    const data: Calculator = { id: id ?? randomUUID(), name, slug, description, subject, inputs, expression, unit };
    const index = calculators.findIndex((c) => c.id === id);
    if (index === -1) calculators.push(data);
    else calculators[index] = data;
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
