import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Tag } from "@/components/ui/Tag";
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
        <Image
          src={image}
          alt={title}
          fill
          sizes={featured ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
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

      <h3 className="absolute inset-x-0 top-[5.4%] z-20 text-center font-serif text-[17px] italic leading-none text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.35)]">
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
