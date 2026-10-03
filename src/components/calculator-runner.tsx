"use client";

import { useState, type FormEvent } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNumber, runFormula, type FormulaOutcome } from "@/lib/evaluate";
import type { Calculator } from "@/lib/store";

export function CalculatorRunner({ calculator }: { calculator: Calculator }) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(calculator.inputs.map((input) => [input.variable, String(input.defaultValue)])),
  );
  const [outcome, setOutcome] = useState<FormulaOutcome | null>(null);

  function calculate(event: FormEvent) {
    event.preventDefault();
    setOutcome(runFormula(calculator, values));
  }

  function reset() {
    setValues(Object.fromEntries(calculator.inputs.map((input) => [input.variable, String(input.defaultValue)])));
    setOutcome(null);
  }

  // Boolean only — property access below re-narrows via `outcome?.ok` directly,
  // since saving that check to a variable would lose TypeScript's narrowing.
  const hasSteps = outcome?.ok === true && outcome.steps.length > 0;

  return (
    <div className="space-y-6">
      <form onSubmit={calculate} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {calculator.inputs.length === 0 && (
            <p className="text-sm text-muted-foreground">This calculator has no inputs — it just evaluates the formula.</p>
          )}
          {calculator.inputs.map((input) => (
            <div key={input.variable} className="space-y-1.5">
              <Label htmlFor={input.variable}>{input.label}</Label>
              <Input
                id={input.variable}
                type="number"
                step="any"
                value={values[input.variable] ?? ""}
                onChange={(e) => setValues({ ...values, [input.variable]: e.target.value })}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Button type="submit">Calculate</Button>
          <Button type="button" variant="ghost" onClick={reset}>
            <RotateCcw className="size-4" /> Reset
          </Button>
        </div>
      </form>

      {/* Result and steps appear at the bottom only after Calculate is pressed. */}
      <div aria-live="polite">
        {outcome && !outcome.ok && (
          <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {outcome.error}
          </p>
        )}

        {outcome?.ok && (
          <div className={hasSteps ? "grid items-start gap-4 md:grid-cols-2" : undefined}>
            <div className="rounded-lg border bg-muted/40 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Result</p>
              {hasSteps && (
                <p className="mt-1 text-sm text-muted-foreground">{outcome.steps[outcome.steps.length - 1].label}</p>
              )}
              <p className="mt-1 break-words font-mono text-3xl font-semibold">
                {formatNumber(outcome.result)}
                {calculator.unit && (
                  <span className="ml-1.5 text-base font-normal text-muted-foreground">{calculator.unit}</span>
                )}
              </p>
            </div>

            {hasSteps && (
              <div className="rounded-lg border p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Steps</p>
                <ol className="mt-2 space-y-2">
                  {outcome.steps.map((step, index) => (
                    <li key={index} className="flex items-baseline justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm">{index + 1}. {step.label}</p>
                        <code className="block truncate text-xs text-muted-foreground">{step.expression}</code>
                      </div>
                      <span className="shrink-0 font-mono text-sm">{formatNumber(step.value)}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
