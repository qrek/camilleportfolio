# Configuration de Sanity CMS

Ce guide vous aidera à configurer votre projet Sanity pour le portfolio.

## Étape 1 : Créer un compte Sanity

1. Allez sur [sanity.io](https://www.sanity.io/)
2. Cliquez sur "Get started" ou "Sign up"
3. Créez un compte avec Google, GitHub, ou email

## Étape 2 : Créer un nouveau projet

1. Une fois connecté, allez sur [sanity.io/manage](https://www.sanity.io/manage)
2. Cliquez sur "Create project"
3. Donnez un nom à votre projet (ex: "Portfolio Camille")
4. Choisissez un plan (le plan gratuit est suffisant pour commencer)

## Étape 3 : Créer un dataset

1. Dans votre nouveau projet, cliquez sur "Datasets" dans le menu latéral
2. Le dataset "production" devrait déjà exister
3. Si ce n'est pas le cas, créez-en un nommé "production"

## Étape 4 : Récupérer les identifiants

### Project ID

1. Dans le dashboard de votre projet, vous verrez le "Project ID" en haut de la page
2. Copiez cette valeur (format: `abc123xyz`)

### API Token

1. Dans le menu latéral, cliquez sur "API"
2. Cliquez sur "Tokens"
3. Cliquez sur "Add API token"
4. Donnez-lui un nom (ex: "Portfolio Website")
5. Sélectionnez les permissions "Editor" (ou "Administrator" si nécessaire)
6. Cliquez sur "Create"
7. **IMPORTANT** : Copiez immédiatement le token, vous ne pourrez plus le voir après !

## Étape 5 : Configurer les variables d'environnement

1. Ouvrez le fichier `.env.local` à la racine du projet
2. Remplacez les valeurs par les vôtres :

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz  # Votre Project ID
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk1234567890abcdef      # Votre API Token
```

3. Sauvegardez le fichier

## Étape 6 : Déployer le schéma Sanity

Pour que le studio Sanity connaisse la structure de vos données, vous devez déployer le schéma :

```bash
npx sanity deploy
```

Ou directement depuis le studio :

1. Lancez le serveur de développement : `npm run dev`
2. Allez sur [http://localhost:3000/studio](http://localhost:3000/studio)
3. Connectez-vous avec votre compte Sanity
4. Le studio devrait se charger automatiquement avec le schéma des projets

## Étape 7 : Ajouter votre premier projet

1. Dans le studio ([http://localhost:3000/studio](http://localhost:3000/studio))
2. Cliquez sur "Projet" dans le menu latéral
3. Cliquez sur "Create new Projet"
4. Remplissez au minimum :
   - Titre
   - Slug (cliquez sur "Generate" à côté du champ)
   - Image principale
   - Extrait
5. Cliquez sur "Publish"
6. Retournez sur la homepage ([http://localhost:3000](http://localhost:3000))
7. Votre projet devrait apparaître !

## Configuration CORS

Si vous déployez votre site en production, vous devrez autoriser le domaine dans Sanity :

1. Allez dans "API" > "CORS Origins"
2. Ajoutez votre domaine de production (ex: `https://votresite.com`)
3. Cochez "Allow credentials"

## Dépannage

### Le studio ne se charge pas

- Vérifiez que le Project ID est correct
- Vérifiez que vous êtes connecté au bon compte Sanity
- Vérifiez la console du navigateur pour des erreurs

### Les projets n'apparaissent pas sur le site

- Vérifiez que les projets sont bien "Published" (pas en brouillon)
- Vérifiez que les variables d'environnement sont correctes
- Redémarrez le serveur de développement

### Erreur de permissions

- Vérifiez que votre API Token a les bonnes permissions (Editor ou Administrator)
- Créez un nouveau token si nécessaire

## Besoin d'aide ?

Consultez la [documentation Sanity](https://www.sanity.io/docs) pour plus d'informations.
