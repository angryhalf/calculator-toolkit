import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "CalcHub", template: "%s · CalcHub" },
  description: "Create calculators and organize them by subject.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-svh bg-background text-foreground antialiased">
        <header className="border-b">
          <div className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-4">
            <Link href="/" className="text-sm font-semibold tracking-tight">ƒ CalcHub</Link>
            <Link href="/edit" className={buttonVariants({ size: "sm" })}>
              <Plus className="size-4" /> New calculator
            </Link>
          </div>
        </header>
        <main className="mx-auto w-full max-w-4xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
