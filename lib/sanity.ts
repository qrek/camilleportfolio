import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const isSanityConfigured = () => {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  return projectId && projectId !== 'placeholder-id' && projectId !== 'your_project_id'
}

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Types pour les projets
export interface Project {
  _id: string
  _createdAt: string
  title: string
  slug: {
    current: string
  }
  mainImage: {
    asset: {
      _ref: string
      _type: string
    }
  }
  excerpt: string
  description?: any[]
  gallery?: any[]
  category?: string
  technologies?: string[]
  client?: string
  year?: number
  link?: string
  featured?: boolean
  order?: number
}
