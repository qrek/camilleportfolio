import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";
import { urlForImage } from "@/sanity/image";
import { isSanityConfigured } from "@/sanity/env";
import {
  projectsQuery,
  projectBySlugQuery,
  projectSlugsQuery,
} from "@/sanity/queries";
import {
  projects as staticProjects,
  type GalleryBlock,
} from "@/lib/projects";

/** Données d'une carte projet (accueil). */
export type CardProject = {
  title: string;
  slug: string;
  tags: string[];
  image?: string;
  bg?: string;
  wordmark?: string;
  featured?: boolean;
};

/** Projet complet (page projet). */
export type FullProject = CardProject & {
  year?: string;
  cover?: string;
  description?: string;
  blocks?: GalleryBlock[];
  content?: PortableTextBlock[];
};

type SanityBlock = {
  layout?: "full" | "cols2" | "cols3" | "grid";
  images?: SanityImageSource[];
};

type SanityProjectDoc = {
  title: string;
  slug: string;
  tags?: string[];
  coverImage?: SanityImageSource;
  bgColor?: string;
  wordmark?: SanityImageSource;
  featured?: boolean;
  year?: string;
  description?: string;
  blocks?: SanityBlock[];
  content?: PortableTextBlock[];
};

function img(source: SanityImageSource, width = 1400): string {
  return urlForImage(source).width(width).quality(85).url();
}

function mapBlocks(blocks?: SanityBlock[] | null): GalleryBlock[] {
  return (blocks ?? [])
    .map((b): GalleryBlock | null => {
      const images = (b.images ?? []).map((i) => img(i, 1400));
      if (images.length === 0) return null;
      if (b.layout === "full") return { type: "full", src: images[0] };
      if (b.layout === "cols2") return { type: "cols", cols: 2, images };
      if (b.layout === "cols3") return { type: "cols", cols: 3, images };
      return { type: "grid", images };
    })
    .filter((b): b is GalleryBlock => b !== null);
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getProjects(): Promise<CardProject[]> {
  if (isSanityConfigured) {
    const docs = await client.fetch<SanityProjectDoc[]>(projectsQuery);
    if (docs.length > 0) {
      return docs.map((d) => ({
        title: d.title,
        slug: d.slug,
        tags: d.tags ?? [],
        image: d.coverImage ? img(d.coverImage, 1600) : undefined,
        bg: d.bgColor || undefined,
        wordmark: d.wordmark ? img(d.wordmark, 600) : undefined,
        featured: d.featured || false,
      }));
    }
    // Sanity configuré mais vide → on garde les données statiques.
  }
  // Repli : données statiques.
  return staticProjects.map((p) => ({ ...p, slug: slugify(p.title) }));
}

export async function getProject(slug: string): Promise<FullProject | null> {
  if (isSanityConfigured) {
    const d = await client.fetch<SanityProjectDoc | null>(projectBySlugQuery, {
      slug,
    });
    if (d) {
      return {
        title: d.title,
        slug: d.slug,
        tags: d.tags ?? [],
        image: d.coverImage ? img(d.coverImage, 2000) : undefined,
        bg: d.bgColor || undefined,
        wordmark: d.wordmark ? img(d.wordmark, 600) : undefined,
        featured: d.featured || false,
        year: d.year,
        description: d.description,
        blocks: mapBlocks(d.blocks),
        content: d.content ?? [],
      };
    }
    // Pas dans Sanity → on tente le repli statique ci-dessous.
  }
  const p = staticProjects.find((x) => slugify(x.title) === slug);
  if (!p) return null;
  return { ...p, slug, content: [] };
}

export async function getProjectSlugs(): Promise<string[]> {
  if (isSanityConfigured) {
    const slugs = await client.fetch<string[]>(projectSlugsQuery);
    if (slugs.length > 0) return slugs;
  }
  return staticProjects.map((p) => slugify(p.title));
}
