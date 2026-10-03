import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { CalculatorRunner } from "@/components/calculator-runner";
import { deleteCalculator, deleteSubject } from "@/lib/actions";
import { calculatorUrl, titleize } from "@/lib/slug";
import type { Calculator } from "@/lib/store";

function Grid({ calculators }: { calculators: Calculator[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {calculators.map((calculator) => (
        <Link
          key={calculator.id}
          href={calculatorUrl(calculator)}
          className="block rounded-lg border p-4 transition-colors hover:border-foreground/25 hover:bg-accent"
        >
          <p className="font-medium">{calculator.name}</p>
          {calculator.description && <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{calculator.description}</p>}
        </Link>
      ))}
    </div>
  );
}

export function HomeView({ calculators }: { calculators: Calculator[] }) {
  const subjects = [...new Set(calculators.map((c) => c.subject).filter((s): s is string => s !== null))];
  const ungrouped = calculators.filter((c) => c.subject === null);

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Calculators</h1>
          <p className="text-sm text-muted-foreground">
            {calculators.length} calculator{calculators.length === 1 ? "" : "s"} across {subjects.length} subject{subjects.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link href="/edit" className={buttonVariants({ size: "sm" })}>
          <Plus className="size-4" /> New
        </Link>
      </div>

      {calculators.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <p className="font-medium">No calculators yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Create your first one — give it a subject to organize it.</p>
          <Link href="/edit" className={buttonVariants({ className: "mt-4" })}>
            <Plus className="size-4" /> New calculator
          </Link>
        </div>
      ) : (
        <>
          {subjects.map((subject) => (
            <section key={subject} className="space-y-2">
              <div className="flex items-baseline justify-between">
                <h2 className="font-semibold">
                  <Link href={`/${subject}`} className="hover:underline">{titleize(subject)}</Link>
                </h2>
                <Link href={`/edit?subject=${subject}`} className="text-xs text-muted-foreground hover:text-foreground">+ add</Link>
              </div>
              <Grid calculators={calculators.filter((c) => c.subject === subject)} />
            </section>
          ))}
          {ungrouped.length > 0 && (
            <section className="space-y-2">
              <div className="flex items-baseline justify-between">
                <h2 className="font-semibold">
                  <Link href="/calculators" className="hover:underline">Ungrouped</Link>
                </h2>
                <Link href="/edit" className="text-xs text-muted-foreground hover:text-foreground">+ add</Link>
              </div>
              <Grid calculators={ungrouped} />
            </section>
          )}
        </>
      )}
    </div>
  );
}

export function SubjectView({ slug, calculators }: { slug: string; calculators: Calculator[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{titleize(slug)}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            /{slug} · {calculators.length} calculator{calculators.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/edit?subject=${slug}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
            <Plus className="size-4" /> Add
          </Link>
          <form action={deleteSubject.bind(null, slug)}>
            <Button type="submit" size="sm" variant="ghost" className="text-destructive hover:text-destructive">
              Delete subject
            </Button>
          </form>
        </div>
      </div>
      <Grid calculators={calculators} />
    </div>
  );
}

export function UngroupedView({ calculators }: { calculators: Calculator[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Ungrouped</h1>
          <p className="mt-1 text-sm text-muted-foreground">Calculators without a subject — they live at /calculators/&lt;name&gt;</p>
        </div>
        <Link href="/edit" className={buttonVariants({ size: "sm" })}>
          <Plus className="size-4" /> Add
        </Link>
      </div>
      {calculators.length === 0 ? (
        <p className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          Nothing here — every calculator has a subject.
        </p>
      ) : (
        <Grid calculators={calculators} />
      )}
    </div>
  );
}

export function CalculatorView({ calculator }: { calculator: Calculator }) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{calculator.name}</h1>
          {calculator.description && <p className="mt-1 text-sm text-muted-foreground">{calculator.description}</p>}
        </div>
        <div className="flex shrink-0 gap-2">
          <Link href={`/edit?id=${calculator.id}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
            <Pencil className="size-4" /> Edit
          </Link>
          <form action={deleteCalculator.bind(null, calculator.id)}>
            <Button type="submit" size="sm" variant="ghost" className="text-destructive hover:text-destructive">
              Delete
            </Button>
          </form>
        </div>
      </div>

      {calculator.formula.kind === "expression" ? (
        <p className="rounded-lg border bg-muted/40 px-4 py-3 font-mono text-sm">{calculator.formula.expression}</p>
      ) : (
        <ol className="space-y-1">
          {calculator.formula.steps.map((step, index) => (
            <li key={step.variable} className="flex flex-wrap items-baseline gap-x-3 rounded-lg border bg-muted/40 px-4 py-2 text-sm">
              <span className="text-muted-foreground">
                {index + 1}. {step.label}
                {step.variable !== step.label && <span className="font-mono text-xs"> ({step.variable})</span>}
              </span>
              <code className="font-mono">{step.expression}</code>
            </li>
          ))}
        </ol>
      )}

      <CalculatorRunner calculator={calculator} />
    </div>
  );
}
