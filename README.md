# Lumina Cyber Mastery · Personal Roadmap

Une plateforme de progression construite comme une **roadmap personnelle de très long terme** : fondations système, programmation, pentest professionnel, Web/API, Active Directory, Red Team, Purple Team, engineering et recherche.

**Site : https://hackus-mans.github.io/roadmap/**

## Système pédagogique

La validation ne dépend pas du nombre de vidéos vues. Chaque skill gate suit la même boucle :

**Comprendre → Pratiquer → Échouer → Diagnostiquer → Refaire → Documenter → Démontrer**

Un module n'est considéré acquis que lorsque ses prérequis sont validés, ses trois critères de maîtrise sont cochés et une preuve est documentée.

## 6 phases / 50 skill gates

1. **Reconstruction technique** — Linux, Windows, réseau, HTTP, FORGE, notes, crypto.
2. **Pentest operator** — méthodologie, Nmap, footprinting, vulnérabilités, credentials, Linux/Windows PrivEsc.
3. **Web & API exploitation** — Burp, injections, auth, XSS, SSRF, API, OAuth/JWT, HTTP avancé, whitebox.
4. **Enterprise & Active Directory** — AD, Kerberos/NTLM, BloodHound reasoning, attack paths, AD CS, pivoting, engagements internes.
5. **Engineering & spécialités** — cloud, containers, C/assembly, reverse, exploit development, mobile, wireless/IoT.
6. **Red/Purple & maîtrise professionnelle** — Red Team planning, detection-aware tradecraft, detection engineering, DFIR, recherche, tooling, portfolio et master capstone.

## Jalons personnels

- CAPT comme checkpoint intermédiaire.
- CPTS comme objectif professionnel majeur, pas comme destination finale.
- 50 machines et 60 challenges documentés.
- 4 Pro Labs ou environnements multi-hôtes équivalents.
- Web/API profond avec PortSwigger et whitebox.
- FORGE 40 : quarante projets d'intégration.
- Capstone final multi-segments avec attaque, preuve, détection, remédiation et retest.

## Fonctionnalités

- Skill Graph avec prérequis réels et largeur adaptative.
- Prochaine compétence calculée automatiquement.
- 10 jalons majeurs et FORGE 40.
- 8 branches : Web/API, Internal/AD, Red Team, Cloud, Exploit/Research, Purple, Mobile, Wireless/IoT.
- Fiches détaillées : comprendre, pratiquer, démontrer.
- Notes et preuves locales.
- Export/import JSON.
- Compte Supabase facultatif si configuré.
- Build statique et GitHub Pages.

## Ressources de référence

La roadmap privilégie les sources primaires et plateformes de pratique reconnues : Hack The Box Academy, PortSwigger Web Security Academy, Microsoft Learn, MITRE ATT&CK, OWASP, NIST, pwn.college, CryptoHack et documentations officielles.

## Développement

Node.js 22+.

```sh
npm ci
npm test
npm run build
python3 -m http.server 4173 --directory dist
```

## Architecture

- `src/curriculum.js` — source unique du curriculum, prérequis, branches, jalons et FORGE 40.
- `src/app.js` — UX, routes, onboarding, progression et vues.
- `src/graph.js` — graphe adaptatif des dépendances.
- `src/state.js` — persistance, migration et validation.
- `src/auth.js` — synchronisation optionnelle Supabase.
- `styles.css` — design system responsive.
- `tests/state.test.mjs` — intégrité du curriculum et de la progression.
- `tests/browser.cjs` — recette navigateur Playwright.
- `scripts/build.mjs` — génération du site statique dans `dist/`.

## Cadre d'usage

Le contenu offensif est prévu pour CTFs, labs, machines personnelles, plateformes d'entraînement et missions explicitement autorisées. La roadmap intègre systématiquement preuve, télémétrie, détection, correction et retest afin de construire une compétence professionnelle complète.
