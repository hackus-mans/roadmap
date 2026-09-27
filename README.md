# Pentest Roadmap — Zero to Professional

Roadmap interactive destinée à un profil ayant déjà une expérience en réseau / administration mais souhaitant reconstruire ses fondations et devenir un pentester complet.

## Objectif

Passer de connaissances techniques fragmentées à la capacité de conduire une mission structurée :

**Recon → Enumeration → Attack Surface → Hypothèses → Validation → Initial Access → Privilege Escalation → Credential Access → Lateral Movement → Pivoting → Impact → Reporting**

Le site couvre notamment :

- Linux et Windows
- Réseau orienté sécurité
- Python, Bash et PowerShell
- Méthodologie de pentest
- Web et API Security
- Linux / Windows Privilege Escalation
- Active Directory
- Infrastructure et services réseau
- Pivoting et tunneling
- Attack chains multi-hôtes
- Cloud, containers et Kubernetes
- Exploit Development / Reverse foundations
- Purple Team / détection
- Reporting professionnel
- Chemins de spécialisation : Web, AD/Internal, Infra, Red Team, Cloud, Exploit Dev, Purple, Mobile, Wireless/IoT

## Fonctionnalités du site

- Roadmap filtrable par spécialisation et niveau
- Recherche instantanée
- Cases à cocher avec sauvegarde locale dans le navigateur
- Progression globale
- Exemples de chaînes d'attaque conceptuelles
- Échelle de pratique : Guided → Assisted → Independent → Multi-host → Professional
- Ressources officielles / reconnues

## Philosophie

1. **Compréhension > mémorisation**
2. **Enumeration > exploitation**
3. **Mécanismes > outils**
4. **Admin ↔ Attaque ↔ Défense**
5. **Observation → Hypothèse → Test → Résultat → Interprétation**
6. **Une vulnérabilité isolée est moins importante qu'un chemin d'attaque réaliste**
7. **Une mission n'est pas terminée sans preuves, impact et remédiation**

## Utilisation locale

Aucun build n'est nécessaire.

\`\`\`bash
git clone https://github.com/hackus-mans/roadmap.git
cd roadmap
python3 -m http.server 8000
\`\`\`

Puis ouvrir \`http://localhost:8000\`.

## Déploiement

Le dépôt contient \`.github/workflows/pages.yml\` pour GitHub Pages.

Le workflow publie le site statique avec les actions GitHub Pages officielles.

## Scope & éthique

Cette roadmap est destinée aux CTFs, labs, machines personnelles, environnements de formation et missions explicitement autorisées. Les exemples d'attack chains sont conceptuels et servent à développer une méthodologie professionnelle de test.

## Ressources principales

- PortSwigger Web Security Academy
- OWASP Web Security Testing Guide
- Hack The Box Academy
- Microsoft Learn
- MITRE ATT&CK
- NIST SP 800-115
- CIS Benchmarks
- pwn.college
- OverTheWire
