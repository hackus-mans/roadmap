# Audit et décisions — 28 septembre 2026

## Dépôt d'origine

Tous les fichiers de l'arbre suivi ont été examinés : 4 pages HTML, `styles.css`, `app.js`, `roadmap-data.js`, README, `.nojekyll` et workflow Pages. Base : commit `52aa2ea`.

- Frontend statique sans dépendances ni build ; navigation et styles dupliqués.
- Vingt modules structurés en quatre étapes, ressources et critères de sortie.
- Progression booléenne uniquement, conservée dans localStorage `osr-progress-v2`.
- Pas de profil, prérequis machine-lisibles, dossier de preuves ou recommandation calculée.
- Menu principal masqué sur mobile sans menu alternatif.
- Pas de tests, pas d'authentification, pas de stockage distant.
- Workflow Pages publiant la racine complète du dépôt.

## Refonte

Conserver le déploiement statique minimise la maintenance. Un graphe explicite de compétences permet plusieurs branches (Linux/Windows/réseau puis Web/systèmes), au lieu d'un verrouillage séquentiel arbitraire. Le reporting devient disponible tôt. Les étapes avancées sont optionnelles et ne gonflent pas le pourcentage du tronc commun.

Le routage hash fonctionne directement sur GitHub Pages et les anciennes URLs sont conservées. Le build publie uniquement les assets nécessaires. L'état est séparé du contenu et du rendu pour faciliter une migration future vers un framework.

Direction visuelle : marque Lumina Academy, navigation persistante, surfaces claires, typographie Manrope/DM Sans, vert profond et accents citron. Éviter les statistiques décoratives et garder la prochaine action visible.

Les exercices restent des objectifs d'apprentissage et d'analyse en laboratoire. Les ateliers de chaînes combinent architecture, preuves, détection et remédiation sans générer de procédures offensives automatisées.

## Limites assumées

- Autoévaluation : pas de correction automatisée des preuves ni certification.
- Les liens externes et leurs conditions d'accès restent sous contrôle des plateformes concernées.
- Pas de machines hébergées, moteur de cours vidéo ou espace formateur.
- Authentification préparée, mais non activée et non testée avec un projet réel tant que Lumina Academy n'a pas fourni sa configuration.
- Sauvegardes cloud explicites et sans fusion automatique ; la progression locale demeure utilisable indépendamment.

## Ajustement après référence roadmap.sh

Accueil remplacé par un catalogue de parcours. La vue carte affiche un graphe acyclique calculé sur les prérequis réels : 22 nœuds, 42 liens, zoom et panneau de module latéral. Les six spécialisations incluent leurs prérequis transitifs. La marque Lumina Academy reste indépendante ; aucun code ni contenu de roadmap.sh n’a été copié.

La recette de publication a révélé deux mécanismes actifs : workflow personnalisé et déploiement Pages depuis la branche. Le bundle est donc versionné à la racine en plus du build dist, pour assurer le fonctionnement des deux sorties.
