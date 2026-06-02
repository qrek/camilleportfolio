import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { projectId, dataset } from "./env";

const builder = imageUrlBuilder({ projectId: projectId || "placeholder", dataset });

/** Construit une URL d'image Sanity optimisée (CDN). */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
