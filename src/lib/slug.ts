// Subject slugs can't collide with app routes.
const RESERVED = ["calculators", "edit", "new", "api"] as const;

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64)
    .replace(/-+$/g, "");
}

export function isReserved(slug: string): boolean {
  return (RESERVED as readonly string[]).includes(slug);
}

/** Turns an input or step label into the variable name formulas use.
 *  Anything in parentheses — units, notes — is dropped: "Mass (kg)" → "mass". */
export function variableFromLabel(label: string): string {
  return label
    .replace(/\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]/g, " ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 40)
    .replace(/_+$/g, "");
}

/** /<subject>/<slug> when grouped, /calculators/<slug> when not. */
export function calculatorUrl(calculator: { subject: string | null; slug: string }): string {
  return calculator.subject ? `/${calculator.subject}/${calculator.slug}` : `/calculators/${calculator.slug}`;
}

export function titleize(slug: string): string {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}
