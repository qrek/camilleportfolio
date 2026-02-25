import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_STUDIO_PROJECT_ID
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ??
  process.env.SANITY_STUDIO_DATASET ??
  'production'
const projectIdPattern = /^[a-z0-9-]+$/

if (!projectId) {
  throw new Error(
    'Missing Sanity projectId. Set NEXT_PUBLIC_SANITY_PROJECT_ID (or SANITY_STUDIO_PROJECT_ID) in .env.local.',
  )
}
if (!projectIdPattern.test(projectId)) {
  throw new Error(
    `Invalid Sanity projectId "${projectId}". Use only lowercase letters, numbers, and dashes (a-z, 0-9, -).`,
  )
}

export default defineConfig({
  name: 'default',
  title: 'Camille Portfolio',

  projectId,
  dataset,

  plugins: [structureTool()],

  basePath: '/studio',

  schema: {
    types: schemaTypes,
  },
})
