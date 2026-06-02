import { defineField, defineType, defineArrayMember } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Projet",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "coverImage",
      title: "Image de couverture",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bgColor",
      title: "Couleur de fond (si pas d'image)",
      type: "string",
      description: "Hex, ex: #1b2716. Pour les cartes graphiques sans photo.",
    }),
    defineField({
      name: "wordmark",
      title: "Logotype centré (cartes graphiques)",
      type: "image",
    }),
    defineField({
      name: "featured",
      title: "Pleine largeur (mise en avant)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Ordre d'affichage",
      type: "number",
      description: "Plus petit = affiché en premier.",
    }),
    defineField({ name: "year", title: "Année", type: "string" }),
    defineField({
      name: "description",
      title: "Description (page projet)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "blocks",
      title: "Galerie (page projet)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "galleryBlock",
          title: "Bloc d'images",
          fields: [
            defineField({
              name: "layout",
              title: "Disposition",
              type: "string",
              options: {
                list: [
                  { title: "Pleine largeur", value: "full" },
                  { title: "2 colonnes", value: "cols2" },
                  { title: "3 colonnes", value: "cols3" },
                  { title: "Grille", value: "grid" },
                ],
                layout: "radio",
              },
              initialValue: "full",
            }),
            defineField({
              name: "images",
              title: "Images",
              type: "array",
              of: [{ type: "image", options: { hotspot: true } }],
            }),
          ],
          preview: {
            select: { layout: "layout", images: "images" },
            prepare({ layout, images }) {
              const n = Array.isArray(images) ? images.length : 0;
              return { title: `${layout} — ${n} image(s)`, media: images?.[0] };
            },
          },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Ordre d'affichage",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: { select: { title: "title", media: "coverImage" } },
});
