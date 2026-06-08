import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Tag } from "@/components/ui/Tag";
import { Parallax } from "@/components/ui/Parallax";
import type { CardProject } from "@/lib/getProjects";

/**
 * Carte projet : visuel de fond (photo ou couleur), titre italique en haut,
 * tags en bas. Cliquable → page projet. Specs reprises du design Figma.
 */
export function ProjectCard({ project }: { project: CardProject }) {
  const { title, tags, image, bg, wordmark, featured, slug } = project;

  return (
    <Link
      href={`/projects/${slug}`}
      className={cn(
        "group relative isolate block cursor-pointer overflow-hidden",
        featured ? "aspect-[1416/555] md:col-span-2" : "aspect-[702/555]",
      )}
      style={bg ? { backgroundColor: bg } : undefined}
    >
      {image && (
        <Parallax cover speed={0.1}>
          <Image
            src={image}
            alt={title}
            fill
            sizes={featured ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Parallax>
      )}

      {wordmark && (
        <Image
          src={wordmark}
          alt=""
          width={352}
          height={92}
          unoptimized
          className="absolute left-1/2 top-1/2 w-[40%] -translate-x-1/2 -translate-y-1/2"
        />
      )}

      {/* Voile dégradé en haut : garantit la lisibilité du titre blanc. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[24%] bg-gradient-to-b from-black/40 to-transparent" />

      <h3 className="absolute inset-x-0 top-[5.4%] z-20 text-center font-sans text-[14px] font-normal leading-tight tracking-wide text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] sm:text-[16px]">
        {title}
      </h3>

      <ul className="absolute inset-x-0 bottom-[6.5%] z-20 flex flex-wrap items-center justify-center gap-2 px-4">
        {tags.map((tag) => (
          <li key={tag}>
            <Tag>{tag}</Tag>
          </li>
        ))}
      </ul>
    </Link>
  );
}
