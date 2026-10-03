// Tiny safe expression evaluator — no eval. Supports + - * / % ^ ( ), numbers,
// variables, the functions below, and the constants pi and e.
// Variable lookup is case-insensitive and label-aware (see defineVariable).

import { variableFromLabel } from "@/lib/slug";
import type { Calculator } from "@/lib/store";

const FUNCTIONS: Record<string, (...args: number[]) => number> = {
  sqrt: Math.sqrt, cbrt: Math.cbrt, abs: Math.abs, exp: Math.exp,
  ln: Math.log, log: Math.log10, log2: Math.log2,
  sin: Math.sin, cos: Math.cos, tan: Math.tan,
  asin: Math.asin, acos: Math.acos, atan: Math.atan,
  floor: Math.floor, ceil: Math.ceil, round: Math.round, sign: Math.sign,
  min: (...a) => Math.min(...a), max: (...a) => Math.max(...a),
  pow: (a, b) => a ** b, hypot: (...a) => Math.hypot(...a),
};

const CONSTANTS: Record<string, number> = { pi: Math.PI, e: Math.E };

/** Variable names users can't pick (already taken by functions/constants). */
export const RESERVED_WORDS = new Set([...Object.keys(FUNCTIONS), ...Object.keys(CONSTANTS)]);

type Token = { type: "num" | "name" | "op"; value: string };

function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  for (let i = 0; i < source.length; ) {
    const rest = source.slice(i);
    if (rest[0] === " ") { i += 1; continue; }
    const number = /^[0-9]*\.?[0-9]+/.exec(rest);
    if (number) { tokens.push({ type: "num", value: number[0] }); i += number[0].length; continue; }
    const name = /^[a-zA-Z_][a-zA-Z0-9_]*/.exec(rest);
    if (name) { tokens.push({ type: "name", value: name[0] }); i += name[0].length; continue; }
    if ("+-*/%^(),".includes(rest[0])) { tokens.push({ type: "op", value: rest[0] }); i += 1; continue; }
    throw new Error(`Unexpected character "${rest[0]}".`);
  }
  return tokens;
}

export function evaluate(expression: string, variables: Record<string, number>): number {
  const tokens = tokenize(expression);
  if (tokens.length === 0) throw new Error("Expression is empty.");

  let pos = 0;
  const peek = () => tokens[pos];
  const eat = (value: string) => {
    const token = peek();
    if (token?.type === "op" && token.value === value) {
      pos += 1;
      return true;
    }
    return false;
  };

  // Precedence ladder, loosest to tightest:
  // expression (+ -) → term (* / %) → unary (-x) → power (^) → primary.
  function parseExpression(): number {
    let value = parseTerm();
    for (;;) {
      if (eat("+")) value += parseTerm();
      else if (eat("-")) value -= parseTerm();
      else return value;
    }
  }

  function parseTerm(): number {
    let value = parseUnary();
    for (;;) {
      if (eat("*")) value *= parseUnary();
      else if (eat("/")) value /= parseUnary();
      else if (eat("%")) value %= parseUnary();
      else return value;
    }
  }

  // Unary minus binds tighter than * but looser than ^, so -2^2 = -(2^2) = -4.
  function parseUnary(): number {
    if (eat("-")) return -parseUnary();
    if (eat("+")) return parseUnary();
    return parsePower();
  }

  // Right-associative: 2^3^2 = 2^(3^2). parseUnary on the right also allows 2^-3.
  function parsePower(): number {
    const base = parsePrimary();
    if (eat("^")) return base ** parseUnary();
    return base;
  }

  function parsePrimary(): number {
    const token = tokens[pos];
    pos += 1;
    if (!token) throw new Error("Expression ends unexpectedly.");

    if (token.type === "num") {
      const value = Number(token.value);
      if (!Number.isFinite(value)) throw new Error(`"${token.value}" is not a valid number.`);
      return value;
    }

    if (token.type === "op" && token.value === "(") {
      const value = parseExpression();
      if (!eat(")")) throw new Error('Missing ")".');
      return value;
    }

    if (token.type === "name") {
      const name = token.value;
      if (eat("(")) {
        const args: number[] = [];
        if (!eat(")")) {
          do {
            args.push(parseExpression());
          } while (eat(","));
          if (!eat(")")) throw new Error('Missing ")".');
        }
        const fn = FUNCTIONS[name] ?? FUNCTIONS[name.toLowerCase()];
        if (!fn) throw new Error(`Unknown function "${name}".`);
        return fn(...args);
      }
      // Case-insensitive: try the exact spelling first, then lowercase.
      if (Object.hasOwn(variables, name)) return variables[name];
      const lower = name.toLowerCase();
      if (Object.hasOwn(variables, lower)) return variables[lower];
      if (Object.hasOwn(CONSTANTS, lower)) return CONSTANTS[lower];
      if (Object.hasOwn(FUNCTIONS, lower)) throw new Error(`"${name}" is a function — call it like ${name}(x).`);
      const hint = suggest(name, [...Object.keys(variables), ...Object.keys(CONSTANTS)]);
      throw new Error(`Unknown variable "${name}"${hint ? ` — did you mean "${hint}"?` : ""}.`);
    }

    throw new Error(`Unexpected "${token.value}".`);
  }

  const result = parseExpression();
  if (pos < tokens.length) throw new Error(`Unexpected "${tokens[pos].value}".`);
  return result;
}

/** Best close match for a misspelled name, or null. */
function suggest(name: string, candidates: string[]): string | null {
  const target = name.toLowerCase();
  let best: string | null = null;
  let bestDistance = 3; // only very close matches get suggested
  for (const candidate of candidates) {
    const distance = editDistance(target, candidate.toLowerCase());
    if (distance < bestDistance) {
      best = candidate;
      bestDistance = distance;
    }
  }
  return best;
}

function editDistance(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const temp = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = temp;
    }
  }
  return row[b.length];
}

export function formatNumber(value: number): string {
  return Number(value.toPrecision(12)).toLocaleString("en-US", { maximumFractionDigits: 10 });
}

// --- Whole-calculator evaluation --------------------------------------------

/** Registers a name in a formula's scope: the exact variable, its lowercase
 *  form, and an alias derived from the label — so "Mass (kg)" is usable as
 *  `mass` even if its stored variable is `m`. */
export function defineVariable(
  scope: Record<string, number>,
  label: string,
  variable: string,
  value: number,
): void {
  scope[variable] = value;
  const lower = variable.toLowerCase();
  if (!Object.hasOwn(scope, lower)) scope[lower] = value;
  const alias = variableFromLabel(label);
  if (alias && !Object.hasOwn(scope, alias)) scope[alias] = value;
}

export type StepOutcome = { label: string; expression: string; value: number };

export type FormulaOutcome =
  | { ok: true; steps: StepOutcome[]; result: number }
  | { ok: false; error: string };

/** Runs a calculator end to end: parses the input values, evaluates the formula
 *  step by step (each step can use inputs and earlier steps), and returns every
 *  intermediate value plus the final result. */
export function runFormula(calculator: Calculator, raw: Record<string, string>): FormulaOutcome {
  const variables: Record<string, number> = {};
  for (const input of calculator.inputs) {
    const text = raw[input.variable];
    const value = Number(text);
    if (text === undefined || text === "" || !Number.isFinite(value)) {
      return { ok: false, error: `Enter a number for "${input.label}".` };
    }
    variables[input.variable] = value;
  }

  // Narrowing only works when formula.kind is tested directly here — don't save
  // the comparison into a boolean first.
  const { formula } = calculator;
  const parts: { label: string; variable: string; expression: string }[] =
    formula.kind === "steps"
      ? formula.steps
      : [{ label: "Result", variable: "", expression: formula.expression }];

  const scope: Record<string, number> = {};
  for (const input of calculator.inputs) defineVariable(scope, input.label, input.variable, variables[input.variable]);

  const steps: StepOutcome[] = [];
  for (const [index, part] of parts.entries()) {
    let value: number;
    try {
      value = evaluate(part.expression, scope);
    } catch (error) {
      const at = formula.kind === "steps" ? ` in step ${index + 1} (${part.label})` : "";
      return { ok: false, error: `${error instanceof Error ? error.message : "Invalid expression."}${at}` };
    }
    if (!Number.isFinite(value)) {
      const at = formula.kind === "steps" ? ` in step ${index + 1}` : "";
      return { ok: false, error: `Non-finite number${at} — division by zero or out-of-domain operation?` };
    }
    if (part.variable) defineVariable(scope, part.label, part.variable, value);
    steps.push({ label: part.label, expression: part.expression, value });
  }

  const result = steps.at(-1)?.value;
  return result === undefined
    ? { ok: false, error: "The formula is empty." }
    : { ok: true, steps: formula.kind === "steps" ? steps : [], result };
}
