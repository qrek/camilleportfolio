# Assets

Les visuels ont été **extraits automatiquement** depuis le fichier Figma via le serveur
Dev Mode MCP (qui sert les assets sur `http://localhost:3845/assets/<hash>`), puis
optimisés (redimensionnés ≤ ~1600–2200 px, JPEG q82). Aucun export manuel nécessaire.

## En place
- `projects/sante-mentale.jpg`, `optic-2000.jpg`, `audio-2000.jpg`, `instax.jpg`, `le-ciney.jpg`
- `about-portrait.jpg` (section About)
- `hero-blob.png` (blob 3D bleu du hero)
- `projects/patine-wordmark.svg` (logotype Patine)

Mapping côté code : champ `image` (ou `bg`/`wordmark`) dans `lib/projects.ts`.

## Re-télécharger / mettre à jour un asset
Tant que Figma Desktop tourne (Dev Mode actif), on peut redemander le code d'un nœud
(`get_design_context`) pour obtenir une URL `localhost:3845/assets/...` puis la télécharger.

## Approximations volontaires (cartes graphiques vectorielles)
- **Patine** : reconstruite (fond `#1b2716` + wordmark) — les repères de cadrage du design
  ne sont pas reproduits.
- **Others motion work** : fond `#551028` seul — le motif graphique central (centaines de
  vecteurs) n'est pas reproduit.
- Police d'affichage **« Exposure Italic »** (non libre) substituée par **Fraunces** (italique).
- La couleur du bloc contact utilise le token `accent` (indigo) — à confirmer/ajuster sur la valeur exacte du design.
