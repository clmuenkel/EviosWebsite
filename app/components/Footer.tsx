import Link from "next/link";

export function Footer() {
  return (
    <footer className="px-6 py-12 sm:px-10">
      <div className="section-frame flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-brand-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© Evios</p>
        <div className="flex flex-wrap items-center gap-6">
          <Link href="/privacy" className="transition-colors hover:text-brand-text">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-brand-text">
            Terms
          </Link>
          <a
            href="mailto:zad@evioshq.com"
            className="transition-colors hover:text-brand-text"
          >
            zad@evioshq.com
          </a>
        </div>
      </div>
    </footer>
  );
}
