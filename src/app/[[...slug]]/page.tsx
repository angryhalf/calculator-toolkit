import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CalculatorForm } from "@/components/calculator-form";
import { CalculatorView, HomeView, SubjectView, UngroupedView } from "@/components/views";
import { titleize } from "@/lib/slug";
import { getCalculators } from "@/lib/store";

// Data lives in a JSON file that changes on every write, so always render on request.
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ id?: string; subject?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug = [] } = await params;
  const [a, b] = slug;
  if (!a) return {};
  if (a === "edit") return { title: "Calculator editor" };
  if (b) {
    const calculator = (await getCalculators()).find((c) => c.slug === b && c.subject === (a === "calculators" ? null : a));
    return { title: calculator?.name ?? "Not found" };
  }
  return { title: titleize(a) };
}

export default async function Page({ params, searchParams }: Props) {
  const [{ slug = [] }, query] = await Promise.all([params, searchParams]);
  if (slug.length > 2) notFound();

  const calculators = await getCalculators();
  const subjects = [...new Set(calculators.map((c) => c.subject).filter((s): s is string => s !== null))];
  const [a, b] = slug;

  // /edit — create, or update with ?id=
  if (a === "edit") {
    if (b) notFound();
    const calculator = query.id ? calculators.find((c) => c.id === query.id) : undefined;
    if (query.id && !calculator) notFound();
    return <CalculatorForm key={calculator?.id ?? "new"} subjects={subjects} calculator={calculator} initialSubject={query.subject} />;
  }

  // /calculators — ungrouped list · /calculators/<slug> — ungrouped calculator
  if (a === "calculators") {
    if (!b) return <UngroupedView calculators={calculators.filter((c) => c.subject === null)} />;
    const calculator = calculators.find((c) => c.subject === null && c.slug === b);
    return calculator ? <CalculatorView calculator={calculator} /> : notFound();
  }

  // / — home
  if (!a) return <HomeView calculators={calculators} subjects={subjects} />;

  // /<subject> — subject page (a subject exists only while it has calculators)
  if (!b) {
    const subjectCalculators = calculators.filter((c) => c.subject === a);
    return subjectCalculators.length > 0 ? <SubjectView slug={a} calculators={subjectCalculators} /> : notFound();
  }

  // /<subject>/<calculator>
  const calculator = calculators.find((c) => c.subject === a && c.slug === b);
  return calculator ? <CalculatorView calculator={calculator} /> : notFound();
}
