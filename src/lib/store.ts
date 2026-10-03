import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import { revalidatePath } from "next/cache";

export type CalculatorInput = { label: string; variable: string; defaultValue: number };

/** One step of a step-built formula. `variable` becomes usable in later steps. */
export type CalculationStep = { label: string; variable: string; expression: string };

export type Formula =
  | { kind: "expression"; expression: string }
  | { kind: "steps"; steps: CalculationStep[] };

export type Calculator = {
  id: string;
  name: string;
  slug: string;
  description: string;
  /** Subject slug — subjects exist only as long as a calculator references them. */
  subject: string | null;
  inputs: CalculatorInput[];
  formula: Formula;
  unit: string;
};

type Db = { calculators: Calculator[] };

/** Pre-formula data stored a bare `expression` string instead of a formula object. */
type StoredCalculator = Calculator & { expression?: string };

const DB_PATH = path.join(process.cwd(), "data", "calculators.json");

const SEED: Db = {
  calculators: [
    { id: "quadratic-root", name: "Quadratic Root", slug: "quadratic-root", description: "Larger real root of ax² + bx + c = 0.", subject: "math",
      inputs: [
        { label: "Coefficient a", variable: "a", defaultValue: 1 },
        { label: "Coefficient b", variable: "b", defaultValue: -3 },
        { label: "Coefficient c", variable: "c", defaultValue: 2 },
      ],
      formula: { kind: "steps", steps: [
        { label: "Discriminant (b² − 4ac)", variable: "discriminant", expression: "b^2 - 4*a*c" },
        { label: "Larger root", variable: "root", expression: "(-b + sqrt(discriminant)) / (2*a)" },
      ] },
      unit: "" },
    { id: "circle-area", name: "Circle Area", slug: "circle-area", description: "Area of a circle.", subject: "math",
      inputs: [{ label: "Radius", variable: "r", defaultValue: 5 }],
      formula: { kind: "expression", expression: "pi * r^2" }, unit: "m²" },
    { id: "hypotenuse", name: "Hypotenuse", slug: "hypotenuse", description: "Longest side of a right triangle.", subject: "math",
      inputs: [
        { label: "Side a", variable: "a", defaultValue: 3 },
        { label: "Side b", variable: "b", defaultValue: 4 },
      ],
      formula: { kind: "expression", expression: "sqrt(a^2 + b^2)" }, unit: "" },
    { id: "kinetic-energy", name: "Kinetic Energy", slug: "kinetic-energy", description: "Energy of a moving mass.", subject: "physics",
      inputs: [
        { label: "Mass (kg)", variable: "m", defaultValue: 70 },
        { label: "Velocity (m/s)", variable: "v", defaultValue: 10 },
      ],
      formula: { kind: "expression", expression: "0.5 * m * v^2" }, unit: "J" },
    { id: "free-fall-time", name: "Free Fall Time", slug: "free-fall-time", description: "Time to fall from a height, ignoring drag.", subject: "physics",
      inputs: [
        { label: "Height (m)", variable: "h", defaultValue: 20 },
        { label: "Gravity (m/s²)", variable: "g", defaultValue: 9.81 },
      ],
      formula: { kind: "expression", expression: "sqrt(2*h/g)" }, unit: "s" },
    { id: "compound-interest", name: "Compound Interest", slug: "compound-interest", description: "Future value of an investment.", subject: "finance",
      inputs: [
        { label: "Principal", variable: "P", defaultValue: 1000 },
        { label: "Annual rate (%)", variable: "r", defaultValue: 5 },
        { label: "Compounds per year", variable: "n", defaultValue: 12 },
        { label: "Years", variable: "t", defaultValue: 10 },
      ],
      formula: { kind: "steps", steps: [
        { label: "Rate per period", variable: "rate", expression: "r / (100 * n)" },
        { label: "Future value", variable: "future_value", expression: "P * (1 + rate)^(n * t)" },
      ] },
      unit: "" },
    { id: "tip-splitter", name: "Tip Splitter", slug: "tip-splitter", description: "Split a bill with tip.", subject: "finance",
      inputs: [
        { label: "Bill", variable: "bill", defaultValue: 84 },
        { label: "Tip (%)", variable: "tip", defaultValue: 15 },
        { label: "People", variable: "people", defaultValue: 3 },
      ],
      formula: { kind: "expression", expression: "bill * (1 + tip/100) / people" }, unit: "" },
    { id: "bmi", name: "BMI", slug: "bmi", description: "Body mass index.", subject: null,
      inputs: [
        { label: "Weight (kg)", variable: "weight", defaultValue: 70 },
        { label: "Height (m)", variable: "height", defaultValue: 1.75 },
      ],
      formula: { kind: "expression", expression: "weight / height^2" }, unit: "kg/m²" },
  ],
};

// All reads/writes go through one promise chain so they never interleave.
// NOTE: the lock only guards a single Node process. On serverless/multi-instance
// deployments (Vercel & co.) the file system is read-only or diverges per
// instance — swap this store for a real database (e.g. SQLite) to scale up.
let queue: Promise<unknown> = Promise.resolve();

function withLock<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

// Parsed-file cache keyed by mtimeMs + size, so repeated requests don't re-read
// and re-parse the JSON. Safe because every write goes through this process.
let cacheEntry: { key: string; db: Db } | null = null;

async function diskKey(): Promise<string | null> {
  try {
    const stat = await fs.stat(DB_PATH);
    return `${stat.mtimeMs}:${stat.size}`;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

function normalize(raw: StoredCalculator): Calculator {
  const { expression, ...rest } = raw;
  // Pre-formula data stored a bare `expression` string instead of a formula object.
  return rest.formula ? rest : { ...rest, formula: { kind: "expression", expression: expression ?? "" } };
}

/** Reads the database without locking — only call it from inside `withLock`. */
async function readUnlocked(): Promise<Db> {
  const key = await diskKey();
  if (key !== null && cacheEntry?.key === key) return cacheEntry.db;

  let db: Db;
  try {
    const parsed = JSON.parse(await fs.readFile(DB_PATH, "utf8")) as { calculators?: StoredCalculator[] };
    db = { calculators: (parsed.calculators ?? []).map(normalize) };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    // Fresh UUIDs per process so independently-seeded instances don't collide.
    db = { calculators: SEED.calculators.map((calculator) => ({ ...calculator, id: randomUUID() })) };
    await write(db);
  }
  if (key !== null) cacheEntry = { key, db };
  return db;
}

/** A deep copy of `db`, for cheap change detection in `mutate`. */
function snapshot(db: Db): string {
  return JSON.stringify(db);
}

/** Atomic write: temp file in the same directory, then rename over the target. */
async function write(db: Db): Promise<void> {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  const tmpPath = `${DB_PATH}.${process.pid}.${randomUUID()}.tmp`;
  await fs.writeFile(tmpPath, `${JSON.stringify(db, null, 2)}\n`, "utf8");
  await fs.rename(tmpPath, DB_PATH);
  const stat = await fs.stat(DB_PATH);
  cacheEntry = { key: `${stat.mtimeMs}:${stat.size}`, db };
}

/**
 * Request-scoped via React's `cache()`: `generateMetadata` and the page share
 * one read per request instead of two. Returns a fresh copy each call so
 * callers (e.g. `mutate`) can safely mutate the array before persisting it.
 */
export const getCalculators = cache(async (): Promise<Calculator[]> => {
  const db = await withLock(readUnlocked);
  return [...db.calculators];
});

/** Mutate the list in place and persist it. `fn` must be synchronous. */
export async function mutate<T>(fn: (calculators: Calculator[]) => T): Promise<T> {
  let changed = false;
  const result = await withLock(async () => {
    const db = await readUnlocked();
    const before = snapshot(db); // deep copy — fn mutates `db` in place
    const value = fn(db.calculators);
    changed = snapshot(db) !== before;
    // Skip the write when the mutation changed nothing, e.g. a slug collision
    // that returned an error before touching the list.
    if (changed) await write(db);
    return value;
  });
  if (changed) revalidatePath("/", "layout");
  return result;
}
