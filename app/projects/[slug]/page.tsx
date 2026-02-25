import { client, urlFor, isSanityConfigured } from '@/lib/sanity'
import { Project } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

async function getProject(slug: string): Promise<Project | null> {
  if (!isSanityConfigured()) {
    return null
  }

  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    slug,
    mainImage,
    excerpt,
    description,
    gallery,
    category,
    technologies,
    client,
    year,
    link,
    featured,
    order
  }`

  try {
    return await client.fetch(query, { slug })
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export async function generateStaticParams() {
  if (!isSanityConfigured()) {
    return []
  }

  try {
    const query = `*[_type == "project"] {
      "slug": slug.current
    }`
    const projects = await client.fetch(query)

    return projects.map((project: { slug: string }) => ({
      slug: project.slug,
    }))
  } catch (error) {
    console.error('Error fetching projects for static params:', error)
    return []
  }
}

export default async function ProjectPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#efefef]">
      <main className="w-full px-2 py-4 md:px-3 md:py-5">
        <Link
          href="/projects"
          className="mb-4 inline-block text-sm text-black/70 transition-opacity hover:opacity-60"
        >
          ← Retour aux projets
        </Link>

        <article>
          <section className="relative mb-2 w-full overflow-hidden rounded-xl bg-[#cfcfcf]">
            {project.mainImage ? (
              <div className="relative aspect-[16/7] min-h-[280px] w-full md:min-h-[520px]">
                <Image
                  src={urlFor(project.mainImage).width(2400).height(1200).url()}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="aspect-[16/7] min-h-[280px] w-full md:min-h-[520px]" />
            )}
          </section>

          <section className="border-t border-black/25 pt-4 md:pt-5">
            <div className="grid gap-4 md:grid-cols-[1fr_1.2fr_1.8fr] md:gap-6">
              <h1 className="text-3xl font-medium leading-none tracking-tight md:text-5xl">
                {project.title}
              </h1>

              <div className="flex flex-wrap content-start gap-2">
                {project.category && (
                  <span className="rounded-full border border-black/20 bg-white/40 px-3 py-1 text-xs">
                    {project.category}
                  </span>
                )}
                {project.year && (
                  <span className="rounded-full border border-black/20 bg-white/40 px-3 py-1 text-xs">
                    {project.year}
                  </span>
                )}
                {project.client && (
                  <span className="rounded-full border border-black/20 bg-white/40 px-3 py-1 text-xs">
                    {project.client}
                  </span>
                )}
                {project.technologies?.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-black/20 bg-white/40 px-3 py-1 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="space-y-3 text-base leading-relaxed text-black/80 md:text-[27px] md:leading-[1.1]">
                <p>
                  {project.excerpt ||
                    'Projet de direction artistique et de design visuel developpe autour d\'une identite forte, pensee pour des supports print et digitaux.'}
                </p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-medium uppercase tracking-[0.08em] text-black underline underline-offset-4"
                  >
                    Voir le projet
                  </a>
                )}
              </div>
            </div>
          </section>

          {project.gallery && project.gallery.length > 0 && (
            <section className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2">
              {project.gallery.map((image, index) => (
                <div key={index} className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                  <Image
                    src={urlFor(image).width(1400).height(900).url()}
                    alt={`${project.title} - image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </section>
          )}
        </article>
      </main>
    </div>
  )
}
