# Backoffice Sanity — mise en route

Le site utilise **Sanity** comme backoffice (CMS). Le studio d'administration tourne en
**standalone** via la CLI Sanity (il n'est pas embarqué dans le build Next, pour des raisons
de compatibilité Sanity v5 + Next 15).

Tant que le Project ID est vide, le site fonctionne avec les **données statiques**
(`lib/projects.ts`). Une fois Sanity configuré, l'accueil et les pages projet sont alimentés
depuis Sanity.

## 1. Créer le projet Sanity (une seule fois, nécessite ton compte)

À la racine du repo :

```bash
npx sanity login     # connexion via le navigateur (crée un compte gratuit si besoin)
npx sanity init      # choisis « use the default dataset config » → crée le projet + dataset "production"
```

Récupère le **Project ID** (affiché par la commande, ou sur https://sanity.io/manage) et
colle-le dans `.env.local`, dans **les deux** clés :

```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
SANITY_STUDIO_PROJECT_ID=xxxxxxxx
```

## 2. Lancer le backoffice (studio)

```bash
npx sanity dev       # studio sur http://localhost:3333
```

Pour l'héberger en ligne (URL `https://<nom>.sanity.studio`) :

```bash
npx sanity deploy
```

## 3. Lancer le site

```bash
npm run dev          # http://localhost:3000
```

## 4. Ajouter un projet

Dans le studio → **Projet → Create** :
- **Titre**, **Slug** (généré depuis le titre)
- **Tags**, **Image de couverture**
- **Couleur de fond** (cartes graphiques sans photo, ex `#1b2716`)
- **Pleine largeur** (mise en avant), **Ordre d'affichage**, **Année**
- **Contenu de la page projet** (texte riche + images)

Publie → le projet apparaît sur l'accueil et sa page `/projects/<slug>` est générée.

## Migrer les projets statiques actuels

Les 7 projets de `lib/projects.ts` (Santé Mentale, Optic 2000, …) servent de repli. Pour les
passer dans Sanity, les recréer dans le studio (ou on peut écrire un script d'import).

## Déploiement Vercel

Ajouter les variables `NEXT_PUBLIC_SANITY_*` dans les **Environment Variables** du projet Vercel.
Le studio, lui, se déploie séparément avec `npx sanity deploy` (hébergé par Sanity).
