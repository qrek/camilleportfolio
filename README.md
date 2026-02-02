# Portfolio Camille

Site portfolio moderne construit avec Next.js, Tailwind CSS, Framer Motion et Sanity CMS.

## Technologies utilisées

- **[Next.js 16](https://nextjs.org)** - Framework React pour la production
- **[TypeScript](https://www.typescriptlang.org)** - Typage statique
- **[Tailwind CSS](https://tailwindcss.com)** - Framework CSS utility-first
- **[Framer Motion](https://www.framer.com/motion)** - Bibliothèque d'animations
- **[Sanity CMS](https://www.sanity.io)** - CMS headless pour la gestion de contenu

## Fonctionnalités

- Homepage avec liste des projets
- Pages projets individuelles avec détails complets
- Backoffice Sanity intégré pour gérer le contenu
- Animations fluides avec Framer Motion
- Design responsive
- Images optimisées avec Next.js Image
- TypeScript pour une meilleure DX

## Installation

1. Cloner le projet
2. Installer les dépendances :

```bash
npm install --legacy-peer-deps
```

3. Créer un compte Sanity sur [sanity.io](https://www.sanity.io) si ce n'est pas déjà fait

4. Créer un nouveau projet Sanity dans le dashboard et récupérer :
   - Le Project ID
   - Le dataset name (par défaut: "production")
   - Un token API avec les droits Editor

5. Copier le fichier `.env.local` et ajouter vos identifiants Sanity :

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=votre_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=votre_token_api
```

## Démarrage

Lancer le serveur de développement :

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Accéder au backoffice Sanity

Le studio Sanity est accessible à l'adresse :
[http://localhost:3000/studio](http://localhost:3000/studio)

Vous devrez vous connecter avec votre compte Sanity la première fois.

## Structure du projet

```
├── app/
│   ├── page.tsx              # Homepage avec liste des projets
│   ├── projects/[slug]/      # Pages projets individuelles
│   └── studio/               # Studio Sanity intégré
├── components/
│   └── ProjectCard.tsx       # Composant carte projet
├── lib/
│   └── sanity.ts            # Configuration client Sanity
├── sanity/
│   └── schemas/
│       ├── project.ts       # Schéma des projets
│       └── index.ts         # Export des schémas
└── sanity.config.ts         # Configuration Sanity Studio
```

## Gestion des projets

### Ajouter un projet

1. Aller sur [http://localhost:3000/studio](http://localhost:3000/studio)
2. Cliquer sur "Projet" dans le menu latéral
3. Cliquer sur "Create new Projet"
4. Remplir les champs :
   - **Titre** (requis) : Le nom du projet
   - **Slug** (requis) : L'URL du projet (généré automatiquement)
   - **Image principale** (requis) : L'image de couverture
   - **Extrait** (requis) : Description courte pour la homepage
   - **Description** : Texte riche pour la page détails
   - **Galerie d'images** : Images additionnelles
   - **Catégorie** : Web, Mobile, Design, ou Branding
   - **Technologies** : Liste des technologies utilisées
   - **Client** : Nom du client
   - **Année** : Année de réalisation
   - **Lien externe** : URL du projet en ligne
   - **Projet mis en avant** : Afficher en premier sur la homepage
   - **Ordre** : Ordre d'affichage (nombre, plus petit = premier)
5. Cliquer sur "Publish"

### Modifier un projet

1. Aller sur [http://localhost:3000/studio](http://localhost:3000/studio)
2. Cliquer sur le projet à modifier
3. Effectuer les modifications
4. Cliquer sur "Publish"

## Prochaines étapes

Cette base de travail est prête à être personnalisée selon vos besoins :

- Personnaliser les couleurs et le design dans [tailwind.config.ts](tailwind.config.ts)
- Ajouter des animations supplémentaires avec Framer Motion
- Créer des composants additionnels dans le dossier `components/`
- Ajouter d'autres types de contenu dans Sanity (à propos, contact, etc.)
- Personnaliser le layout et la navigation
- Ajouter des métadonnées SEO

## Déploiement

Le moyen le plus simple de déployer votre application Next.js est d'utiliser la [plateforme Vercel](https://vercel.com/new).

N'oubliez pas d'ajouter vos variables d'environnement dans les paramètres de votre projet Vercel.

## Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation Framer Motion](https://www.framer.com/motion)
- [Documentation Sanity](https://www.sanity.io/docs)
