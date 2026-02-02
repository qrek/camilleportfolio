import { client, urlFor, isSanityConfigured } from '@/lib/sanity'
import { Project } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
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
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-16">
        <Link
          href="/"
          className="inline-block mb-8 text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Retour aux projets
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
              {project.category && (
                <span className="px-3 py-1 bg-gray-100 rounded-full">
                  {project.category}
                </span>
              )}
              {project.year && (
                <span className="px-3 py-1 bg-gray-100 rounded-full">
                  {project.year}
                </span>
              )}
              {project.client && (
                <span className="px-3 py-1 bg-gray-100 rounded-full">
                  Client: {project.client}
                </span>
              )}
            </div>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Voir le projet →
              </a>
            )}
          </div>

          {project.mainImage && (
            <div className="relative w-full aspect-video mb-12 rounded-lg overflow-hidden">
              <Image
                src={urlFor(project.mainImage).width(1200).height(675).url()}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {project.description && (
            <div className="prose prose-lg max-w-none mb-12">
              <PortableText value={project.description} />
            </div>
          )}

          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">Technologies utilisées</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Galerie</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.gallery.map((image, index) => (
                  <div key={index} className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={urlFor(image).width(800).height(600).url()}
                      alt={`${project.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
