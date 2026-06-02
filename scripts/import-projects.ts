/**
 * Importe les projets statiques (lib/projects.ts) dans Sanity :
 * upload des images + création des documents `project`.
 *
 * Lancer :
 *   SANITY_API_TOKEN=xxx NEXT_PUBLIC_SANITY_PROJECT_ID=xxx \
 *   NEXT_PUBLIC_SANITY_DATASET=production npx tsx scripts/import-projects.ts
 *
 * Idempotent : relancer met à jour les mêmes documents (createOrReplace).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@sanity/client";
import { projects, type GalleryBlock } from "../lib/projects";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Manque NEXT_PUBLIC_SANITY_PROJECT_ID et/ou SANITY_API_TOKEN.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

const PUBLIC = join(process.cwd(), "public");
const assetCache = new Map<string, string>();

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Upload une image de /public (avec cache) → renvoie l'asset _id. */
async function uploadAsset(publicPath: string): Promise<string> {
  if (assetCache.has(publicPath)) return assetCache.get(publicPath)!;
  const filePath = join(PUBLIC, publicPath.replace(/^\//, ""));
  const buffer = readFileSync(filePath);
  const filename = publicPath.split("/").pop()!;
  const asset = await client.assets.upload("image", buffer, { filename });
  assetCache.set(publicPath, asset._id);
  console.log(`  ↑ ${filename}`);
  return asset._id;
}

async function imageRef(publicPath: string, key?: string) {
  const ref = await uploadAsset(publicPath);
  return {
    ...(key ? { _key: key } : {}),
    _type: "image",
    asset: { _type: "reference", _ref: ref },
  };
}

async function buildBlocks(blocks: GalleryBlock[] = []) {
  const out = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const srcs = b.type === "full" ? [b.src] : b.images;
    const layout =
      b.type === "full"
        ? "full"
        : b.type === "grid"
          ? "grid"
          : b.cols === 2
            ? "cols2"
            : "cols3";
    const images = [];
    for (let j = 0; j < srcs.length; j++) {
      images.push(await imageRef(srcs[j], `img-${i}-${j}`));
    }
    out.push({ _key: `block-${i}`, _type: "galleryBlock", layout, images });
  }
  return out;
}

async function run() {
  console.log(`Import vers ${projectId}/${dataset}\n`);
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    const slug = slugify(p.title);
    console.log(`• ${p.title} (${slug})`);

    const doc: Record<string, unknown> = {
      _id: `project.${slug}`,
      _type: "project",
      title: p.title,
      slug: { _type: "slug", current: slug },
      tags: p.tags ?? [],
      featured: p.featured ?? false,
      order: i,
    };
    if (p.bg) doc.bgColor = p.bg;
    if (p.description) doc.description = p.description;
    if (p.image) doc.coverImage = await imageRef(p.image);
    if (p.wordmark) doc.wordmark = await imageRef(p.wordmark);
    if (p.blocks) doc.blocks = await buildBlocks(p.blocks);

    await client.createOrReplace(doc as never);
  }
  console.log(`\n✅ ${projects.length} projets importés.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
