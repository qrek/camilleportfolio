import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

const rawProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_STUDIO_PROJECT_ID
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ??
  process.env.SANITY_STUDIO_DATASET ??
  'production'
const projectIdPattern = /^[a-z0-9-]+$/
const isValidProjectId = Boolean(rawProjectId && projectIdPattern.test(rawProjectId))
const projectId = isValidProjectId ? rawProjectId : 'placeholder-id'

export const isSanityConfigured = () => {
  return isValidProjectId
}

export const client = createClient({
  projectId,
  dataset,
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
