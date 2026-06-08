import Image from "next/image";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import type { GalleryBlock } from "@/lib/projects";

function GalleryImage({
  src,
  className,
  speed = 0.12,
}: {
  src: string;
  className?: string;
  speed?: number;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-fg/[0.04]", className)}>
      <Parallax cover speed={speed}>
        <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
      </Parallax>
    </div>
  );
}

/** Rend les blocs d'images d'une page projet, fidèles au découpage Figma. */
export function ProjectGallery({ blocks }: { blocks: GalleryBlock[] }) {
  return (
    <div className="flex w-full flex-col gap-3 px-3">
      {blocks.map((block, i) => {
        let inner: React.ReactNode;
        if (block.type === "full") {
          inner = <GalleryImage src={block.src} className="aspect-[1417/690]" speed={0.16} />;
        } else if (block.type === "cols") {
          inner = (
            <div
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
                  speed={0.08 + (j % 3) * 0.05}
                />
              ))}
            </div>
          );
        } else {
          inner = (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {block.images.map((src, j) => (
                <GalleryImage
                  key={j}
                  src={src}
                  className="aspect-[4/5]"
                  speed={0.07 + (j % 4) * 0.04}
                />
              ))}
            </div>
          );
        }
        return <Reveal key={i}>{inner}</Reveal>;
      })}
    </div>
  );
}
