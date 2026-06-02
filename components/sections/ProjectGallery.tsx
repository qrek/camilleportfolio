import Image from "next/image";
import { cn } from "@/lib/cn";
import type { GalleryBlock } from "@/lib/projects";

function GalleryImage({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-fg/[0.04]", className)}>
      <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
    </div>
  );
}

/** Rend les blocs d'images d'une page projet, fidèles au découpage Figma. */
export function ProjectGallery({ blocks }: { blocks: GalleryBlock[] }) {
  return (
    <div className="flex w-full flex-col gap-3 px-3">
      {blocks.map((block, i) => {
        if (block.type === "full") {
          return (
            <GalleryImage key={i} src={block.src} className="aspect-[1417/690]" />
          );
        }
        if (block.type === "cols") {
          return (
            <div
              key={i}
              className={cn(
                "grid grid-cols-1 gap-3 sm:grid-cols-2",
                block.cols === 3 && "lg:grid-cols-3",
              )}
            >
              {block.images.map((src, j) => (
                <GalleryImage
                  key={j}
                  src={src}
                  className={block.cols === 3 ? "aspect-[3/4]" : "aspect-square"}
                />
              ))}
            </div>
          );
        }
        // grid
        return (
          <div
            key={i}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3"
          >
            {block.images.map((src, j) => (
              <GalleryImage key={j} src={src} className="aspect-[4/5]" />
            ))}
          </div>
        );
      })}
    </div>
  );
}
