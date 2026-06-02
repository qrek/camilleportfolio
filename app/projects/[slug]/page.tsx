import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";
import { getProject, getProjectSlugs } from "@/lib/getProjects";
import { urlForImage } from "@/sanity/image";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Tag } from "@/components/ui/Tag";

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

const portableComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImageSource }) => (
      <span className="my-8 block overflow-hidden">
        <Image
          src={urlForImage(value).width(1400).quality(85).url()}
          alt=""
          width={1400}
          height={900}
          className="h-auto w-full object-cover"
        />
      </span>
    ),
  },
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const cover = project.cover || project.image;

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero pleine largeur */}
        <section
          className="relative h-[78vh] min-h-[460px] w-full overflow-hidden"
          style={project.bg ? { backgroundColor: project.bg } : undefined}
        >
          {cover && (
            <Image
              src={cover}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
        </section>

        {/* Intro : titre + description + tags */}
        <section className="w-full px-5 py-16 sm:px-8 lg:px-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <h1 className="font-serif text-5xl font-normal italic leading-[0.9] sm:text-6xl">
              {project.title}
            </h1>
            <div className="max-w-md">
              {project.description && (
                <p className="text-[16px] font-[450] leading-[1.4] text-fg">
                  {project.description}
                </p>
              )}
              {project.tags.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <Tag className="border-fg/40 bg-transparent text-fg">
                        {tag}
                      </Tag>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* Galerie (blocs statiques) ou contenu riche (Sanity) */}
        {project.blocks && project.blocks.length > 0 && (
          <ProjectGallery blocks={project.blocks} />
        )}
        {project.content && project.content.length > 0 && (
          <article className="mx-auto mt-12 max-w-2xl space-y-4 px-5 text-base leading-relaxed text-fg [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-2xl">
            <PortableText
              value={project.content}
              components={portableComponents}
            />
          </article>
        )}

        {/* Next project */}
        <div className="flex justify-center py-24">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-serif text-2xl font-normal italic transition hover:opacity-60"
          >
            Next project <span aria-hidden>→</span>
          </Link>
        </div>
      </main>
    </>
  );
}
