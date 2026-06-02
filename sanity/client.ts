import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  // "placeholder" évite une erreur d'init quand Sanity n'est pas encore configuré ;
  // aucune requête n'est lancée dans ce cas (cf. isSanityConfigured).
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: false, // lecture directe (toujours à jour) — adapté au faible trafic d'un portfolio
  perspective: "published", // ignore les brouillons → seul le contenu publié s'affiche
  // Token de lecture côté serveur uniquement (variable non NEXT_PUBLIC → jamais
  // envoyée au navigateur). Nécessaire car le dataset n'autorise pas la lecture anonyme.
  token: process.env.SANITY_API_TOKEN,
});
