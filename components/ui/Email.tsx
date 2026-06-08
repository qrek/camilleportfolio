"use client";

import { useEffect, useState } from "react";

/**
 * Adresse e-mail protégée du scraping : encodée en base64 et reconstruite
 * uniquement côté client (absente du HTML rendu serveur).
 */
const ENCODED = "Y2FtaWxsZS5hbWVsaW5lQGdtYWlsLmNvbQ==";

export function Email({ className }: { className?: string }) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(atob(ENCODED));
  }, []);

  if (!email) {
    return <span className={className}>e-mail protégé</span>;
  }

  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  );
}
