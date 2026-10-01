# Mon site perso

Site construit avec [Astro](https://astro.build). Tout le contenu est en Markdown.

## Démarrer

```bash
nvm use          # Node 22 (voir .nvmrc)
npm install
npm run dev      # http://localhost:4321
npm run build    # génère le site statique dans dist/
```

## Personnaliser

Toutes les infos perso (nom, podcast, réseaux, newsletter, menu) sont dans **`src/site.config.ts`**.
Remplace aussi `public/avatar.svg` et `public/podcast-cover.svg` par tes images.

## Ajouter du contenu

Crée un fichier `.md` (ou `.mdx`) dans le bon dossier de `src/content/`. Le nom du fichier devient l'URL.

| Dossier     | Page        | Champs principaux |
|-------------|-------------|-------------------|
| `articles/` | `/articles` | `title`, `description`, `date`, `tags`, `draft` |
| `talks/`    | `/talks`    | `title`, `description`, `event`, `date`, `location`, `slides`, `video` (les dates futures vont dans l'agenda) |
| `podcast/`  | `/podcast`  | `title`, `description`, `number`, `date`, `duration`, `youtube` (lien de la vidéo), `audio` ou `embed`, `guests` |
| `retours/`  | `/retours`  | `title`, `date`, puis `episode: episode-1` (ton podcast) **ou** `podcast` + `url` + `rating` (autre podcast) |
| `idees/`    | `/idees`    | `title`, `description`, `date`, `status` : `graine`, `pousse` ou `arbre` |
| `projets/`  | `/projets`  | `title`, `description`, `url`, `repo`, `stack`, `status`, `featured`, `order` |
| `til/`      | `/til`      | `title`, `date`, `tags` |

Les pages `/uses`, `/now` et `/a-propos` se modifient directement dans `src/pages/*.md`.

Les fichiers de `src/content/` sont des exemples : supprime-les ou remplace-les.

## Importer mes articles Medium

```bash
npm run import:medium            # nouveaux articles en français
npm run import:medium -- --all   # toutes les langues
```

Le script lit le flux RSS de medium.com/@imenezzine et crée les articles manquants dans `src/content/articles/`
(les articles déjà importés sont ignorés). Chaque article garde un lien `canonical` vers Medium (bon pour le SEO).
Ajoute `translation: "<url>"` pour afficher un lien vers la version dans l'autre langue.
Limite : le flux Medium ne contient que les 10 derniers articles.

## Importer les épisodes du podcast (YouTube)

```bash
npm run import:youtube                  # nouveaux épisodes (flux RSS de la chaîne, Shorts ignorés)
npm run import:youtube -- <id>=<numéro> # une vidéo précise, avec son numéro d'épisode
```

Le numéro est lu dans le titre (« #17 ») ; sinon c'est le suivant. Les invité·es et les tags sont devinés
à partir du titre et de la description : relis le fichier créé dans `src/content/podcast/` avant de publier.

## Flux RSS

- `/rss.xml` : tout (articles, TIL, épisodes, talks passés)
- `/podcast/rss.xml` : uniquement les épisodes

## Mise en ligne

Le site est publié sur **https://imenezzine.github.io** par GitHub Pages.
À chaque `git push` sur `main`, le workflow `.github/workflows/deploy.yml` reconstruit et republie le site
(suivi dans l'onglet « Actions » du dépôt).

Pour utiliser un nom de domaine à toi (ex. `imenezzine.io`) : ajoute-le dans Settings → Pages → Custom domain,
puis mets-le dans `SITE.url` (`src/site.config.ts`).

L'agenda des talks est calculé au moment du build : relance un build de temps en temps (par exemple un build planifié chaque semaine).
