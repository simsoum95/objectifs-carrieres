> ## 🧠 PROTOCOLE CHEF DE PROJET — obligatoire à CHAQUE demande (depuis le 19/08/2026)
> Olivier ne valide plus au coup par coup : chaque session travaille en chef de projet.
> **Lire `DOCTRINE-OLIVIER.md` (racine de ce repo) avant de traiter toute demande**, puis pour
> CHAQUE message de Shimon qui demande quelque chose (même une ligne écrite comme un vocal) :
> **1. Reformuler** la demande en demande complète contextualisée — l'INTENTION derrière la
> lettre — et l'afficher en tête de réponse. **2. Balayer** tout le produit : où ailleurs cette
> intention s'applique-t-elle ? Traiter le périmètre complet, pas le cas cité. **3. Appliquer la
> doctrine** ; décider seul ce qu'elle couvre. **4. N'escalader** que les vrais arbitrages
> (prix, légal, positionnement, suppression de fonction, argent, envois clients) — en LOT, avec
> recommandation. **5. Passe Olivier avant « fini »** : preuves (vérifs du site statique,
> captures regardées desktop+mobile), parcours réel bout-en-bout, chasse aux doublons et aux
> fonctions invisibles. **6. Chaque nouveau retour** d'Olivier ou de Shimon devient une règle
> dans `DOCTRINE-OLIVIER.md` le jour même. **7. Fin de session** : digest pour Olivier (livré /
> décisions prises / 2-3 arbitrages max avec recommandation).

# CLAUDE.md — Objectifs Carrières (site client Florence Massol)

> **Fichier de continuité — source officielle de l'état du projet.** À chaque session : lire ce
> fichier, puis `DOCTRINE-OLIVIER.md` (socle commun du groupe + règles spécifiques OC), puis
> `BRIEF.md` (le brief fondateur du site). Vérifier contre le code réel (le code fait foi),
> mettre à jour ce fichier avant toute interruption.

## Identité

- **Site client** : Objectifs Carrières, cliente **Florence Massol** (retours relayés par
  Olivier, qui relaie via Shimon — l'interlocuteur des sessions est toujours Shimon).
- **Site STATIQUE en HTML pur** (pas de framework, pas de build, pas de Node) : les pages sont
  des fichiers `.html` à la racine. Vérifier = ouvrir les pages, regarder les captures.
- Repo GitHub : `simsoum95/objectifs-carrieres` — domaine **objectifscarrieres.fr** (sans
  tiret ; toutes les références internes — canonical, OG, JSON-LD, contact@ — l'utilisent).
- Formulaire de contact : **FormSubmit** (voir la règle dédiée dans DOCTRINE-OLIVIER.md §6 —
  destinataire principal intouchable).

## État

- **Dormant depuis le 2026-06-12** (dernier commit `05fd289` : envoi du formulaire fluide,
  feedback ≤ 6 s). Aucun chantier ouvert connu. Toute reprise : relire `BRIEF.md`, balayer
  l'état réel des pages, puis appliquer le protocole ci-dessus.

## Process

- Commit/push simple sur `main` (messages en français, trailer
  `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`) ; `git pull --rebase` avant push.
- Après un push, prévenir du cache navigateur (Ctrl+Maj+R) avant tout « t'as rien fait ».
- Les règles de design, contenu, légal et pièges propres à ce site vivent dans
  `DOCTRINE-OLIVIER.md` §6 (dérivé d'Élysée SINGULARISÉ, scroll 100 % libre, avis variés,
  Kbis filtré RGPD, FormSubmit, letter-spacing…).
