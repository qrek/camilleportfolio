import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-bg px-6 text-center">
      <div>
        <p className="font-serif text-6xl italic">404</p>
        <p className="mt-4 text-muted">Cette page n&apos;existe pas.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-fg/5"
        >
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
