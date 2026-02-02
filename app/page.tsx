import { client, isSanityConfigured } from '@/lib/sanity'
import { Project } from '@/lib/sanity'
import ProjectCard from '@/components/ProjectCard'

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

export default async function Home() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-16">
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Camille
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Portfolio créatif présentant mes projets et réalisations.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">
              Aucun projet pour le moment.
            </p>
            <p className="text-gray-400">
              Ajoutez vos premiers projets depuis le{' '}
              <a href="/studio" className="text-blue-600 hover:underline">
                backoffice Sanity
              </a>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
