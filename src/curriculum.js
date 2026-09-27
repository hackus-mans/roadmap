// Stable IDs preserve progress from the original twenty-module roadmap.
const dependencies = {
  "01": [],
  "02": ["01"],
  "03": ["01"],
  "04": ["01"],
  "05": ["02"],
  "06": ["02", "03", "04"],
  "07": ["06"],
  "08": ["04"],
  "09": ["08", "06"],
  10: ["09", "05"],
  11: ["02", "07"],
  12: ["03", "07"],
  13: ["03", "04", "12"],
  14: ["07", "11"],
  15: ["04", "14"],
  16: ["10", "11", "12", "13", "15"],
  17: ["06"],
  18: ["05", "08", "13"],
  19: ["02", "05"],
  20: ["07", "12"],
  21: ["16", "17", "20"],
  22: ["20", "17"],
};
const extras = {
  "01": [
    "Dessiner le réseau de son lab et ses frontières.",
    "Expliquer une capture DNS puis TCP.",
    "Diagnostiquer un service local inaccessible.",
  ],
  "02": [
    "Créer deux utilisateurs et justifier leurs permissions.",
    "Diagnostiquer un service arrêté à partir des journaux.",
    "Restaurer une configuration après une erreur volontaire.",
  ],
  "03": [
    "Comparer droits NTFS et droits de partage.",
    "Identifier le compte exécutant un service.",
    "Retrouver un événement de connexion dans les journaux.",
  ],
  "04": [
    "Expliquer une résolution DNS et un handshake TCP.",
    "Dessiner les routes et règles entre deux sous-réseaux.",
    "Distinguer refus de connexion, délai et erreur TLS.",
  ],
  "05": [
    "Parser un fichier JSON avec gestion des erreurs.",
    "Écrire et tester une fonction sans assistant.",
    "Documenter les entrées, sorties et limites du script.",
  ],
  "06": [
    "Rédiger périmètre, exclusions et conditions d’arrêt.",
    "Distinguer observation et hypothèse dans ses notes.",
    "Livrer une fiche avec impact et correction.",
  ],
  "07": [
    "Construire une matrice hôte / service / exposition.",
    "Distinguer version déclarée et propriété démontrée.",
    "Prioriser trois hypothèses avec leur justification.",
  ],
  "08": [
    "Expliquer cookie, session et contrôle côté serveur.",
    "Dessiner un échange navigateur / API / stockage.",
    "Comparer authentification et autorisation.",
  ],
  "09": [
    "Expliquer la cause racine de trois familles de failles.",
    "Associer chaque constat à une correction côté serveur.",
    "Documenter les résultats de labs dédiés et leurs limites.",
  ],
  10: [
    "Dessiner une matrice objets / rôles / opérations.",
    "Expliquer la validation d’un jeton côté serveur.",
    "Proposer des tests de non-régression du contrôle d’accès.",
  ],
  11: [
    "Interpréter une matrice de permissions Linux.",
    "Expliquer une frontière de privilèges mal configurée.",
    "Vérifier et documenter sa correction dans une VM.",
  ],
  12: [
    "Expliquer identité, token et droits effectifs.",
    "Évaluer les permissions d’un service de laboratoire.",
    "Comparer les journaux avant et après durcissement.",
  ],
  13: [
    "Dessiner domaine, DC, DNS et relations de confiance.",
    "Expliquer le rôle des tickets Kerberos.",
    "Analyser puis corriger une délégation excessive.",
  ],
  14: [
    "Inventorier authentification et données de chaque service.",
    "Justifier la segmentation attendue.",
    "Comparer la configuration aux besoins métier.",
  ],
  15: [
    "Dessiner le chemin aller et retour d’un flux.",
    "Distinguer routage IP et relais applicatif.",
    "Expliquer les traces réseau et les règles de filtrage.",
  ],
  16: [
    "Reconstituer une chronologie depuis des preuves fournies.",
    "Identifier les frontières de confiance traversées.",
    "Proposer des points de détection et de rupture.",
  ],
  17: [
    "Séparer synthèse direction et détails techniques.",
    "Relier chaque risque à une preuve et une remédiation.",
    "Rédiger un retest avec résultat et limites.",
  ],
  18: [
    "Dessiner identités, rôles et accès aux données.",
    "Justifier le moindre privilège dans une politique IAM.",
    "Documenter isolation, secrets et journalisation.",
  ],
  19: [
    "Expliquer pile, tas, pointeurs et registres.",
    "Diagnostiquer un crash dans un programme local.",
    "Expliquer les mitigations et corriger la cause mémoire.",
  ],
  20: [
    "Relier un événement à sa source de télémétrie.",
    "Écrire une règle sur des événements synthétiques.",
    "Mesurer faux positifs et lacunes de collecte.",
  ],
  21: [
    "Définir objectif métier, périmètre et critères d’arrêt.",
    "Élaborer un plan d’évaluation avec contrôle des risques.",
    "Présenter couverture, limites et recommandations.",
  ],
  22: [
    "Établir une matrice technique / télémétrie / détection.",
    "Tester une détection sur des événements synthétiques.",
    "Comparer couverture initiale et couverture finale.",
  ],
};
export const stages = window.ROADMAP_STAGES.map((s) => ({ ...s }));
stages[0].title = "Fondations";
stages[1].title = "Pratique du pentest";
stages[2].title = "Environnements d’entreprise";
stages[3].title = "Spécialisations";
stages[3].modules = [
  ...stages[3].modules,
  {
    n: "21",
    title: "Red Team : concevoir une évaluation",
    type: "OPTION",
    duration: "6–10 semaines",
    summary:
      "Relier un objectif métier, un cadre de mission et une évaluation des défenses.",
    learn: [
      "Objectifs et règles d’engagement",
      "Modélisation des menaces",
      "Coordination, déconfliction et critères d’arrêt",
      "Restitution et plan d’amélioration",
    ],
    practice: [
      "Rédiger un brief de mission fictive",
      "Construire un exercice sur table",
      "Présenter les risques et limites aux parties prenantes",
    ],
    exit: "Tu peux concevoir et restituer une évaluation encadrée des défenses.",
    resources: [["MITRE ATT&CK", "https://attack.mitre.org/"]],
  },
  {
    n: "22",
    title: "Purple Team & ingénierie de détection",
    type: "OPTION",
    duration: "6–10 semaines",
    summary:
      "Transformer des observations en améliorations mesurables des défenses.",
    learn: [
      "Hypothèses de détection",
      "Qualité des logs et couverture",
      "Sigma et validation",
      "Boucle de retour SOC / audit",
    ],
    practice: [
      "Analyser des événements synthétiques",
      "Écrire une fiche de détection",
      "Comparer les résultats avant et après ajustement",
    ],
    exit: "Tu peux démontrer une amélioration mesurée de la couverture de détection.",
    resources: [
      ["Sigma", "https://sigmahq.io/"],
      ["MITRE ATT&CK", "https://attack.mitre.org/"],
    ],
  },
];
export const modules = stages.flatMap((s) =>
  s.modules.map((m) => ({
    ...m,
    id: `${s.id}-${m.n}`,
    stage: s.id,
    stageTitle: s.title,
    prereqs: dependencies[m.n],
    criteria: extras[m.n],
  })),
);
export const byNumber = Object.fromEntries(modules.map((m) => [m.n, m]));
export const byId = Object.fromEntries(modules.map((m) => [m.id, m]));
// Specific framing for scenario analysis; no executable attack recipes.
Object.assign(byNumber["16"], {
  summary:
    "Comprendre comment plusieurs faiblesses se combinent à partir de dossiers de laboratoire.",
  practice: [
    "Analyser un dossier Web → système et ses preuves",
    "Reconstituer une chronologie identité → service → données",
    "Proposer plusieurs ruptures de chaîne et un plan de retest",
  ],
  exit: "Tu peux expliquer une chaîne de risques, distinguer les faits des hypothèses et défendre les corrections.",
});
export const tracks = [
  {
    id: "web",
    icon: "</>",
    title: "Web & API",
    desc: "Comprendre les applications, leurs identités et leur logique métier.",
    requires: ["08", "09", "10", "17"],
    focus: [
      "Revue du contrôle d’accès",
      "Architecture HTTP et API",
      "Tests de non-régression",
    ],
    project:
      "Dossier d’audit applicatif avec matrice des rôles et plan de correction.",
  },
  {
    id: "internal",
    icon: "◇",
    title: "Infrastructure & Active Directory",
    desc: "Lire une entreprise comme un ensemble de systèmes et de relations de confiance.",
    requires: ["11", "12", "13", "14", "15", "17"],
    focus: [
      "Identités et délégations",
      "Services et segmentation",
      "Durcissement et retest",
    ],
    project:
      "Cartographie d’un domaine de lab et revue de ses frontières de confiance.",
  },
  {
    id: "cloud",
    icon: "☁",
    title: "Cloud & containers",
    desc: "Sécuriser identités, workloads et pipelines dans une infrastructure moderne.",
    requires: ["18", "17"],
    focus: [
      "IAM et moindre privilège",
      "Isolation des workloads",
      "Secrets et CI/CD",
    ],
    project:
      "Revue d’architecture cloud avec politiques IAM et plan de journalisation.",
  },
  {
    id: "binary",
    icon: "0x",
    title: "Exploit development",
    desc: "Approfondir C, mémoire, assembleur et analyse des vulnérabilités binaires.",
    requires: ["19"],
    focus: [
      "C et gestion de mémoire",
      "Debugging et formats binaires",
      "Mitigations et correction",
    ],
    project:
      "Analyse d’un crash local, explication de la cause et correctif testé.",
  },
  {
    id: "red",
    icon: "⚑",
    title: "Red Team",
    desc: "Concevoir une évaluation des défenses guidée par des objectifs métier.",
    requires: ["21"],
    focus: [
      "Modélisation des menaces",
      "Cadre et coordination",
      "Évaluation et restitution",
    ],
    project:
      "Plan de mission fictive et exercice sur table pour les équipes sécurité.",
  },
  {
    id: "purple",
    icon: "◎",
    title: "Purple Team",
    desc: "Rapprocher audit, télémétrie et détection dans une boucle mesurable.",
    requires: ["22"],
    focus: [
      "Qualité des événements",
      "Détections et faux positifs",
      "Mesure de couverture",
    ],
    project: "Pack de détection validé sur un jeu de logs synthétiques.",
  },
];
export const projects = [
  {
    id: "lab",
    stage: "foundations",
    title: "Mon laboratoire documenté",
    requires: ["01", "02", "03", "04", "05"],
    desc: "Construire un environnement que tu sais expliquer, administrer et restaurer.",
    deliverables: [
      "Schéma réseau et inventaire des VMs",
      "Matrice utilisateurs, services et permissions",
      "Script d’inventaire local documenté",
      "Procédure de restauration testée",
    ],
  },
  {
    id: "audit",
    stage: "core",
    title: "Mon premier dossier d’audit",
    requires: ["06", "07", "08", "09", "10", "11", "12", "17"],
    desc: "Transformer les observations de laboratoire en constats utiles à une équipe technique.",
    deliverables: [
      "Périmètre et matrice de tests",
      "Trois constats avec preuves et limites",
      "Corrections priorisées et justifiées",
      "Compte rendu de retest",
    ],
  },
  {
    id: "enterprise",
    stage: "enterprise",
    title: "Une entreprise, plusieurs frontières",
    requires: ["13", "14", "15", "16", "17"],
    desc: "Reconstituer les risques d’un environnement de lab à partir de son architecture et de ses journaux.",
    deliverables: [
      "Graphe identités, services et zones",
      "Chronologie et sources de preuve",
      "Points de détection et ruptures de chaîne",
      "Synthèse de direction et restitution orale",
    ],
  },
];
export const scenarios = [
  {
    title: "Application → système",
    tag: "WEB + LINUX",
    requires: ["09", "11"],
    story:
      "Un dossier de lab décrit une application et son compte de service. Analyse la séparation entre données utilisateur, processus et permissions système.",
    steps: [
      "Entrée applicative",
      "Identité du service",
      "Permissions effectives",
      "Données exposées",
    ],
    questions: [
      "Quelle preuve établit chaque transition ?",
      "Quel contrôle serveur limite la première exposition ?",
      "Quelle permission casserait la chaîne ?",
    ],
    evidence:
      "Matrice de permissions, extrait de configuration et journaux applicatifs de ton lab.",
  },
  {
    title: "Identité → ressources d’entreprise",
    tag: "WINDOWS + AD",
    requires: ["12", "13", "17"],
    story:
      "Une revue de domaine révèle des droits hérités et des groupes imbriqués. Explique les accès effectifs et leur impact sur les ressources.",
    steps: [
      "Identité",
      "Appartenance aux groupes",
      "Droits hérités",
      "Ressource métier",
    ],
    questions: [
      "D’où vient chaque droit effectif ?",
      "Quel événement aide à reconstruire la chronologie ?",
      "Comment vérifier une correction sans perturber le service ?",
    ],
    evidence:
      "Export des groupes, ACL et événements d’un domaine de laboratoire.",
  },
  {
    title: "Zone exposée → réseau interne",
    tag: "RÉSEAU + SEGMENTATION",
    requires: ["14", "15", "16"],
    story:
      "Une architecture sépare services publics et internes. Analyse les flux attendus, les exceptions de filtrage et les dépendances applicatives.",
    steps: [
      "Zone exposée",
      "Règle de filtrage",
      "Service interne",
      "Frontière de données",
    ],
    questions: [
      "Le flux est-il nécessaire au fonctionnement métier ?",
      "Où collecter la télémétrie de ce passage ?",
      "Quel changement réduit le risque avec le moins d’impact ?",
    ],
    evidence:
      "Schéma réseau, règles de filtrage et captures de trafic générées dans ton lab.",
  },
];
