# Lumina Academy · Roadmap cybersécurité

Une plateforme d'apprentissage francophone pour les professionnels IT/réseau qui reprennent les fondations et construisent des compétences en pentest.

**Site : https://hackus-mans.github.io/roadmap/**

## Expérience

- Onboarding en trois étapes : expérience, objectif et rythme.
- Parcours principal avec prochaine compétence disponible, 17 modules essentiels et 5 modules de spécialisation.
- Carte de compétences interactive, filtres, recherche, vue liste et prérequis explicites.
- Fiches : objectifs, pratique en lab, ressources, trois critères de maîtrise et preuve écrite.
- Validation dépendante des prérequis ; rouvrir un acquis rouvre ses dépendants.
- Trois projets de portfolio et six voies de spécialisation.
- Ateliers d'analyse de chaînes de risques : preuves, télémétrie, ruptures et corrections.
- Notes, progression locale, migration depuis `osr-progress-v2`, export/import JSON.
- Navigation mobile et clavier, dialogs natifs, états vides et erreurs de stockage.
- Adaptateur Supabase pour connexion par e-mail et sauvegarde/restauration explicite. **Les comptes ne sont pas activés sans configuration externe.** Voir `docs/ACCOUNTS.md`.

Les contenus proposent une structure de formation et renvoient vers des ressources externes ; ce site n'héberge pas de machines de laboratoire et ne délivre pas de certification. Les durées historiques sont indicatives.

## Développement

Node.js 22 ou supérieur.

```sh
npm ci
npm test
npm run build
python3 -m http.server 4173 --directory dist
```

Ouvrir http://localhost:4173. Reconstruire après modification. Pas de framework ou backend requis pour le parcours local. La seule dépendance runtime est le SDK d'authentification, intégré au bundle par esbuild.

## Architecture

- `roadmap-data.js` : curriculum initial conservé et compatible avec ses identifiants.
- `src/curriculum.js` : graphe de prérequis, critères, projets, spécialisations et ateliers.
- `src/state.js` : validation des données, migration, choix du prochain module et invalidation des dépendances.
- `src/app.js` : rendu, navigation hash, onboarding et interactions.
- `src/auth.js` : adaptateur Supabase, connexion PKCE et sauvegardes explicites.
- `styles.css` : système visuel Lumina Academy responsive.
- `config.js` : configuration publique, vide par défaut.
- `scripts/build.mjs` : génération des seuls fichiers publics dans `dist`.
- `tests/state.test.mjs` : intégrité du graphe, progression, migration et imports.
- `tests/browser.cjs` : recette navigateur (nécessite Playwright et Chromium).
- `docs/` : audit et configuration des comptes.

## Publication

Le workflow `.github/workflows/pages.yml` teste et construit le site puis déploie **dist/** via GitHub Pages. Le workflow de pull request exécute les mêmes tests et le build sans déployer. Les anciens chemins `roadmap.html`, `tracks.html`, `resources.html` et ancres d'étape redirigent vers les nouvelles vues. Les routes hash supportent rechargements et sous-répertoire `/roadmap/`.

## Données et confidentialité

Sans configuration des comptes, les notes restent dans le localStorage du navigateur. Les sauvegardes JSON sont des données personnelles : éviter secrets, identifiants, informations clients ou preuves sensibles. Les polices Google Fonts sont chargées si disponibles, avec une pile système de secours. GitHub Pages et les ressources externes disposent de leurs propres politiques de collecte.
