import { groq } from "next-sanity";

/** Liste des projets pour l'accueil, triés par `order` puis date de création. */
export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    tags,
    coverImage,
    bgColor,
    wordmark,
    featured,
    year
  }
`;

/** Un projet complet (page projet) par slug. */
export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    tags,
    coverImage,
    bgColor,
    wordmark,
    featured,
    year,
    description,
    blocks[]{ layout, images[] }
  }
`;

/** Tous les slugs (génération statique des pages projet). */
export const projectSlugsQuery = groq`
  *[_type == "project" && defined(slug.current)].slug.current
`;
