# CLAUDE.md — camportfolio

Portfolio personnel. Ce fichier décrit les conventions du projet **et** la façon de traduire les
designs Figma en code via le serveur **Figma Dev Mode MCP**. Garde-le à jour quand la stack évolue.

---

## Stack

- **Framework** : Next.js (App Router) + React + **TypeScript** (strict)
- **Styling** : Tailwind CSS, avec les **design tokens en variables CSS** (`globals.css`) référencées
  depuis `tailwind.config.ts`
- **Build / runtime** : Next.js (`next dev`, `next build`)
- **Déploiement cible** : Vercel
- **Gestionnaire de paquets** : npm (un seul lockfile, `package-lock.json`)

> Le projet démarre vide. Au premier scaffolding, respecter l'arborescence ci-dessous plutôt que la
> structure par défaut de `create-next-app` si elle diffère.

---

## Structure du projet

```
camportfolio/
├─ app/                      # App Router : routes, layouts, pages
│  ├─ layout.tsx             # layout racine (fonts, <html>, providers)
│  ├─ page.tsx               # accueil
│  ├─ globals.css            # @tailwind + définition des CSS variables (tokens)
│  └─ (sections)/            # regrouper les sections du portfolio si besoin
├─ components/
│  ├─ ui/                    # primitives réutilisables (Button, Card, Tag…)
│  └─ sections/              # blocs de page composés (Hero, Projects, Contact…)
├─ lib/                      # helpers, utils (ex: cn())
├─ public/                   # assets statiques (images, fonts locales, favicons)
├─ tailwind.config.ts
└─ CLAUDE.md
```

**Conventions de nommage**
- Composants : `PascalCase` (fichier = nom du composant, ex `Button.tsx`).
- Un composant par fichier ; export nommé pour les primitives `ui/`, export default pour les pages.
- Utilitaires/hooks : `camelCase`. Hooks préfixés `use`.

---

## Design tokens

Source de vérité = **variables CSS** dans `app/globals.css`, exposées à Tailwind via
`tailwind.config.ts`. Les valeurs Figma (récupérées par `get_variable_defs`) doivent être mappées
sur ces variables — **ne jamais coder une couleur/espacement en dur** dans un composant.

```css
/* app/globals.css */
:root {
  /* couleurs sémantiques (pas de noms de couleur brute dans les composants) */
  --color-bg: 255 255 255;          /* format R G B pour <alpha-value> Tailwind */
  --color-fg: 17 17 17;
  --color-muted: 115 115 115;
  --color-accent: 99 102 241;
  --color-border: 229 229 229;

  /* rayons, espacements custom, etc. */
  --radius: 0.75rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: 10 10 10;
    --color-fg: 245 245 245;
    /* … */
  }
}
```

```ts
// tailwind.config.ts (extrait)
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        fg: "rgb(var(--color-fg) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
      },
      borderRadius: { DEFAULT: "var(--radius)" },
    },
  },
} satisfies Config;
```

**Règles**
- Couleurs → toujours via les tokens sémantiques (`bg-bg`, `text-fg`, `text-muted`, `bg-accent`…).
  Si Figma renvoie une couleur sans token correspondant, **créer le token** plutôt que la mettre en dur.
- Espacements / typo → utiliser l'échelle Tailwind. N'ajouter une valeur custom que si le design
  l'impose, et la nommer dans `tailwind.config.ts`.
- Mode sombre : géré par les variables CSS (`prefers-color-scheme`), pas par des classes `dark:`
  dupliquées partout.

---

## Composants

- **Primitives** dans `components/ui/` : sans état métier, stylées uniquement via tokens Tailwind,
  props typées, `className` mergé avec un helper `cn()` (clsx + tailwind-merge) dans `lib/cn.ts`.
- **Sections** dans `components/sections/` : composent les primitives pour former les blocs de page.
- Server Components par défaut ; ajouter `"use client"` seulement si interactivité/état/hooks.
- Accessibilité : balises sémantiques, `alt` sur les images, focus visible, contrastes respectés.
- Images : `next/image` pour tout asset bitmap ; SVG inline ou via composant pour les icônes.

---

## Workflow Figma → code (Dev Mode MCP)

Le serveur Figma tourne en local et lit **le nœud sélectionné** dans Figma Desktop (Dev Mode actif),
ou un nœud passé via **URL** (`https://figma.com/design/:fileKey/:name?node-id=1-2` → nodeId `1:2`).

Outils disponibles et ordre d'usage recommandé :

1. `get_metadata` — vue d'ensemble de la structure (IDs, types, tailles). Pour cartographier avant de générer.
2. `get_design_context` — génère le code UI d'un nœud. **Point d'entrée principal.**
3. `get_variable_defs` — récupère les variables (couleurs, typo, espacements) → mapper sur les tokens CSS ci-dessus.
4. `get_screenshot` — visuel de référence pour vérifier la fidélité.
5. `get_code_connect_map` / `add_code_connect_map` — relier un nœud Figma à un composant réel du repo.

**Règles de génération** (à appliquer systématiquement) :
- Produire du **TSX Next.js**, pas du HTML brut. Découper en composants `ui/` + `sections/`.
- Traduire les styles en **classes Tailwind utilisant les tokens**, jamais de valeurs en dur.
- **Réutiliser les composants existants** : avant de créer, vérifier `components/ui/` (et le Code
  Connect map) pour un composant équivalent.
- Toujours appeler `get_variable_defs` quand le design utilise des variables, pour aligner les tokens.
- Texte, ordre des éléments et hiérarchie sémantique = ceux du design ; ne pas inventer de contenu.

---

## Commandes

```bash
npm install      # installer les dépendances
npm run dev      # serveur de dev (http://localhost:3000)
npm run build    # build de prod
npm run lint     # lint
```

> Node installé via Homebrew (`/opt/homebrew/bin/node`). Versions de référence : Node 26, npm 11.
