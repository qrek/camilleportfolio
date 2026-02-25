import { client, isSanityConfigured } from '@/lib/sanity'
import { Project, urlFor } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'

async function getProjects(): Promise<Project[]> {
  if (!isSanityConfigured()) {
    return []
  }

  const query = `*[_type == "project"] | order(featured desc, order asc, _createdAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    mainImage,
    excerpt,
    category,
    featured,
    order
  }`

  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  const tilePatterns = [
    'md:col-span-1 md:row-span-1 aspect-[4/3] bg-[#d8d8d8]',
    'md:col-span-1 md:row-span-1 aspect-[4/3] bg-[#003c3a]',
    'md:col-span-1 md:row-span-1 aspect-[4/3] bg-[#b3a79e]',
    'md:col-span-1 md:row-span-1 aspect-[4/3] bg-[#dbdbdb]',
    'md:col-span-1 md:row-span-1 aspect-[4/3] bg-[#111111]',
    'md:col-span-1 md:row-span-1 aspect-[4/3] bg-[#f2f2f2]',
  ]

  return (
    <div className="min-h-screen bg-[#efefef]">
      <main className="w-full px-2 py-4 md:px-3 md:py-5">
        <Link
          href="/"
          className="mb-4 inline-block text-sm text-black/70 transition-opacity hover:opacity-60"
        >
          ← Retour à l&apos;accueil
        </Link>

        <div className="mb-4 border-b border-black/20 pb-3">
          <h1 className="text-3xl font-bold uppercase tracking-tight md:text-5xl">Projets</h1>
        </div>

        {projects.length === 0 ? (
          <div className="py-20 text-center">
            <p className="mb-4 text-lg text-gray-500">
              Aucun projet pour le moment.
            </p>
            <p className="text-gray-400">
              Ajoutez vos premiers projets depuis le{' '}
              <Link href="/studio" className="text-blue-600 hover:underline">
                backoffice Sanity
              </Link>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-1.5">
            {projects.map((project, index) => {
              const tileClass = tilePatterns[index % tilePatterns.length]
              return (
                <Link
                  key={project._id}
                  href={`/projects/${project.slug.current}`}
                  className={`group relative overflow-hidden rounded-xl ${tileClass}`}
                >
                  {project.mainImage ? (
                    <Image
                      src={urlFor(project.mainImage).width(1600).height(1200).url()}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="h-full w-full" />
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

                  <div className="absolute left-3 top-3 rounded-full bg-white/85 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-black backdrop-blur-sm">
                    {project.featured ? 'Featured' : 'Coming Soon'}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-4">
                    <h2 className="max-w-[22ch] text-lg font-semibold leading-tight text-white md:text-xl">
                      {project.title}
                    </h2>
                    {project.category && (
                      <span className="rounded-full border border-white/40 bg-black/20 px-2 py-1 text-[10px] uppercase tracking-[0.08em] text-white">
                        {project.category}
                      </span>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
