# Objectifs Carrières — site web

Site vitrine de **Objectifs Carrières**, organisme d'accompagnement de carrière **spécialiste du sanitaire et social** : bilan de compétences, VAE et VAE spécialisée (DEAS, DEAP, DEAES, DEME, DEES, DEEJE…).

> Site **statique** (HTML/CSS/JS vanilla, sans build). Design « vivant » : sections animées en continu (canvas) et un **diagramme de parcours** animé en signature. Dirigeante : **Florence Massol**. Certifié **Qualiopi**, référencé **Mon Compte Formation (EDOF)**.

## Direction artistique

Variante **féminine & chaleureuse** du style « institutionnel vivant » : on conserve l'élégance éditoriale (serif *Cormorant Garamond* + sans *Mulish*, filets fins, beaucoup d'air, animations sobres) mais on remplace le bleu nuit + bordeaux par une palette **aubergine + vieux-rose + or rosé + saumon**, sur un ivoire légèrement rosé.

| Token | Valeur | Usage |
|---|---|---|
| `--paper` | `#FBF6F1` | Fond principal (ivoire rosé) |
| `--ink` | `#2D2230` | Titres & texte fort (prune-charbon) |
| `--plum` | `#3B2140` | Sections sombres, pied de page (aubergine) |
| `--bordeaux` | `#A8466A` | **Accent principal**, CTA, filets (vieux-rose) |
| `--rose` | `#E6A9BD` | Accent sur fond sombre |
| `--saumon` | `#E6917A` | Touche chaude secondaire |
| `--gold` | `#C2996F` | Accent prestige, étoiles (or rosé) |
| `--blue` | `#8C6E94` | Secondaire (mauve / parme) |

Tous les tokens sont dans `:root` au début de `styles.css`.

## Structure

```
objectifs carrieres/
├── index.html                     ← accueil (hero + diagramme de parcours animé)
├── accompagnement.html            ← approche, méthode, Florence Massol & l'équipe (#equipe)
├── bilan-de-competences.html
├── vae.html                       ← VAE (général)
├── vae-sanitaire-social.html      ← VAE spécialisée (diplômes d'État) — page différenciante
├── secteur-sanitaire-social.html  ← spécialité & métiers du secteur
├── financement.html               ← CPF / EDOF / Transitions Pro / OPCO Santé…
├── temoignages.html               ← avis variés (authentiques)
├── contact.html                   ← formulaire (FormSubmit AJAX)
├── mentions-legales · confidentialite · cgv · accessibilite .html
├── 404.html
├── styles.css                     ← design system (tokens + composants + diagramme)
├── site.js                        ← header, menu mobile, reveal, compteurs, consentement
├── living.js · motifs.js          ← vie permanente (nuages, fil conducteur, croquis)
├── section-viz.js · live-scenes.js← visualisations animées (canvas) recolorées
├── logo.svg · favicon.svg · og-image.svg
├── robots.txt · sitemap.xml · vercel.json
└── README.md · BRIEF.md
```

Le moteur d'animations (`*.js`, et les classes `.sviz[data-viz]`, `.hero__scene[data-scene]`, `.reveal`, `[data-count]`) est repris du site **Élysée Formations** puis **recoloré** vers la palette ci-dessus (constantes `C` en tête de `section-viz.js` et `live-scenes.js`).

## Déploiement

Cible : **Vercel** (domaine `www.objectifs-carrieres.fr`). `vercel.json` active `cleanUrls` : les liens sans extension (`/vae`, `/contact`…) servent les fichiers `.html` correspondants. Aucune étape de build.

Aperçu local : n'importe quel serveur statique servant ce dossier (les liens sans extension nécessitent un serveur gérant les « clean URLs », ex. `npx serve`).

## ⚠️ À compléter par le client (placeholders `[À COMPLÉTER]`)

- **Coordonnées** : téléphone, e-mail de contact, adresse du siège.
- **Réception du formulaire de contact** : `contact.html` poste vers FormSubmit (adresse à confirmer/activer — voir commentaire dans le fichier).
- **Identité légale** : forme juridique & capital, RCS, n° TVA, hébergeur (pages légales).
- **Agréments** : n° de déclaration d'activité (NDA), n° + date de certification **Qualiopi** et organisme certificateur.
- **Indicateurs Qualiopi** : taux de réussite / satisfaction / abandon (les chiffres affichés sont **indicatifs** — voir commentaires `[À CONFIRMER]`).
- **Référent handicap** (page Accessibilité) et **médiateur de la consommation** (CGV).
- **Photo de Florence Massol** et de l'équipe (placeholders en place).
- **Témoignages** : remplacer/compléter par de vrais avis (déjà rédigés volontairement **variés** en longueur, ton et sujet — conserver cette diversité).
- **og-image** : un export **PNG** est recommandé pour les réseaux qui ne lisent pas le SVG.
