/** Bloc de galerie pour une page projet. */
export type GalleryBlock =
  | { type: "full"; src: string }
  | { type: "cols"; cols: 2 | 3; images: string[] }
  | { type: "grid"; images: string[] };

export type Project = {
  /** Titre affiché en haut de la carte. */
  title: string;
  /** Tags affichés en bas de la carte. */
  tags: string[];
  /** Image de couverture / carte (dans /public). */
  image?: string;
  /** Couleur de fond (cartes graphiques sans photo). */
  bg?: string;
  /** Logotype SVG centré (cartes graphiques). */
  wordmark?: string;
  /** Carte pleine largeur (2 colonnes) sur desktop. */
  featured?: boolean;

  // --- Page projet ---
  /** Image de couverture (hero) de la page projet ; par défaut = `image`. */
  cover?: string;
  /** Paragraphe de présentation du projet. */
  description?: string;
  /** Blocs d'images de la page projet. */
  blocks?: GalleryBlock[];
};

const AUDIO = "/projects/audio";
const range = (dir: string, prefix: string, n: number) =>
  Array.from({ length: n }, (_, i) => `${dir}/${prefix}${i + 1}.jpg`);

export const projects: Project[] = [
  {
    title: "Santé Mentale Info Service",
    tags: ["Logotype", "Créations graphiques"],
    image: "/projects/sante-mentale.jpg",
    description:
      "Création du logotype de Santé Mentale Info Service dans le cadre du lancement d’un site internet, en collaboration avec Santé Publique France. Au sein de l’agence FCINQ, j’ai également participé au design de contenus pour les réseaux sociaux.",
    blocks: [{ type: "grid", images: range("/projects/sante", "g", 4) }],
  },
  {
    title: "Optic 2000",
    tags: [
      "Direction Artistique",
      "Design system",
      "Motion Design",
      "Design graphique",
      "Shooting & Post-production",
      "Montage",
    ],
    image: "/projects/optic-2000.jpg",
    cover: "/projects/optic/hero.jpg",
    description:
      "Lead designer sur l’accompagnement social media d’Optic 2000. Le travail a porté sur l’évolution de l’identité social media, à travers des recommandations stratégiques et visuelles guidant la production de contenus : shootings photo, editing, montage vidéo, motion design et créations graphiques pour les réseaux sociaux. Travail réalisé au sein de l’agence FCINQ.",
    blocks: [
      { type: "grid", images: range("/projects/optic", "c", 22) },
      { type: "cols", cols: 3, images: range("/projects/optic", "s", 6) },
      {
        type: "cols",
        cols: 2,
        images: ["/projects/optic/f1.jpg", "/projects/optic/f2.jpg"],
      },
      { type: "full", src: "/projects/optic/f3.jpg" },
    ],
  },
  {
    title: "Audio 2000",
    tags: ["Direction Artistique", "Design graphique", "Shooting & Post-production"],
    image: "/projects/audio-2000.jpg",
    description:
      "Dans la continuité du dispositif mis en place pour Optic 2000, accompagnement d’Audio 2000 sur l’évolution de son identité social media. Lead designer sur les recommandations stratégiques et visuelles et la production de contenus (shootings photo, montage vidéo, motion design et créations graphiques). Travail réalisé au sein de l’agence FCINQ.",
    blocks: [
      { type: "full", src: `${AUDIO}/moodboard.jpg` },
      {
        type: "cols",
        cols: 3,
        images: [`${AUDIO}/post-1.jpg`, `${AUDIO}/post-2.jpg`, `${AUDIO}/post-3.jpg`],
      },
      { type: "cols", cols: 2, images: [`${AUDIO}/visual-1.jpg`, `${AUDIO}/visual-2.jpg`] },
      {
        type: "grid",
        images: [
          ...range(AUDIO, "g", 7),
          "/projects/audio-2000.jpg",
          `${AUDIO}/visual-2.jpg`,
        ],
      },
    ],
  },
  {
    title: "Instax",
    tags: ["Print", "Campagne Publicitaire", "Création graphique"],
    image: "/projects/instax.jpg",
  },
  {
    title: "Le CiNey",
    tags: [
      "Identité de marque",
      "Direction Artistique",
      "Motion Design",
      "Supports de communication",
    ],
    image: "/projects/le-ciney.jpg",
    featured: true,
    description:
      "Création de l’identité graphique du CiNey, nouvel espace culturel et social de 1500 m² dédié au cinéma, à l’insertion des jeunes et au mieux-manger. Le projet comprend la conception du logo, de la charte graphique, des supports de communication ainsi que des créations digitales pour les réseaux sociaux.",
    blocks: [{ type: "grid", images: range("/projects/ciney", "g", 3) }],
  },
  {
    title: "Nossa - Terracaï",
    tags: ["Direction Artistique", "Création graphique", "Photographie"],
    image: "/projects/terracai.jpg",
    cover: "/projects/nossa/hero.jpg",
    description:
      "Direction artistique et photographie pour Nossa & Terracaï : création de contenus visuels et de supports digitaux mettant en valeur les produits à base d’açaï.",
    blocks: [
      {
        type: "grid",
        images: [...range("/projects/nossa", "g", 10), "/projects/terracai.jpg"],
      },
    ],
  },
  {
    title: "Patine",
    tags: ["Logotype", "Direction Artistique"],
    bg: "#1b2716",
    wordmark: "/projects/patine-wordmark.svg",
    cover: "/projects/patine/hero.jpg",
    description:
      "Création de l’identité visuelle et des supports print pour Patine, atelier d’encadrement : logotype, papeterie et déclinaisons graphiques.",
    blocks: [{ type: "grid", images: range("/projects/patine", "g", 4) }],
  },
  {
    title: "Others motion work",
    tags: ["Motion Design"],
    bg: "#551028",
  },
];
