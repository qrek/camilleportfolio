import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projet',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait',
      type: 'text',
      rows: 3,
      description: 'Description courte pour la page d\'accueil',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie d\'images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Web', value: 'web' },
          { title: 'Mobile', value: 'mobile' },
          { title: 'Design', value: 'design' },
          { title: 'Branding', value: 'branding' },
        ],
      },
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Année',
      type: 'number',
    }),
    defineField({
      name: 'link',
      title: 'Lien externe',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Projet mis en avant',
      type: 'boolean',
      description: 'Afficher en premier sur la page d\'accueil',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Ordre',
      type: 'number',
      description: 'Ordre d\'affichage (plus petit en premier)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      category: 'category',
    },
    prepare(selection) {
      const { title, category } = selection
      return {
        ...selection,
        subtitle: category ? `Catégorie: ${category}` : 'Pas de catégorie',
      }
    },
  },
})
