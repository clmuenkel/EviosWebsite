import Link from "next/link";

export function Footer() {
  return (
    <footer className="px-6 py-12 sm:px-10">
      <div className="section-frame flex flex-col gap-4 border-t border-black/[0.06] pt-8 text-sm text-brand-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© Evios</p>
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/privacy" className="transition-colors hover:text-brand-accent">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-brand-accent">
            Terms
          </Link>
          <a
            href="mailto:zad@evioshq.com"
            className="transition-colors hover:text-brand-accent"
          >
            zad@evioshq.com
          </a>
        </div>
      </div>
    </footer>
  );
}
