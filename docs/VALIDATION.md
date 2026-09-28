# Recette de la refonte

Tests exécutés localement avant publication :

- Huit tests unitaires Node : identifiants et graphe sans cycle, ordre des prérequis, invalidation transitive, migration, stockage indisponible, imports invalides et aller-retour des sauvegardes, disposition du graphe et correspondance des 42 liens avec les prérequis.
- Build esbuild complet.
- Chromium / Playwright à 1440 × 1100 et 390 × 844 : onboarding complet, sélection du rythme, validation du diagnostic, blocage d'un module sans prérequis, persistance après rechargement, recherche et états vides, vues carte/liste, notes projets et scénarios, ressources filtrées, compte désactivé clairement signalé, export/import JSON, redirections historiques.
- Contrôle du débordement horizontal des neuf vues mobiles, menu mobile, URL inconnue et stockage navigateur refusé.
- Aucune erreur JavaScript détectée pendant cette recette.
- Inspection visuelle des captures de l'accueil et de la carte, desktop et mobile.

La recette navigateur est reproductible via `tests/browser.cjs` avec Playwright, Chromium et un serveur sur le build. `TEST_BASE_URL` personnalise l'adresse ; `CHROMIUM_EXECUTABLE` permet un exécutable existant. Les captures sont temporaires dans `.test-output/`.

Le workflow CI exécute les tests unitaires et le build. La recette navigateur a été exécutée localement ; elle n'est pas incluse au workflow CI.

Non testé en production : inscription, réception des e-mails, séparation des utilisateurs et sauvegarde Supabase, car aucun projet Supabase n'est configuré. Suivre `ACCOUNTS.md` pour les activer et effectuer cette recette.

La recette couvre également le catalogue, l’ouverture/fermeture du panneau de module et les contrôles de zoom.
