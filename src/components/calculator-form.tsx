"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Plus, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveCalculator } from "@/lib/actions";
import { calculatorUrl, variableFromLabel } from "@/lib/slug";
import type { Calculator } from "@/lib/store";

type InputRow = { label: string; variable: string; defaultValue: string };
type StepRow = { label: string; variable: string; expression: string };

/** The variable a row provides to formulas: its stored variable (existing
 *  calculators), or one derived from its current label. */
function variableOf(row: { label: string; variable: string }): string {
  return row.variable || variableFromLabel(row.label);
}

export function CalculatorForm({
  subjects,
  calculator,
  initialSubject = "",
}: {
  subjects: string[];
  calculator?: Calculator;
  initialSubject?: string;
}) {
  const [state, formAction, pending] = useActionState(saveCalculator, null);
  const [mode, setMode] = useState<"steps" | "expression">(
    calculator?.formula.kind === "steps" ? "steps" : "expression",
  );
  const [inputs, setInputs] = useState<InputRow[]>(
    calculator?.inputs.length
      ? calculator.inputs.map((i) => ({ label: i.label, variable: i.variable, defaultValue: String(i.defaultValue) }))
      : [{ label: "", variable: "", defaultValue: "" }],
  );
  const [steps, setSteps] = useState<StepRow[]>(
    calculator?.formula.kind === "steps" && calculator.formula.steps.length > 0
      ? calculator.formula.steps.map((s) => ({ label: s.label, variable: s.variable, expression: s.expression }))
      : [{ label: "", variable: "", expression: "" }],
  );
  const [expression, setExpression] = useState(
    calculator?.formula.kind === "expression" ? calculator.formula.expression : "",
  );

  const setInput = (index: number, patch: Partial<InputRow>) =>
    setInputs((rows) => rows.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  const setStep = (index: number, patch: Partial<StepRow>) =>
    setSteps((rows) => rows.map((row, i) => (i === index ? { ...row, ...patch } : row)));

  const inputNames = inputs.map(variableOf).filter(Boolean);
  const availableIn = (stepIndex: number) =>
    [...inputNames, ...steps.slice(0, stepIndex).map(variableOf)].filter(Boolean);

  return (
    <form action={formAction} className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{calculator ? "Edit calculator" : "New calculator"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Inputs are labeled numbers — reference them by name in the formula.</p>
      </div>

      {state?.error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</p>
      )}

      {calculator && <input type="hidden" name="id" value={calculator.id} />}

      <div className="space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={calculator?.name} placeholder="Kinetic Energy" required />
        <p className="text-xs text-muted-foreground">The URL comes from the name, e.g. /physics/kinetic-energy.</p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" name="subject" list="subjects" defaultValue={calculator?.subject ?? initialSubject} placeholder="physics" />
        <datalist id="subjects">
          {subjects.map((subject) => (
            <option key={subject} value={subject} />
          ))}
        </datalist>
        <p className="text-xs text-muted-foreground">
          Leave empty for an ungrouped calculator (/calculators/&lt;name&gt;). Typing something new creates that subject.
        </p>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" rows={2} defaultValue={calculator?.description} placeholder="What does it calculate?" />
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">Inputs</legend>
        {inputs.map((row, i) => (
          <div key={i} className="flex items-center gap-2">
            {/* Always submitted (even blank) so rows stay aligned. Blank = derive from label. */}
            <input type="hidden" name="variable" value={row.variable} />
            <Input className="flex-1" name="label" placeholder="e.g. Mass (kg)" value={row.label} onChange={(e) => setInput(i, { label: e.target.value })} />
            <Input className="w-28" name="default" type="number" step="any" placeholder="optional" value={row.defaultValue} onChange={(e) => setInput(i, { defaultValue: e.target.value })} />
            <Button type="button" variant="ghost" size="icon" aria-label="Remove input" onClick={() => setInputs((rows) => rows.filter((_, j) => j !== i))}>
              <X className="size-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={() => setInputs((rows) => [...rows, { label: "", variable: "", defaultValue: "" }])}>
          <Plus className="size-4" /> Add input
        </Button>
        <p className="text-xs text-muted-foreground">
          Labels become the variables used in formulas — units in parentheses are ignored, so “Mass (kg)” is{" "}
          <span className="font-mono">mass</span>. Defaults are optional.
        </p>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">Formula</legend>
        <div className="grid grid-cols-2 gap-1 rounded-lg border p-1">
          {(["steps", "expression"] as const).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                mode === value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"
              }`}
            >
              {value === "steps" ? "Build by steps" : "Single expression"}
            </button>
          ))}
        </div>
        <input type="hidden" name="mode" value={mode} />

        {mode === "steps" ? (
          <div className="space-y-2">
            {steps.map((row, i) => (
              <div key={i} className="space-y-2 rounded-lg border p-3">
                <input type="hidden" name="stepVariable" value={row.variable} />
                <div className="flex items-center gap-2">
                  <span className="shrink-0 text-xs font-medium text-muted-foreground">Step {i + 1}</span>
                  <Input name="stepLabel" placeholder="e.g. Discriminant — becomes a variable later steps can use" value={row.label} onChange={(e) => setStep(i, { label: e.target.value })} />
                  <Button type="button" variant="ghost" size="icon" aria-label="Remove step" onClick={() => setSteps((rows) => rows.filter((_, j) => j !== i))}>
                    <X className="size-4" />
                  </Button>
                </div>
                <Input
                  name="stepExpression"
                  className="font-mono"
                  placeholder="e.g. b^2 - 4*a*c"
                  value={row.expression}
                  onChange={(e) => setStep(i, { expression: e.target.value })}
                />
                <p className="text-xs text-muted-foreground">
                  Available: {availableIn(i).join(", ") || "add inputs first — their labels become variables"}
                </p>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={() => setSteps((rows) => [...rows, { label: "", variable: "", expression: "" }])}>
              <Plus className="size-4" /> Add step
            </Button>
            <p className="text-xs text-muted-foreground">
              Each step can use your inputs and earlier steps by name. The last step is the result.
            </p>
          </div>
        ) : (
          <div className="space-y-1.5">
            <Textarea
              name="expression"
              rows={2}
              className="font-mono"
              placeholder="0.5 * mass * velocity^2"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Available: {inputNames.join(", ") || "add inputs first — their labels become variables"}
            </p>
            <p className="text-xs text-muted-foreground">
              Operators + - * / % ^ · functions sqrt, abs, sin, cos, log, min, max… · constants pi, e
            </p>
          </div>
        )}
      </fieldset>

      <div className="space-y-1.5">
        <Label htmlFor="unit">Result unit</Label>
        <Input id="unit" name="unit" defaultValue={calculator?.unit} placeholder="J, m/s, kg…" />
      </div>

      <div className="flex justify-end gap-2">
        <Link href={calculator ? calculatorUrl(calculator) : "/"} className={buttonVariants({ variant: "ghost" })}>
          Cancel
        </Link>
        <Button type="submit" disabled={pending}>{calculator ? "Save changes" : "Create"}</Button>
      </div>
    </form>
  );
}
