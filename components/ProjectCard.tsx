'use client'

import { Project, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link href={`/projects/${project.slug.current}`}>
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4">
          {project.mainImage ? (
            <Image
              src={urlFor(project.mainImage).width(800).height(600).url()}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Pas d&apos;image</span>
            </div>
          )}
          {project.featured && (
            <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-sm rounded-full">
              ★ En vedette
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-semibold group-hover:text-gray-600 transition-colors">
              {project.title}
            </h3>
            {project.category && (
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                {project.category}
              </span>
            )}
          </div>
          <p className="text-gray-600 line-clamp-2">
            {project.excerpt}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
