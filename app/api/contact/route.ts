import { NextResponse } from "next/server";

/**
 * Réception du formulaire de contact. Stub : valide et renvoie un succès.
 * TODO : brancher un vrai envoi (Resend, Nodemailer, SMTP…) en utilisant
 * une clé API en variable d'environnement.
 */
export async function POST(request: Request) {
  const data = await request.json().catch(() => null);

  if (!data?.email || !data?.message) {
    return NextResponse.json(
      { ok: false, error: "Champs manquants." },
      { status: 400 },
    );
  }

  // Pour l'instant : log côté serveur (remplacer par un envoi réel).
  console.log("[contact] nouveau message", {
    name: data.name,
    email: data.email,
  });

  return NextResponse.json({ ok: true });
}
