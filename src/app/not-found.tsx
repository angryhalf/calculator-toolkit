import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-2 text-2xl font-semibold">Not found</h1>
      <p className="mt-1 text-muted-foreground">This calculator or subject doesn’t exist (or was renamed).</p>
      <Link href="/" className={buttonVariants({ className: "mt-6" })}>
        Back home
      </Link>
    </div>
  );
}
