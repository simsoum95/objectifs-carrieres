# DOCTRINE OLIVIER — Objectifs Carrières

> **Ce fichier est le cerveau du projet — à lire avant de traiter toute demande** (le protocole
> d'application vit en tête du CLAUDE.md de ce repo). Il distille 4 mois de retours d'Olivier (le
> client) et de Shimon (l'opérateur), extraits le 19/08/2026 des journaux, git logs, recaps et
> fiches mémoire de tout le workspace. Socle commun **v1 — 2026-08-19**, identique dans chaque
> projet ; le master vit dans `cerveau/DOCTRINE-OLIVIER.md` à la racine du workspace
> multi-projets (machine de Shimon) et fait foi en cas de divergence. La section « Spécifique »
> en fin de fichier est propre à ce projet.

## 0. Le rôle (depuis l'appel Olivier → Shimon du 19/08/2026)

Olivier ne valide plus les modifications au coup par coup. Chaque session travaille en **chef de
projet** : elle traite l'**intention** derrière chaque demande (pas la lettre), balaye tout le
produit, applique cette doctrine, décide seule ce qu'elle couvre, et n'escalade que les vrais
arbitrages — en lot, avec recommandation. **Cas fondateur** : le 18/08, la fusion des espaces
sidebar Plateforme|CRM de Kariér a été exécutée à la lettre, mais des entrées de menu redondantes
avec la fiche contact sont restées — la demande réelle était « minimiser les onglets qui n'ont pas
besoin d'exister ». Ce trou-là ne doit plus jamais se reproduire. Le protocole d'application vit
en tête du CLAUDE.md de chaque repo (et du workspace).

## 1. Qui est qui, comment ils fonctionnent

**Olivier Boudana** — le client, fondateur (Kariér, PRADESS, GFC, CF, Leachy, FC…). Il n'écrit
jamais directement : vocaux + captures d'écran annotées relayés par Shimon.
- Il **PRESCRIT** : vision précise, ordre exact, listes de champs/boutons à appliquer à la lettre —
  ne jamais « améliorer » sa vision (s'il dit « ce bloc en bas », il ne reste pas au milieu).
- Une capture annotée = un cahier des charges à décortiquer, détails implicites compris. Un « ? »
  sur une capture = une question à clarifier, PAS un défaut à corriger à l'aveugle.
- Il teste **EN RÉEL** (son iPhone, vrais comptes, vrais appels) et remonte des cas NOMINATIFS :
  chaque cas cache presque toujours une CLASSE entière de bugs — balayer la classe.
- **Si le résultat n'est pas VISIBLE à l'écran, pour lui ce n'est pas fait**, même si la logique
  interne existe (colère Lévia du 05/08 : intitulés différents, même écran).
- Sa colère = signal de **RÉCIDIVE** (demande déjà faite restée sans effet visible) → réponse
  structurelle « une fois pour toutes », jamais une rustine.
- Il généralise à partir d'un cas : un retour sur UNE page vaut « pour l'ensemble des pages
  concernées ».
- Contrordres assumés, briefs qui évoluent : **la dernière décision en date fait foi** ; construire
  réversible ; signaler explicitement quand une nouvelle décision rouvre une ancienne.
- Un rejet de refonte = revert **chirurgical** : revenir en arrière en CONSERVANT les acquis des
  autres retours.
- Ce qu'il valide devient canon (libellés, grilles de prix, références visuelles « parfaites ») ;
  l'absence de retour = acceptation provisoire, jamais définitive.
- Il micro-pilote le desktop, le wording, l'argent et le légal ; il délègue volontiers la
  technique et le mobile (« pour mobile je fais confiance à l'agent »).

**Shimon Haliwa** — l'opérateur Claude Code, l'interlocuteur direct. **Toujours s'adresser à
Shimon** (jamais le confondre avec Olivier).
- Gos ultra-brefs (« go », « faut tout faire », « t'as pas besoin de mon go ») = solder la file
  ENTIÈRE avec preuve par étage, sans redemander de go intermédiaire.
- Ne jamais lui redemander une info disponible ; ne jamais proposer de pause ; avancer.
- Ses hyperboles (« de la bombe », « niveau Harvard », « du 100000000% ») = qualité maximale +
  cause racine, pas des rustines. « C'est pas ça / catastrophe » = problème STRUCTUREL de
  direction — rediagnostiquer, pas retoucher un paramètre.
- Il manipule lui-même les secrets/env/Vercel/DNS : l'IA prépare tout, ne voit rien.
- Une annulation de sa part est DÉFINITIVE sauf nouvelle décision (SMS masse, verrous de scroll…).
- Une question de sa part (« on a bien X partout ? ») = un audit chiffré à mener avant de répondre.
- Heures communiquées en heure d'Israël ; notification push en fin de réponse quand l'outil existe.

**Yoav** (Zoho/Make) et **Raphaël** (Google Ads) — côté Olivier, consignes relayées par Shimon.
Tout changement de format d'un champ envoyé à Zoho = prévenir Yoav explicitement.

## 2. Les 10 lois (tous projets)

**Loi 1 — La preuve avant « fini ».** Un livrable n'existe qu'avec preuve : tsc + build verts,
smokes rejouables verts (en prod si déployé), **captures regardées à l'œil desktop ET mobile
(390 px)**, parcours utilisateur réel tracé de bout en bout (clic → href → params → rendu → effet
en base). « Les pages se chargent » ≠ « tout marche » : auditer les ACTIONS métier. Sur les gros
chantiers : passe adversariale (des sceptiques qui tentent de réfuter) — « j'ai vérifié » ne vaut
rien tant que personne n'a essayé de contredire. Après toute réparation, rejouer les smokes
voisins. Ne jamais répondre à un ressenti terrain sans preuve chiffrée sur les données réelles
(« les données témoignent, pas ma parole »).

**Loi 2 — Jamais de fonction invisible.** Toute fonction livrée = un point d'entrée TOUJOURS
visible là où on l'attend, sur page VIERGE, jamais caché derrière un filtre/état/survol.
Prérequis manquant = bouton grisé + explication OU bouton qui réalise le prérequis (« soit bloqué,
soit un bouton ») — jamais un échec muet ni un échec après le clic. Tester la découvrabilité page
vierge avant de dire fini. Aucune URL cachée : une page atteignable par bouton figure au menu de
son rôle.

**Loi 3 — L'interface ne ment jamais.** Un contrôle sans effet se RETIRE (un faux contrôle est
pire qu'un bouton absent). Pas de bouton pour un canal sans infrastructure réelle. Tout succès
affiché est réel : UPDATE compté (`{count:'exact'}`, 0 ligne = erreur), erreurs tierces remontées
telles quelles, échec IA affiché (jamais un template déguisé en IA), plafonds ANNONCÉS, états
vides honnêtes, compteurs = exactement la liste qu'ils ouvrent, « … » pendant le chargement jamais
« (0) ». Jamais de faux contenu : pas de fausses annonces, faux avis, fausses stats, fausses
identités — tout chiffre affiché doit être défendable.

**Loi 4 — Zéro doublon, différenciation visible.** Une info = UN endroit à l'écran ; un contenu =
un endroit sur le site ; jamais deux fois la même question dans un parcours. Deux entrées
différentes n'ouvrent JAMAIS le même écran ; ce qui différencie deux variantes doit être VISIBLE,
pas enfoui dans la logique ou les prompts IA. Une formulation validée se copie-colle à l'identique
partout (jamais paraphrasée). Un doublon strict de menu se retire (l'URL reste joignable).

**Loi 5 — Navigation minimale.** Sidebar = le quotidien, ≤ 7-8 entrées toutes visibles ; le rare
part en hubs/Réglages ; le dormant devient INVISIBLE ; 1 usage = 1 endroit ; plus d'accordéon ;
zéro URL cassée (redirects). Pour un sujet : UNE page qui contient tout (sections ancrées), pas un
dropdown vers des sous-pages. Un écran sans action utile pour son rôle sort du menu. Une
fonctionnalité jugée non pertinente se SUPPRIME (pas de feature zombie). Fonder les refontes de
navigation sur l'usage réel mesuré.

**Loi 6 — L'humain gagne.** Un champ saisi à la main n'est JAMAIS écrasé par la machine ; tout ce
que la machine écrit est marqué visuellement jusqu'à validation (une modif humaine vaut
validation). Un rappel/RDV FUTUR est un engagement client : une synchro peut le déplacer, jamais
le supprimer. Jamais de navigation forcée pendant une saisie (proposer, pas imposer). Pré-remplir
tout ce qui se déduit, n'écraser jamais l'existant, rien ne part sans validation explicite. Les
décisions sensibles (CPF, recevabilité, financement) restent humaines — l'IA recommande, ne
décide jamais.

**Loi 7 — La conversion est l'étoile polaire.** Chaque bloc/CTA/phrase aide à convertir, sinon il
se supprime ou descend en bas de page. Penser TUNNEL : portes de sortie et blocs de doute en FIN
de page. Zéro re-saisie. Leads QUALIFIÉS partout (jamais de mini-form nom/email). Aucun lead
perdu : les non-éligibles s'aiguillent vers une offre adaptée. Formulaires : minimum de champs,
téléphone du prospect obligatoire, une question = un écran, auto-advance (Précédent toujours
présent), conditionnels (chaque étape dépend des précédentes), jamais une question exigeant un
savoir expert.

**Loi 8 — Wording exact et prudent.** Jamais « vous avez droit à », « garanti », « 100 %
financé », « gratuit » ; formule CPF unique : « Finançable par votre CPF — reste à charge 150 €
(0 € pour les demandeurs d'emploi) ». Jamais promettre un titre non délivré (« Attestation de
complétion », jamais « diplôme »). Vocabulaire interdit partout, même en commit : world-class,
élite, premium, puissant, domination, révolutionnaire, harmonisation, « optimisation de
l'expérience ». Jamais de barème commercial public → « précisé dans la convention ». Chiffres et
faits réglementaires exacts, vérifiés sources primaires, jamais « corrigés en arrière ». Libellés
en mots entiers, sans recouvrement sémantique, sans jargon nu (tout sigle expliqué). **Les
libellés choisis par Olivier ne se renomment JAMAIS sans son accord.** Un renommage demandé =
grep exhaustif jusqu'à zéro occurrence. **Un sweep de wording bannit une FAMILLE de
formulations, pas une liste de chaînes exactes** : interdire « on gère le reste » et laisser « on
s'occupe du reste » dans un titre de section ne ferme rien (payé le 26/08 sur GFC). Et le **grep du
CODE fait foi avant la sonde HTTP** — le code porte aussi ce qui ne s'affiche qu'après un clic, et
les `title` / `description` / `og:*`.

**Loi 9 — Design sobre, jamais « look IA ».** Bannir dégradés/glow/glassmorphism/pastel — Olivier
détecte le look IA au premier coup d'œil (« on voit des agents »). Plus d'espace = rendu plus
COMPACT et raffiné, jamais tout agrandir. Mobile = surface de première classe (390 px, zéro
débordement, touch 44 px ; supprimer plutôt qu'adapter ce qui rend mal). Boutons lisibles SANS
hover. Jamais de texte posé sur une animation. Chaque image évoque précisément le sujet
(lumineuse, chaleureuse, jamais clinique/anxiogène), vérifiée une à une, zoom compris (détails qui
trahissent l'IA). Représentations graphiques = données réelles (GeoJSON officiel, vraies icônes),
jamais d'approximation croquis. **Le branding (logo, header) ne se touche JAMAIS sans
validation.** Toute nouvelle surface part de la grammaire d'une référence validée du projet.

**Loi 10 — Travail global, jamais local.** Chaque retour s'applique à sa CLASSE entière : sweep
automatique du même problème ailleurs, corrigé DIRECTEMENT sans redemander la permission. Un fix
de wording/chiffre se propage PARTOUT (grep à zéro occurrence). Une demande s'implémente dans sa
GÉNÉRALITÉ (toutes les fiches, tous les chemins), pas sur le cas cité. Un ajout entraîne « ce qui
va ensuite » (étapes conditionnelles, branchements) sans qu'Olivier le détaille. Cohérence sur les
5 axes : front desktop, front mobile, API, base, config.

## 3. Frontières de décision

**Réservé à Olivier** (escalader en LOT avec recommandation, jamais au fil de l'eau) : prix et
composition d'offres (rien ne part en PROD côté paiement sans ses prix ; tout est réversible et
marqué « à valider Olivier ») · positionnement, wording sensible, légal/DGCCRF · suppression d'une
fonctionnalité majeure · branding/logo · comptage des conversions Ads · tout recalcul rétroactif
d'argent/paie · séquencement marketing · rouvrir une décision actée (à SIGNALER explicitement).

**Réservé à Shimon** : Vercel/env/DNS/clés/secrets (l'IA prépare, lui manipule) · commit/push
(selon les règles du repo) · toute écriture en prod (SQL, Zoho, données réelles) = son go
explicite · activation d'un envoi sortant vers de vrais clients (**tout envoi naît OFF par
défaut**) · arbitrages métier ambigus (une question claire, options + recommandation).

**La session décide seule** : tout ce que cette doctrine couvre — rangement, cohérence, bugs,
wording courant, sweep de classe, périmètre complet d'une intention.

**Signaler sans bloquer** : risques juridiques repérés hors commande (consignés « à valider
Olivier ») ; toute décision antérieure qu'une nouvelle demande rouvre.

## 4. Process non négociables

- **Continuité** : CLAUDE.md (+ REPRISE.md si présent) = source officielle de l'état — lu EN
  ENTIER en début de session, vérifié contre le code réel (le code fait foi), mis à jour avant
  toute interruption. Jamais d'info importante uniquement en contexte.
- **Git** : commits en français ; jamais `git add -A` (checkouts partagés — ne stager que ses
  chemins) ; les sessions satellites ne commitent jamais ; commit/push seulement quand Shimon le
  demande ou que la tâche l'implique clairement ; push = déploiement Vercel auto ; gate strict
  avant commit (tsc puis build, commandes séparées, exit 0 chacune).
- 🔴 **Avant TOUT push : regarder ce qui part** (`git log origin/main..HEAD`). Un commit déjà
  fait localement peut avoir été gardé en local EXPRÈS (chantier bloqué par une décision, prix
  manquants…) : pousser autre chose l'emporte avec soi. Payé le 19/08 sur PRADESS — le chantier
  devis/paiement du 11/08, volontairement non poussé, est parti avec un commit de documentation
  (sans dégât : il était conçu pour rester inerte sans prix, décision Shimon = le laisser).
- **Une session par projet** (défaut) : elle lit le CLAUDE.md/REPRISE.md et la doctrine de CE
  repo. La session au niveau workspace est réservée au transverse (chantiers multi-projets,
  arbitrages inter-projets, préparation des points Olivier). Jamais deux sessions qui écrivent
  dans le même repo en même temps.
- **Un outil qui réécrit des fichiers doit refuser ce qu'il ne reconnaît pas.** Payé deux fois le
  26/08 par `propager-doctrine.sh` : il travaillait sur une liste de projets EN DUR (les nouveaux
  projets restaient sur un socle périmé), et sa découpe a effacé la section propre d'un projet dont
  la structure différait. Règles : découvrir les cibles au lieu de les lister ; vérifier la
  structure AVANT d'écrire ; en cas de doute, ignorer la cible en le disant plutôt que d'écraser.
  Vaut autant pour ce qui LIT : un audit sur liste en dur ne dit pas « je n'ai pas trouvé », il
  dit « tout va bien » (payé le 26/08 : `objectifs carrieres` s'écrit avec une espace, pas un
  tiret — un test de fichier silencieux l'a fait disparaître d'un relevé sans un mot).
- **Ne jamais écrire dans un repo où une autre session ou un agent travaille** — y compris pour une
  propagation « inoffensive ». Vérifier qui a la main avant, pas après.
- **Une décision transverse ne remonte pas toute seule dans les sessions déjà ouvertes** : elles
  ont lu leur CLAUDE.md au démarrage et ne le relisent pas en cours de route. Quand une règle
  commune change, la session workspace NOTIFIE les sessions projet actives (elles font une pause,
  lisent, puis reprennent où elles en étaient). Constaté le 20/08 : Kariér travaillait depuis la
  veille sans connaître le protocole.
- **Isolation projets** : git/Supabase/Vercel/domaines séparés ; jamais d'import croisé (un
  composant utile ailleurs se ré-implémente) ; jamais modifier le projet-source d'un autre
  périmètre (surcharger côté consommateur — ex. prix packs côté Kariér, GFC intact).
- **Données réelles** : n'agir QUE sur des comptes ZZTEST-/jetables ; jamais soumettre un vrai
  formulaire (pollue Zoho/Make) ; données de test nettoyées ; migration appliquée = fichier .sql
  écrit TOUJOURS ; suppression précédée d'une sauvegarde.
- **Secrets** : jamais en clair dans code/mémoire/docs ; l'humain fait la manipulation finale. Un
  mot de passe de base ou une clé se lit dans une variable d'environnement, et son absence FAIT
  ÉCHOUER le script — jamais de valeur par défaut. Payé le 26/08 : le mot de passe de la base de
  production Kariér vivait en clair dans 5 scripts versionnés, et le journal du projet en avait
  fait une convention (« pattern habituel »), ce qui garantissait la récidive.
- 🔴 **Un fichier de travail dans un site servi tel quel est PUBLIC.** Sur un site statique (ou
  tout ce qui sert la racine du dépôt), `DOCTRINE-OLIVIER.md`, `CLAUDE.md` et `REPRISE.md` sont
  téléchargeables sur le domaine du client — constaté le 26/08 sur zenacademy.fr, un site que
  l'instructeur d'un dossier officiel consulte. Parade : `.vercelignore` (les fichiers restent
  versionnés, ils ne sont plus déployés) ; l'installation automatique le pose désormais seule.
  Vérifier en HTTP après tout déploiement d'un nouveau site. Balayé le 26/08 sur toute la
  classe : elysee-formations.fr servait aussi sa doctrine, son brief, son audit, `contenu/` et
  1,3 Mo de `design-src/` ; objectifscarrieres.fr sa doctrine, son CLAUDE.md et son brief.
  Les applications Next (Kariér, PRADESS, Leachy, CF, FC) ne servent pas la racine du dépôt :
  le risque est propre aux sites STATIQUES.
- 🟠 **Un site en ligne sans image de partage est un site muet.** Toute page publique porte
  `og:image` (1200×630, avec `og:image:width/height/alt`) et `twitter:card=summary_large_image` :
  sans elle, chaque lien que le client envoie — à un prospect, dans un mail, dans un message de
  suivi de dossier — s'affiche en carte grise sans visuel ni promesse. Constaté le 26/08 sur
  zenacademy.fr, en ligne depuis six jours sans une seule image de partage, sur les 17 pages. La
  carte se GÉNÈRE à la charte du site (gabarit HTML versionné + script rejouable, comme les PDF),
  elle n'affirme rien que les documents du projet ne soutiennent, et elle se vérifie après
  déploiement en HTTP. Dans la même passe : longueur des `<title>` (au-delà de ~62 caractères
  Google tronque et la marque disparaît du résultat) et des `description` (~160). Corollaire :
  **après chaque décision produit, relire title/description/og:*/JSON-LD AVANT de refermer** —
  c'est la couche que personne ne regarde parce qu'elle ne s'affiche pas sur la page (payé le
  26/08 sur Élysée : formations retirées le 24/06, carte de partage et descriptions Google
  jamais recalées, deux mois durant).
- **Un verrou qui échoue OUVERT n'est pas un verrou** : quand un secret d'accès (CRON_SECRET,
  jeton d'API, Basic Auth) est absent, la porte se FERME. Sinon un envoi vers de vrais clients,
  ou une route de cron, devient déclenchable par n'importe qui.
- **Économie** : travailler en direct, pas de flottes d'agents en arrière-plan sauf demande
  explicite de Shimon.
- **Systèmes du client** : jamais toucher la config d'un tiers en prod (workflows Zoho…) —
  lecture seule et miroirs côté maison ; tout changement de format Zoho = prévenir Yoav.

## 5. Anticiper — traduction des signaux

| Signal | Traduction |
|---|---|
| Olivier répète une demande | La v1 n'a pas produit d'effet VISIBLE — réponse structurelle, pas une rustine |
| « Une seule page avec tout » | Page unique à sections ancrées, pas de dropdown |
| Capture annotée | Cahier des charges complet, détails implicites compris |
| Cas nominatif (« fiche Nora ») | Une CLASSE entière de bugs à balayer |
| « ? » d'Olivier sur une capture | Une question à clarifier, PAS un défaut à corriger à l'aveugle |
| Rejet d'une refonte | Revert chirurgical en gardant les acquis des autres retours |
| Contrordre | S'applique tel quel ; consigner ; la dernière décision fait foi |
| « go / faut tout faire » (Shimon) | Solder la file ENTIÈRE, preuve par étage, sans redemander |
| « C'est pas ça / catastrophe » (Shimon) | Problème STRUCTUREL — rediagnostiquer la direction, pas retoucher |
| Hyperbole (« de la bombe ») | Qualité maximale + cause racine exigées |
| Question « on a bien X partout ? » | Un audit chiffré à mener avant de répondre |
| « ça ne marche pas » d'un utilisateur | Reproduire le PARCOURS réel d'abord ; souvent une absence de chemin, pas une panne |
| « t'as rien fait » post-push | Délai Vercel 1-3 min + cache : reload forcé avant de creuser |

## 6. Spécifique Objectifs Carrières

- Site **CLIENT** (Florence Massol, retours relayés par Olivier). Site STATIQUE en HTML pur
  (pas de framework, pas de build) — domaine objectifscarrieres.fr ; repo
  `simsoum95/objectifs-carrieres`. Dormant depuis le 2026-06-12 : toute reprise commence par
  relire `BRIEF.md` (le brief fondateur) et vérifier l'état réel des pages.
- DA : **dérivé du gabarit Élysée mais SINGULARISÉ, jamais un clone** — recoloré rosé/saumon
  vers bordeaux à l'image de la dirigeante, signature propre (diagramme animé), spécialisation
  sanitaire & social, vivant/animé ; contenu inspiré de France Carrières.
- Scroll : la saga snap/moteur JS a été ANNULÉE — le vrai besoin est « chaque section tient
  dans un écran » (100svh compacté), défilement 100 % LIBRE, jamais confisquer la molette.
- Lisibilité avant effet : header opaque si le hero est sombre ; toute couche décorative en
  `pointer-events:none !important` ; `Cache-Control: must-revalidate` sur .js/.css (vieux
  fichiers en cache = « marche chez moi, pas ailleurs »).
- Cartes : jamais de texte rogné (`grid-auto-rows minmax(...,auto)`), jamais de placeholder
  visible en public, une carte cliquable mène à une destination cohérente avec son contenu
  (sinon carte d'info non cliquable) ; fini le vide latéral.
- Avis : 39 avis variés et réalistes (longueurs/tons différents, un 4 étoiles conservé —
  l'uniformité fait truqué) ; agréments non obtenus = tout retirer (« CPF » conservé comme
  demandé par le client).
- Légal : renseigné depuis les documents officiels (Kbis, Pappers) en FILTRANT les données
  personnelles non nécessaires (adresse perso et date de naissance de la dirigeante
  volontairement non publiées — RGPD).
- Domaine : tout référence objectifscarrieres.fr (canonical, OG, JSON-LD, contact@) — tout
  changement = balayage exhaustif des 16 pages ; les URLs externes tierces gardent leur forme.
- FormSubmit : feedback d'envoi immédiat + confirmation affichée à la réponse OU à 6 s max
  (le service met parfois 40 s) ; ne JAMAIS changer le destinataire principal (réactivation
  requise) — ajouter une boîte via `_cc`.
- Piège CSS payé : letter-spacing négatif d'un gros titre hérité par ses spans internes →
  reposer `letter-spacing:normal` dessus.

## 7. Entretien de ce système

- **Chaque nouveau retour d'Olivier ou de Shimon devient une règle écrite le jour même** dans le
  `DOCTRINE-OLIVIER.md` du projet concerné (section spécifique) ou dans le socle commun s'il est
  général. C'est le seul mécanisme qui fait décroître les classes d'erreurs — il n'est pas
  optionnel.
- Une règle ajoutée au **socle commun** doit être propagée aux copies des autres repos dès qu'une
  session ouverte sur le workspace le permet ; ce master est la version de référence.
- Ces fichiers se committent avec le code (ce sont des livrables) ; jamais de secret dedans.
- En fin de session : préparer le **digest Olivier** (livré / décisions prises et pourquoi /
  2-3 arbitrages max avec recommandation) et le remettre à Shimon.
