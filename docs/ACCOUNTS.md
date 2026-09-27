# Activer les comptes Lumina Academy

Le frontend est fonctionnel sans compte. Aucun backend n'a été provisionné pendant la refonte. La connexion Supabase et les sauvegardes explicites sont implémentées, mais nécessitent un projet configuré et une recette réelle avant ouverture publique.

1. Créer un projet Supabase sous le compte de Lumina Academy.
2. Exécuter `docs/accounts.sql` dans son éditeur SQL. Vérifier que la Row Level Security est active. Les quatre politiques isolent chaque utilisateur par `auth.uid()` ; aucune politique n'utilise des métadonnées modifiables par l'utilisateur.
3. Activer l'authentification e-mail et configurer un SMTP de production. Le fournisseur d'envoi par défaut ne convient pas à une ouverture publique générale. Définir limites de débit et protection anti-abus selon le public prévu.
4. Définir Site URL et URL de redirection autorisée : `https://hackus-mans.github.io/roadmap/index.html`. Pour une recette locale, ajouter une URL localhost exacte.
5. Renseigner `supabaseUrl` et la clé **publishable / anon publique** dans `config.js`. Ne jamais inclure de secret ni de clé `service_role` dans ce dépôt public.
6. Exécuter `npm ci && npm test && npm run build`, publier, puis tester l'inscription et le lien reçu **dans le même navigateur** (flux PKCE).
7. Avec deux comptes de test distincts, vérifier que A ne peut ni lire ni modifier les données de B, et qu'un appel anonyme est refusé. Ces tests d'intégration nécessitent le vrai projet et ne sont pas remplacés par les mocks UI.
8. Définir les informations légales, le responsable du traitement, la durée de conservation et une procédure de suppression de compte avant ouverture au public. Supprimer le compte via l'administration Supabase supprime ses données par cascade.

La synchronisation est volontairement explicite : « Sauvegarder en ligne » remplace la copie du compte ; « Restaurer » remplace la copie locale après confirmation. Pas de fusion implicite, ni de téléchargement automatique sur un ordinateur partagé. La déconnexion laisse la progression locale visible et le précise ; l'utilisateur peut l'effacer dans Mes données.

Sources officielles :
- https://supabase.com/docs/guides/auth/auth-email-passwordless
- https://supabase.com/docs/guides/auth/sessions/pkce-flow
- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://supabase.com/docs/guides/auth/auth-smtp
