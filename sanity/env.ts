export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

// On accepte les deux conventions de nommage :
// - NEXT_PUBLIC_SANITY_* : utilisées par l'app Next.js
// - SANITY_STUDIO_*      : utilisées par la CLI / le studio standalone
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  "";

/** Vrai quand le projet Sanity est configuré (sinon le site retombe sur les données statiques). */
export const isSanityConfigured = projectId.length > 0;
