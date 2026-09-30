import { renderGraph } from "./graph.js";
import {
  stages,
  modules,
  byId,
  byNumber,
  tracks,
  projects,
  scenarios,
  forgeProjects,
} from "./curriculum.js";
import {
  KEY,
  empty,
  load,
  sanitize,
  completed,
  missing,
  nextModule,
  status,
  invalidateDependents,
} from "./state.js";
import * as auth from "./auth.js";
const $ = (s) => document.querySelector(s);
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
let state;
try {
  state = load(localStorage, modules);
} catch {
  state = empty();
}
let user = null,
  search = "",
  filter = "all",
  stageFilter = "all",
  mapView = "map";
const labels = {
  done: "Validé",
  locked: "Prérequis à acquérir",
  active: "En cours",
  ready: "Disponible",
};
const svg = (path) =>
  `<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
const icons = {
  catalog: "◇",
  path: svg(
    '<path d="M5 20V6a2 2 0 0 1 2-2h12v15H7a2 2 0 0 0 0 4M5 19h14M9 8h6M9 12h4"/>',
  ),
  map: svg(
    '<rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="6" height="5" rx="1"/><rect x="16" y="17" width="6" height="5" rx="1"/><path d="M12 7v5M5 17v-5h14v5"/>',
  ),
  projects: svg(
    '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4M16 3v4M8 13l3 3 5-5"/>',
  ),
  tracks: svg(
    '<circle cx="12" cy="19" r="2"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><path d="M12 17v-5M5 7v3l7 2 7-2V7"/>',
  ),
  resources: svg(
    '<path d="M3 4h7l2 2 2-2h7v16h-7l-2 2-2-2H3zM12 6v16M6 8h3M15 8h3"/>',
  ),
  progress: svg('<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>'),
  chains: svg(
    '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-2 2M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l2-2"/>',
  ),
};
let toastTimer;
function toast(message) {
  $("#toast").textContent = message;
  $("#toast").classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("#toast").classList.remove("visible"), 4500);
}
function save() {
  state.updatedAt = new Date().toISOString();
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    return true;
  } catch {
    toast(
      "Stockage indisponible. Exporte ta progression avant de fermer la page.",
    );
    return false;
  }
}
const doneCount = () =>
  modules.filter((m) => m.type === "CORE" && completed(state, m)).length;
const totalCore = modules.filter((m) => m.type === "CORE").length;
const percent = () => Math.round((doneCount() / totalCore) * 100);
const link = (m, text) =>
  `<a href="#/module/${m.id}">${esc(text || m.title)} <span aria-hidden="true">↗</span></a>`;
const badge = (m) =>
  `<span class="status ${status(state, m, byNumber)}"><i></i>${labels[status(state, m, byNumber)]}</span>`;
const next = () => {
  const core = nextModule(state, modules, byNumber);
  if (core?.type === "CORE") return core;
  const chosen = tracks.find((t) => t.id === state.profile?.goal);
  const findMissing = (m) => {
    for (const n of m.prereqs) {
      const p = byNumber[n];
      if (!completed(state, p)) return findMissing(p);
    }
    return completed(state, m) ? null : m;
  };
  if (chosen) {
    for (const n of chosen.requires) {
      const m = findMissing(byNumber[n]);
      if (m) return m;
    }
  }
  return core;
};
const heading = (eyebrow, title, description) =>
  `<header class="page-heading"><span class="eyebrow">${eyebrow}</span><h1 tabindex="-1">${title}</h1><p>${description}</p></header>`;
function navItem(route, title) {
  return `<a href="#/${route}" data-nav="${route}"><span aria-hidden="true">${icons[route]}</span>${title}</a>`;
}
function shell() {
  $("#app").innerHTML =
    `<aside class="sidebar"><a class="brand" href="#/catalog"><span class="brand-mark" aria-hidden="true"><svg width="25" height="25" viewBox="0 0 30 30" fill="none"><path d="M8 6v19h16v-5H13V6H8Z" fill="currentColor"/><path d="M21 3v8M17 7h8" stroke="currentColor" stroke-width="1.8"/></svg></span><span class="brand-copy">Lumina<small>CYBER MASTERY</small></span></a><div class="workspace-label">OBJECTIF · PENTEST → RED TEAM → HYBRID</div><nav aria-label="Navigation principale"><small>MISSION CONTROL</small>${navItem("catalog", "Vue d’ensemble")}${navItem("path", "Master Roadmap")}${navItem("map", "Skill Graph")}${navItem("projects", "Jalons & FORGE 40")}<small>MAÎTRISE AVANCÉE</small>${navItem("tracks", "Branches avancées")}${navItem("chains", "Attack chains")}${navItem("resources", "Bibliothèque")}</nav><div class="sidebar-bottom"><a class="personal-progress" href="#/progress"><div><span>Master core</span><b>${percent()}%</b></div><progress max="${totalCore}" value="${doneCount()}">${percent()}%</progress><small>${doneCount()} / ${totalCore} skill gates validés</small></a><button class="profile-button" data-action="account"><span class="avatar">${esc((state.profile?.name || "J")[0].toUpperCase())}</span><span><b>${esc(state.profile?.name || "Mon espace")}</b><small>${user ? "Compte connecté" : "Progression locale"}</small></span><span aria-hidden="true">↗</span></button></div></aside>
 <div class="layout"><header class="topbar"><button class="mobile-menu" aria-label="Ouvrir le menu" aria-expanded="false" data-action="menu">☰</button><a class="mobile-brand" href="#/catalog">Lumina <span>Cyber Mastery</span></a><nav class="public-nav" aria-label="Navigation roadmap"><a href="#/catalog">Vue d’ensemble</a><a href="#/path">Roadmap</a><a href="#/projects">FORGE 40</a><a href="#/resources">Ressources</a></nav><span class="breadcrumb">Cyber Mastery <span>/</span> <b id="route-label">Master Roadmap</b></span><div class="top-actions"><a class="github-link" href="https://github.com/hackus-mans/roadmap" target="_blank" rel="noopener noreferrer">GitHub ↗</a><button class="button small outline" data-action="account">${user ? "Mon compte" : "Mon espace"}</button></div></header><main id="main"></main><footer>Lumina Cyber Mastery <span>Comprendre. Exploiter en lab. Détecter. Corriger. Démontrer.</span><a href="#/progress">Progression & sauvegarde</a></footer></div>`;
}
function moduleCard(m) {
  return `<a class="module-row ${status(state, m, byNumber)}" href="#/module/${m.id}"><span class="module-number">${completed(state, m) ? "✓" : m.n}</span><div><strong>${esc(m.title)}</strong><p>${esc(m.summary)}</p></div><div class="module-row-meta">${badge(m)}<small>${esc(m.duration)}</small></div><span class="arrow" aria-hidden="true">↗</span></a>`;
}
function pathPage() {
  const n = next();
  const currentStage = stages.find((x) => x.id === n?.stage) || stages[0];
  const phaseModules = modules.filter((m) => m.stage === currentStage.id);
  const chosen = tracks.find((t) => t.id === state.profile?.goal);
  const weekly = Number(state.profile?.hours || 20);
  return `
 ${heading("MASTER ROADMAP", state.profile ? `Ton prochain skill gate, ${esc(state.profile.name || "continue")}` : "Devenir extrêmement fort demande un système.", state.profile ? "Une seule prochaine étape. Des critères de sortie stricts. Aucune validation basée sur le temps passé." : "Cette roadmap est construite pour une montée en puissance complète : systèmes, code, Web, AD, Red Team et défense.")}
 <div class="journey-hero"><div class="journey-copy"><span class="eyebrow">${state.profile ? "PROCHAINE MISSION" : "OFFENSIVE SECURITY MASTERY"}</span><h2>${n ? esc(n.title) : "Master core terminé. Passe aux spécialisations profondes."}</h2><p>${n ? esc(n.summary) : "Continue les projets, les Pro Labs, la recherche et les branches avancées."}</p><div class="actions"><a class="button lime" href="${n ? "#/module/" + n.id : "#/tracks"}">${n ? "Ouvrir le skill gate" : "Choisir une branche"} <span>→</span></a><a class="quiet-link" href="#/map">Voir le graphe complet ↗</a></div><div class="hero-foot"><span>↗ ${modules.length} skill gates</span><span>◇ ${projects.length} jalons majeurs</span><span>⚑ ${tracks.length} branches avancées</span></div></div><div class="hero-art" aria-hidden="true"><div class="art-grid"></div><span class="orbit one"></span><span class="orbit two"></span><div class="art-node node1">01 <b>Foundations</b><span>✓</span></div><div class="art-node node2">35 <b>CPTS gate</b><span>↗</span></div><div class="art-node node3">50 <b>Master capstone</b><span>⚑</span></div><div class="art-caption">SYSTEMS → WEB → AD → RED/PURPLE → MASTERY</div></div></div>

 <section class="mission-control"><div class="mission-card current"><small>MAINTENANT</small><strong>${n ? esc(n.title) : "Consolidation avancée"}</strong><span>${n ? esc(n.duration) : "continu"}</span></div><div class="mission-card"><small>CHECKPOINTS</small><strong>CAPT → CPTS</strong><span>certifications comme preuves intermédiaires</span></div><div class="mission-card"><small>VOLUME</small><strong>50 machines · 60 challenges</strong><span>+ 4 Pro Labs multi-hôtes</span></div><div class="mission-card"><small>FINALITÉ</small><strong>Red Team + Purple awareness</strong><span>attaque, preuve, détection, remédiation</span></div></section>

 ${state.profile ? `<div class="study-plan"><span class="study-icon">◷</span><div><b>Cadence configurée : ${weekly} h / semaine</b><p>20% fondations/théorie · 50% labs · 20% code/FORGE · 10% notes & reporting. Ajuste selon la phase, mais garde toujours une preuve.</p></div><a href="#/progress">Ajuster →</a></div>` : ""}

 <section class="section"><div class="section-title"><div><span class="eyebrow">6 PHASES · 1 SYSTÈME</span><h2>La progression complète</h2></div><a class="text-link" href="#/map">Ouvrir le skill graph ↗</a></div><div class="phase-grid">${stages
   .map((stage, i) => {
     const list = modules.filter((m) => m.stage === stage.id);
     const d = list.filter((m) => completed(state, m)).length;
     return `<a class="phase-card ${stage.id === n?.stage ? "current" : ""}" href="#/map/${stage.id}"><div class="phase-top"><span>${String(i + 1).padStart(2,"0")}</span><span>${stage.id === n?.stage ? "EN COURS" : d === list.length ? "ACQUIS" : "PHASE " + (i + 1)}</span></div><h3>${esc(stage.title)}</h3><p>${esc(stage.desc)}</p><div class="phase-footer"><span>${list.length} skill gates</span><span>${d}/${list.length} <b>→</b></span></div></a>`;
   })
   .join("")}</div></section>

 <section class="section current-section"><div><div class="section-title"><div><span class="eyebrow">${esc(currentStage.label)} / ${esc(currentStage.title)}</span><h2>Travail actif</h2></div></div><div class="module-list">${phaseModules.slice(0, 6).map(moduleCard).join("")}</div></div><aside class="mentor-card"><span class="mentor-icon">✳</span><h3>Règle de validation</h3><p>Tu ne coches pas un module parce que tu as vu le cours. Tu le coches quand tu peux expliquer le mécanisme, résoudre un lab proche sans walkthrough et produire une preuve.</p><hr><small>BOUCLE DE TRAVAIL</small><p class="method">Comprendre → Pratiquer → Échouer → Diagnostiquer → Refaire → Documenter</p><a href="#/projects">Voir les jalons & FORGE 40 →</a></aside></section>

 <section class="next-banner"><div><span class="eyebrow">LES CERTIFICATIONS NE SONT PAS LA FIN</span><h2>${chosen ? `Branche actuelle : ${chosen.title}.` : "CAPT et CPTS sont des checkpoints. La maîtrise vient après."}</h2><p>${chosen ? chosen.desc : "Après le niveau CPTS : Pro Labs, Web avancé, AD profond, tooling, Red Team, Purple Team et recherche."}</p></div><a class="button outline" href="#/tracks">Explorer les branches ↗</a></section>`;
}
let trackFilter = null;
function trackNumbers(id) {
  const t = tracks.find((t) => t.id === id),
    result = new Set();
  function add(n) {
    if (result.has(n)) return;
    result.add(n);
    byNumber[n].prereqs.forEach(add);
  }
  t?.requires.forEach(add);
  return result;
}
function filteredModules() {
  const q = search.trim().toLocaleLowerCase("fr");
  return modules.filter(
    (m) =>
      (stageFilter === "all" || m.stage === stageFilter) &&
      (!trackFilter || trackNumbers(trackFilter).has(m.n)) &&
      (filter === "all" || status(state, m, byNumber) === filter) &&
      (!q ||
        [m.title, m.summary, ...m.learn]
          .join(" ")
          .toLocaleLowerCase("fr")
          .includes(q)),
  );
}
function mapResults() {
  const list = filteredModules();
  if (!list.length)
    return '<div class="empty"><h2>Aucun module trouvé</h2><p>Essaie un autre mot ou retire les filtres.</p><button class="button outline" data-action="clear-filters">Réinitialiser les filtres</button></div>';
  if (mapView === "list")
    return `<div class="module-list">${list.map(moduleCard).join("")}</div>`;
  return renderGraph(list, byNumber, (m) => status(state, m, byNumber), esc);
}

function mapPage() {
  return `${heading("LA CARTE DES COMPÉTENCES", trackFilter ? tracks.find((t) => t.id === trackFilter).title : "Cybersecurity Mastery Graph", "Chaque carte ouvre un module. Les liens indiquent les prérequis. Clique sur une compétence pour ouvrir ses objectifs, ses ressources et sa validation sans quitter la carte.")}<div class="toolbar"><label class="search"><span aria-hidden="true">⌕</span><input id="search" type="search" placeholder="Chercher une compétence…" value="${esc(search)}" aria-label="Chercher une compétence"></label><label class="sr-only" for="status-filter">Statut</label><select id="status-filter"><option value="all">Tous les statuts</option>${Object.entries(
    labels,
  )
    .map(
      ([k, v]) =>
        `<option value="${k}" ${filter === k ? "selected" : ""}>${v}</option>`,
    )
    .join(
      "",
    )}</select><div class="segmented"><button data-view="map" aria-pressed="${mapView === "map"}">Carte</button><button data-view="list" aria-pressed="${mapView === "list"}">Liste</button></div></div><div class="filter-tabs" role="group" aria-label="Filtrer par étape"><button data-stage="all" aria-pressed="${stageFilter === "all"}">Tout le parcours</button>${stages.map((s) => `<button data-stage="${s.id}" aria-pressed="${stageFilter === s.id}">${s.label} ${esc(s.title)}</button>`).join("")}</div><p class="map-legend"><span><i class="green-dot"></i> Validé</span><span><i class="amber-dot"></i> Tronc commun</span><span><i class="purple-dot"></i> Spécialisation</span></p><div id="map-results">${mapResults()}</div>`;
}
function modulePage(id) {
  const m = byId[id];
  if (!m) return notFound();
  const p = state.modules[id] || { checks: [], notes: "" },
    req = missing(state, m, byNumber);
  const after = modules.filter((a) => a.prereqs.includes(m.n));
  return `<a class="back-link" href="#/map/${m.stage}">← ${esc(m.stageTitle)}</a>${heading(`MODULE ${m.n} · ${m.type === "CORE" ? "TRONC COMMUN" : "SPÉCIALISATION"}`, esc(m.title), esc(m.summary))}<div class="module-detail-meta">${badge(m)}<span>${esc(m.duration)} · estimation du programme initial</span></div><div class="detail-layout"><div><section class="panel"><span class="eyebrow">01 / COMPRENDRE</span><h2>Ce que tu vas savoir expliquer</h2><ul class="learning-list">${m.learn.map((x) => `<li><span>↗</span>${esc(x)}</li>`).join("")}</ul></section><section class="panel"><span class="eyebrow">02 / PRATIQUER</span><h2>Ton travail en laboratoire</h2><p>Choisis un environnement d’apprentissage dédié. Réalise les activités puis conserve les observations qui démontrent ta compréhension.</p><ol class="lab-list">${m.practice.map((x, i) => `<li><span>0${i + 1}</span><div><strong>${esc(x)}</strong><small>Note le résultat observé, son interprétation et les limites de ton test.</small></div></li>`).join("")}</ol><div class="resource-links">${m.resources.map(([name, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(name)} ↗</a>`).join("")}</div><p class="fine-print">Les cours et labs externes s’ouvrent sur leur plateforme ; leurs conditions d’accès peuvent varier.</p></section><section class="panel validation-panel"><span class="eyebrow">03 / DÉMONTRER</span><h2>Valider la compétence</h2><p>${esc(m.exit)}</p><fieldset><legend class="sr-only">Critères de maîtrise</legend>${m.criteria.map((c, i) => `<label class="check-row"><input type="checkbox" data-check="${id}" data-index="${i}" ${p.checks[i] ? "checked" : ""}><span>${esc(c)}</span></label>`).join("")}</fieldset><label class="field-label" for="module-notes">Ma preuve de maîtrise</label><p class="fine-print">Décris ton résultat, une difficulté résolue et une correction. Tu peux ajouter un lien vers ton compte rendu. Ne stocke pas de secrets.</p><textarea id="module-notes" data-notes="${id}" rows="5" maxlength="10000" placeholder="Observation → hypothèse → résultat → interprétation…">${esc(p.notes)}</textarea><div class="validation-footer"><span id="validation-hint">${req.length ? "Valide les prérequis avant de terminer ce module." : "Coche les 3 critères et ajoute une preuve (20 caractères minimum)."}</span><button class="button primary" data-complete="${id}" ${!p.done && (!p.checks.every(Boolean) || p.checks.length !== 3 || (p.notes || "").trim().length < 20 || req.length) ? "disabled" : ""}>${p.done ? "Rouvrir le module" : "Valider le module ✓"}</button></div><small class="fine-print">Autoévaluation personnelle : ce statut n’est pas une certification.</small></section></div><aside class="detail-aside"><section class="panel"><span class="eyebrow">AVANT CE MODULE</span><h3>Les prérequis</h3>${m.prereqs.length ? m.prereqs.map((n) => `<div class="prereq">${completed(state, byNumber[n]) ? "✓" : "○"} ${link(byNumber[n])}</div>`).join("") : "<p>Aucun prérequis. Tu peux commencer ici.</p>"}</section><section class="panel"><span class="eyebrow">CE QUE ÇA OUVRE</span><h3>Et ensuite ?</h3>${after.length ? after.map((a) => `<div class="prereq">${link(a)}</div>`).join("") : '<p>Consolide ton projet et approfondis ta spécialisation.</p><a class="text-link" href="#/projects">Voir les projets →</a>'}</section><div class="aside-note"><b>Comprendre > mémoriser</b><p>Si tu bloques, reviens à une observation concrète. Une hypothèse doit pouvoir être confirmée ou réfutée.</p></div></aside></div>`;
}
function tracksPage() {
  return `${heading("BRANCHES DE MAÎTRISE", "Après le socle, choisis où devenir dangereux en profondeur.", "Tu restes généraliste sur le tronc commun, puis tu investis beaucoup plus de temps dans une ou deux branches. Red Team est une destination après la maîtrise des systèmes, du Web et de l’entreprise.")}<div class="track-grid">${tracks
    .map((t) => {
      const req = t.requires.filter((n) => !completed(state, byNumber[n]));
      return `<article class="track-card"><span class="track-icon">${esc(t.icon)}</span><span class="tag">${req.length ? "PRÉREQUIS EN COURS" : "BRANCHE OUVERTE"}</span><h2>${t.title}</h2><p>${t.desc}</p><ul>${t.focus.map((f) => `<li>${f}</li>`).join("")}</ul><div class="track-project"><small>CAPSTONE DE BRANCHE</small><p>${t.project}</p></div><h3>Skill gates nécessaires</h3><div class="resource-links">${t.requires.map((n) => link(byNumber[n], `${completed(state, byNumber[n]) ? "✓ " : ""}${byNumber[n].title}`)).join("")}</div><a class="text-link" href="#/module/${byNumber[req[0] || t.requires[0]].id}">${req.length ? "Travailler le prochain prérequis" : "Revoir la branche"} →</a></article>`;
    })
    .join("")}</div>`;
}
function projectsPage() {
  const milestones = projects.map((p, i) => {
      const stateP = state.projects[p.id] || { checks: [], notes: "" };
      const ready = p.requires.every((n) => completed(state, byNumber[n]));
      const done = ready && stateP.checks.length === 4 && stateP.checks.every(Boolean) && stateP.notes.trim().length >= 20;
      return `<article class="panel project"><div class="project-top"><span class="project-index">${String(i+1).padStart(2,"0")}</span><div><span class="eyebrow" data-project-status="${p.id}">JALON ${i + 1} · ${done ? "VALIDÉ" : ready ? "PRÊT À FINALISER" : "EN CONSTRUCTION"}</span><h2>${p.title}</h2><p>${p.desc}</p></div></div><div class="project-columns"><div><h3>Livrables obligatoires</h3>${p.deliverables.map((d, j) => `<label class="check-row"><input type="checkbox" data-project="${p.id}" data-index="${j}" ${stateP.checks[j] ? "checked" : ""}><span>${d}</span></label>`).join("")}<label class="field-label" for="project-${p.id}">Preuve / lien / rétrospective</label><textarea id="project-${p.id}" data-project-notes="${p.id}" rows="3" maxlength="10000">${esc(stateP.notes)}</textarea><p class="fine-print">Le jalon n’est acquis qu’après prérequis, quatre livrables et une preuve écrite.</p></div><div><h3>Skill gates mobilisés</h3>${p.requires.map((n) => `<div class="prereq">${completed(state, byNumber[n]) ? "✓" : "○"} ${link(byNumber[n])}</div>`).join("")}</div></div></article>`;
    }).join("");
  const forge = forgeProjects.map((p) => `<article class="forge-card"><span>${p.n}</span><small>${esc(p.stage)}</small><strong>${esc(p.title)}</strong></article>`).join("");
  return `${heading("JALONS & FORGE 40", "Construis une carrière de preuves, pas une collection de badges.", "Dix jalons majeurs structurent le parcours. FORGE 40 fournit quarante projets à construire progressivement pour transformer les connaissances en capacité réelle.")}<div class="project-list">${milestones}</div><section class="section forge-section"><div class="section-title"><div><span class="eyebrow">FORGE 40</span><h2>40 projets pour forcer l’intégration</h2><p>Ils ne sont pas tous à faire en parallèle. Chaque projet doit produire du code, un lab, un rapport, une détection ou une étude technique réutilisable.</p></div></div><div class="forge-grid">${forge}</div></section>`;
}
function chainsPage() {
  return `${heading("CONNECTER LES COMPÉTENCES", "Comprendre les chaînes de risques.", "Un incident traverse souvent plusieurs frontières de confiance. Ces ateliers servent à analyser des dossiers de laboratoire, relier les preuves et identifier les contrôles qui interrompent une chaîne.")}<div class="notice">Ateliers d’analyse : utilise les configurations et journaux de tes propres labs. Chaque transition doit être justifiée par une preuve.</div>${scenarios.map((s, i) => `<article class="panel scenario"><span class="eyebrow">ATELIER 0${i + 1} · ${s.tag}</span><h2>${s.title}</h2><p>${s.story}</p><ol class="chain">${s.steps.map((step, j) => `<li><small>0${j + 1}</small>${step}</li>`).join("")}</ol><div class="project-columns"><div><h3>Questions à résoudre</h3><ul>${s.questions.map((q) => `<li>${q}</li>`).join("")}</ul></div><div><h3>Dossier à préparer</h3><p>${s.evidence}</p><div class="resource-links">${s.requires.map((n) => link(byNumber[n])).join("")}</div></div></div><label class="field-label" for="scenario-${i}">Ton analyse et les points de rupture proposés</label><textarea id="scenario-${i}" data-scenario="${i}" rows="3" maxlength="10000" placeholder="Faits établis, hypothèses restantes, détection et corrections…">${esc(state.scenarioNotes[i] || "")}</textarea></article>`).join("")}`;
}
function resourcesPage() {
  const resources = new Map();
  for (const m of modules)
    for (const [name, url] of m.resources) {
      if (!resources.has(url)) resources.set(url, { name, url, modules: [] });
      resources.get(url).modules.push(m);
    }
  return `${heading("LA BIBLIOTHÈQUE", "La bonne ressource au bon moment.", "Documentation, référentiels et plateformes de pratique, reliés aux modules qui en ont besoin. Commence par ton objectif, puis consulte la référence.")}<label class="search resource-search"><span aria-hidden="true">⌕</span><input type="search" id="resource-search" aria-label="Filtrer les ressources" placeholder="Rechercher une ressource ou un module…"></label><div class="resource-grid">${[...resources.values()].map((r) => `<article class="resource-card" data-resource-text="${esc([r.name, ...r.modules.map((m) => m.title)].join(" ").toLowerCase())}"><span class="resource-icon">↗</span><h2><a href="${r.url}" target="_blank" rel="noopener noreferrer">${esc(r.name)} ↗</a></h2><small>${esc(new URL(r.url).hostname)}</small><p>À utiliser pour :</p>${r.modules.map((m) => `<div class="resource-module">${link(m)}</div>`).join("")}</article>`).join("")}</div><p id="resources-empty" hidden>Aucune ressource correspondante. Essaie un autre terme.</p>`;
}
function progressPage() {
  return `${heading("TON ESPACE PERSONNEL", "Garde le fil de ton apprentissage.", "Ta progression et tes notes sont conservées sur cet appareil. Exporte une sauvegarde pour les transférer ou les garder en sécurité.")}<div class="progress-overview panel"><div><strong>${percent()}<span>%</span></strong><p>${doneCount()} modules du tronc commun validés sur ${totalCore}</p></div><div><progress max="${totalCore}" value="${doneCount()}"></progress><p>${modules.filter((m) => m.type === "OPTION" && completed(state, m)).length} / ${modules.filter((m) => m.type === "OPTION").length} modules de spécialisation validés</p></div></div><section class="panel"><h2>Ton profil d’apprentissage</h2><p>${state.profile ? `${esc(state.profile.name || "Apprenant")} · ${state.profile.hours} h par semaine · ${esc(state.profile.level === "it" ? "Expérience IT / réseau" : state.profile.level === "restart" ? "Reprise des fondations" : "Bases cyber déjà pratiquées")}` : "Ton profil n’est pas encore configuré."}</p><button class="button outline" data-action="onboard">Ajuster mon parcours</button><p class="fine-print">Les durées des modules sont des repères, pas une promesse de calendrier. Valide des compétences à ton rythme.</p></section><section class="panel"><h2>Sauvegarder & transférer</h2><p>Les sauvegardes contiennent ton profil, tes notes et tes validations. L’import remplace la progression locale après confirmation.</p><div class="actions"><button class="button primary" data-action="export">Exporter ma progression ↓</button><label class="button outline file-label">Importer une sauvegarde<input id="import-file" type="file" accept="application/json,.json"></label><button class="button outline" data-action="account">${user ? "Sauvegarde en ligne" : "Comptes & synchronisation"}</button></div></section><section class="panel"><h2>Mes données</h2><p>Sans compte connecté, aucune note n’est transmise à un serveur par l’application. Le site utilise le stockage de ton navigateur ; GitHub Pages peut collecter des journaux techniques d’hébergement.</p><button class="danger-button" data-action="reset">Effacer ma progression locale</button><p class="fine-print">Cette action ne supprime pas une éventuelle sauvegarde en ligne.</p></section>`;
}
function notFound() {
  return `${heading("PAGE INTROUVABLE", "Ce chemin n’existe pas.", "Reviens à la carte pour retrouver ton prochain module.")}<a class="button primary" href="#/map">Ouvrir la carte →</a>`;
}
function centerGraph() {
  const viewport = $(".graph-viewport");
  if (viewport)
    viewport.scrollLeft = Math.max(0, (1080 - viewport.clientWidth) / 2);
}
function render(focus = false) {
  const parts = location.hash.replace(/^#\/?/, "").split("/"),
    route = parts[0] || "catalog",
    id = parts[1];
  if (stages.some((s) => s.id === route)) {
    location.replace("#/map/" + route);
    return;
  }
  if (route === "map" && id && stages.some((s) => s.id === id))
    stageFilter = id;
  trackFilter =
    route === "map" &&
    id?.startsWith("track-") &&
    tracks.some((t) => t.id === id.slice(6))
      ? id.slice(6)
      : null;
  if (trackFilter) stageFilter = "all";
  document.body.classList.toggle(
    "public-layout",
    ["catalog", "map"].includes(route),
  );
  shell();
  const pages = {
    catalog: catalogPage,
    path: pathPage,
    map: mapPage,
    module: () => modulePage(id),
    tracks: tracksPage,
    projects: projectsPage,
    chains: chainsPage,
    resources: resourcesPage,
    progress: progressPage,
  };
  $("#main").innerHTML = (pages[route] || notFound)();
  centerGraph();
  const routeNames = {
    catalog: "Vue d’ensemble",
    path: "Master Roadmap",
    map: "Skill Graph",
    module: byId[id]?.title || "Module",
    tracks: "Branches avancées",
    projects: "Jalons & FORGE 40",
    chains: "Attack chains",
    resources: "Bibliothèque",
    progress: "Ma progression",
  };
  $("#route-label").textContent = routeNames[route] || "Page introuvable";
  document.title = `${routeNames[route] || "Lumina Academy"} — Lumina Academy`;
  document
    .querySelector(`[data-nav="${route === "module" ? "map" : route}"]`)
    ?.setAttribute("aria-current", "page");
  if ($("#module-drawer")?.open && drawerModule) drawModule(drawerModule);
  if (focus) {
    window.scrollTo({ top: 0 });
    $("#main h1")?.focus({ preventScroll: true });
  }
}
let onboardingStep = 0,
  draft = {};
function onboard() {
  onboardingStep = 0;
  draft = {
    name: state.profile?.name || "",
    level: state.profile?.level || "security",
    hours: state.profile?.hours || 20,
    goal: state.profile?.goal || "general",
  };
  drawOnboard();
  $("#onboarding").showModal();
}
function drawOnboard() {
  const d = $("#onboarding");
  d.innerHTML = `<button class="dialog-close" data-close="onboarding" aria-label="Fermer">×</button><span class="eyebrow">TON POINT DE DÉPART · ${onboardingStep + 1} / 3</span><div class="step-indicator">${[0, 1, 2].map((i) => `<span class="${i <= onboardingStep ? "filled" : ""}"></span>`).join("")}</div><h2 id="onboard-title">${["Faisons connaissance.", "Quelle direction t’attire ?", "Un rythme qui tient dans ta vie."][onboardingStep]}</h2><form id="onboard-form">${
    onboardingStep === 0
      ? `<label class="field-label" for="learner-name">Comment veux-tu être appelé ?</label><input id="learner-name" name="name" maxlength="40" value="${esc(draft.name)}" placeholder="Ton prénom ou ton pseudo" autocomplete="nickname"><fieldset><legend>Ton point de départ</legend>${[
          [
            "restart",
            "Je reprends les fondations",
            "Reconstruire progressivement les réflexes systèmes.",
          ],
          [
            "it",
            "Je travaille déjà en IT / réseau",
            "Capitaliser sur l’expérience, vérifier les bases.",
          ],
          [
            "security",
            "J’ai déjà pratiqué la cybersécurité",
            "Démontrer les acquis et combler les lacunes.",
          ],
        ]
          .map(
            ([v, t, p]) =>
              `<label class="choice"><input type="radio" name="level" value="${v}" ${draft.level === v ? "checked" : ""}><span><b>${t}</b><small>${p}</small></span></label>`,
          )
          .join("")}</fieldset>`
      : onboardingStep === 1
        ? `<p>Le tronc commun reste ta base. Tu pourras changer d’avis à tout moment.</p><div class="goal-grid">${[{ id: "general", title: "Pentester généraliste" }, ...tracks].map((t) => `<label class="choice"><input type="radio" name="goal" value="${t.id}" ${draft.goal === t.id ? "checked" : ""}><b>${t.title}</b></label>`).join("")}</div>`
        : `<label class="field-label" for="hours">Temps disponible chaque semaine</label><select id="hours" name="hours">${[5, 10, 15, 20, 25].map((h) => `<option value="${h}" ${Number(draft.hours) === h ? "selected" : ""}>${h} heures / semaine</option>`).join("")}</select><div class="notice"><b>Ton démarrage conseillé</b><p>Commence par le diagnostic. Si une compétence est déjà acquise, démontre-la dans sa fiche pour avancer plus vite.</p></div><p>Une séance : comprendre un mécanisme, réaliser une activité, puis noter ce que tu peux expliquer sans aide.</p>`
  }<div class="dialog-actions">${onboardingStep ? '<button type="button" class="button outline" data-action="onboard-back">Retour</button>' : "<span>Sans compte. Sans engagement.</span>"}<button class="button primary" type="submit">${onboardingStep === 2 ? "Créer mon parcours" : "Continuer"} →</button></div></form>`;
  if (d.open) d.querySelector('input,select,button[type="submit"]')?.focus();
}
function account() {
  const d = $("#account");
  d.innerHTML = `<button class="dialog-close" data-close="account" aria-label="Fermer">×</button><span class="eyebrow">TON ESPACE</span><h2 id="account-title">${user ? "Retrouve ta progression." : "Apprends dès maintenant."}</h2>${!auth.configured ? `<p>Ton parcours est accessible sans inscription. Ta progression reste enregistrée sur cet appareil.</p><div class="notice"><b>Les inscriptions ne sont pas encore ouvertes.</b><p>La connexion et la sauvegarde entre appareils seront disponibles après l’activation du service de comptes.</p></div><a class="button primary" href="#/progress" data-close="account">Gérer ma sauvegarde →</a>` : user ? `<p>Connecté : ${esc(user.email)}</p><p>Choisis explicitement quelle copie conserver. Restaurer remplace la progression de cet appareil ; sauvegarder remplace celle du compte.</p><div class="actions"><button class="button primary" data-action="cloud-save">Sauvegarder en ligne</button><button class="button outline" data-action="cloud-load">Restaurer depuis mon compte</button><button class="button outline" data-action="logout">Se déconnecter</button></div><p class="fine-print">Se déconnecter conserve les notes locales. Sur un appareil partagé, exporte-les puis efface-les depuis « Mes données ».</p>` : `<p>Inscris-toi ou connecte-toi avec un lien envoyé par e-mail. Aucun mot de passe à mémoriser.</p><form id="auth-form"><label class="field-label" for="email">Adresse e-mail</label><input id="email" type="email" name="email" required autocomplete="email" placeholder="toi@exemple.com"><p class="fine-print">Ton e-mail est traité par le service d’authentification Supabase. Tes notes ne sont envoyées que lorsque tu choisis de sauvegarder en ligne.</p><button class="button primary" type="submit">Recevoir mon lien de connexion →</button></form>`}<p id="auth-status" role="status"></p>`;
  if (!d.open) d.showModal();
}
function updateProjectStatus(id) {
  const index = projects.findIndex((p) => p.id === id),
    project = projects[index],
    p = state.projects[id];
  const ready = project.requires.every((n) => completed(state, byNumber[n]));
  const done =
    ready &&
    p?.checks.length === 4 &&
    p.checks.every(Boolean) &&
    (p.notes || "").trim().length >= 20;
  const label = document.querySelector(`[data-project-status="${id}"]`);
  if (label)
    label.textContent = `JALON ${index + 1} · ${done ? "VALIDÉ" : ready ? "PRÊT À FINALISER" : "EN CONSTRUCTION"}`;
}
function updateValidation(id) {
  const p = state.modules[id],
    m = byId[id],
    b = document.querySelector(`[data-complete="${id}"]`);
  if (b) {
    b.textContent = p.done ? "Rouvrir le module" : "Valider le module ✓";
    b.disabled =
      !p.done &&
      (!(p.checks?.length === 3 && p.checks.every(Boolean)) ||
        (p.notes || "").trim().length < 20 ||
        missing(state, m, byNumber).length > 0);
  }
}
document.addEventListener("click", async (e) => {
  const node = e.target.closest("[data-open-module]");
  if (node) openModule(node.dataset.openModule);
  const zoom = e.target.closest("[data-zoom]");
  if (zoom) {
    const viewport = $(".graph-viewport"),
      canvas = $(".graph-canvas");
    if (viewport && canvas) {
      const current = Number(canvas.dataset.zoom || 1);
      const value =
        zoom.dataset.zoom === "fit"
          ? Math.min(1, (viewport.clientWidth - 24) / 1080)
          : Math.max(
              0.3,
              Math.min(
                1.5,
                current + (zoom.dataset.zoom === "in" ? 0.15 : -0.15),
              ),
            );
      canvas.dataset.zoom = value;
      canvas.style.transform = `scale(${value})`;
      $(".graph-scaler").style.width = 1080 * value + "px";
      $(".graph-scaler").style.height =
        parseFloat(canvas.style.height) * value + "px";
      $("#zoom-label").textContent = Math.round(value * 100) + " %";
    }
  }

  const close = e.target.closest("[data-close]");
  if (close) $("#" + close.dataset.close).close();
  const a = e.target.closest("[data-action]");
  if (a) {
    const action = a.dataset.action;
    if (action === "menu") {
      const isOpen = document.body.classList.toggle("menu-open");
      a.setAttribute("aria-expanded", String(isOpen));
    }
    if (action === "onboard") onboard();
    if (action === "account") account();
    if (action === "onboard-back") {
      const form = $("#onboard-form");
      if (onboardingStep === 1) draft.goal = new FormData(form).get("goal");
      onboardingStep--;
      drawOnboard();
    }
    if (action === "export") {
      const blob = new Blob([JSON.stringify(state, null, 2)], {
          type: "application/json",
        }),
        url = URL.createObjectURL(blob),
        link = document.createElement("a");
      link.href = url;
      link.download = "lumina-academy-progression.json";
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast("Sauvegarde exportée.");
    }
    if (
      action === "reset" &&
      confirm(
        "Effacer le profil, les notes et toute la progression de cet appareil ? Exporte une copie avant de continuer.",
      )
    ) {
      state = empty();
      try {
        localStorage.removeItem("osr-progress-v2");
      } catch {}
      save();
      render();
      toast("Progression locale effacée.");
    }
    if (action === "clear-filters") {
      search = "";
      filter = "all";
      stageFilter = "all";
      history.replaceState(null, "", "#/map");
      render();
    }
    if (["cloud-save", "cloud-load", "logout"].includes(action)) {
      a.disabled = true;
      try {
        if (action === "cloud-save") {
          if (
            confirm(
              "Remplacer la sauvegarde en ligne par la progression de cet appareil ?",
            )
          ) {
            await auth.upload(state);
            $("#auth-status").textContent = "Sauvegarde en ligne terminée.";
          }
        }
        if (action === "cloud-load") {
          const remote = sanitize(await auth.download(), modules);
          if (
            confirm("Remplacer la progression locale par celle de ton compte ?")
          ) {
            state = remote;
            save();
            render();
            $("#auth-status").textContent = "Progression restaurée.";
          }
        }
        if (action === "logout") {
          await auth.signOut();
          user = null;
          render();
          account();
        }
      } catch (err) {
        $("#auth-status").textContent = "Action impossible : " + err.message;
      } finally {
        a.disabled = false;
      }
    }
  }
  const stage = e.target.closest("[data-stage]");
  if (stage) {
    trackFilter = null;
    stageFilter = stage.dataset.stage;
    history.replaceState(null, "", "#/map");
    render();
  }
  const view = e.target.closest("[data-view]");
  if (view) {
    mapView = view.dataset.view;
    render();
  }
  const complete = e.target.closest("[data-complete]");
  if (complete) {
    const id = complete.dataset.complete,
      m = byId[id],
      p = state.modules[id];
    if (p?.done) {
      if (
        !confirm(
          "Rouvrir ce module ? Les modules validés qui en dépendent seront également rouverts.",
        )
      )
        return;
      p.done = false;
      invalidateDependents(state, m.n, modules);
    } else {
      if (
        !p ||
        missing(state, m, byNumber).length ||
        p.checks.length !== 3 ||
        !p.checks.every(Boolean) ||
        (p.notes || "").trim().length < 20
      )
        return;
      p.done = true;
    }
    p.updatedAt = new Date().toISOString();
    save();
    render();
    toast(
      p.done
        ? "Compétence validée. Ta prochaine étape est disponible."
        : "Module rouvert pour révision.",
    );
  }
});
document.addEventListener("input", (e) => {
  const el = e.target;
  if (el.id === "search") {
    search = el.value;
    $("#map-results").innerHTML = mapResults();
    centerGraph();
  }
  if (el.id === "resource-search") {
    let count = 0;
    document.querySelectorAll("[data-resource-text]").forEach((card) => {
      card.hidden = !card.dataset.resourceText.includes(
        el.value.trim().toLowerCase(),
      );
      if (!card.hidden) count++;
    });
    $("#resources-empty").hidden = !!count;
  }
  if (el.dataset.notes) {
    const id = el.dataset.notes;
    const p = (state.modules[id] ??= {
      checks: [false, false, false],
      notes: "",
      done: false,
    });
    p.notes = el.value;
    if (p.done && p.notes.trim().length < 20) {
      p.done = false;
      invalidateDependents(state, byId[id].n, modules);
    }
    save();
    updateValidation(id);
  }
  if (el.dataset.projectNotes) {
    const p = (state.projects[el.dataset.projectNotes] ??= {
      checks: [false, false, false, false],
      notes: "",
    });
    p.notes = el.value;
    save();
    updateProjectStatus(el.dataset.projectNotes);
  }
  if (el.dataset.scenario !== undefined) {
    state.scenarioNotes[el.dataset.scenario] = el.value;
    save();
  }
});
document.addEventListener("change", async (e) => {
  const el = e.target;
  if (el.id === "status-filter") {
    filter = el.value;
    $("#map-results").innerHTML = mapResults();
    centerGraph();
  }
  if (el.dataset.check) {
    const id = el.dataset.check;
    const p = (state.modules[id] ??= {
      checks: [false, false, false],
      notes: "",
      done: false,
    });
    p.checks[Number(el.dataset.index)] = el.checked;
    if (p.done && !el.checked) {
      p.done = false;
      invalidateDependents(state, byId[id].n, modules);
      save();
      render();
      toast("Validation retirée ; les dépendances sont à revoir.");
    } else {
      save();
      updateValidation(id);
    }
  }
  if (el.dataset.project) {
    const p = (state.projects[el.dataset.project] ??= {
      checks: [false, false, false, false],
      notes: "",
    });
    p.checks[Number(el.dataset.index)] = el.checked;
    save();
    updateProjectStatus(el.dataset.project);
  }
  if (el.id === "import-file" && el.files[0]) {
    try {
      if (el.files[0].size > 2 * 1024 * 1024)
        throw new Error("Fichier trop volumineux (maximum 2 Mo).");
      const imported = sanitize(JSON.parse(await el.files[0].text()), modules);
      if (
        confirm("Remplacer toute la progression locale par cette sauvegarde ?")
      ) {
        state = imported;
        save();
        render();
        toast("Progression importée.");
      }
    } catch (err) {
      toast("Import refusé : " + err.message);
    }
    el.value = "";
  }
});
document.addEventListener("submit", async (e) => {
  if (e.target.id === "onboard-form") {
    e.preventDefault();
    const data = new FormData(e.target);
    if (onboardingStep === 0) {
      draft.name = data.get("name").trim();
      draft.level = data.get("level");
    }
    if (onboardingStep === 1) draft.goal = data.get("goal");
    if (onboardingStep === 2) {
      draft.hours = Number(data.get("hours"));
      state.profile = draft;
      save();
      $("#onboarding").close();
      location.hash = "#/path";
      render();
      toast("Ton parcours est prêt. Commence par le diagnostic.");
    } else {
      onboardingStep++;
      drawOnboard();
    }
  }
  if (e.target.id === "auth-form") {
    e.preventDefault();
    const b = e.target.querySelector("button");
    b.disabled = true;
    try {
      await auth.signIn(new FormData(e.target).get("email"));
      $("#auth-status").textContent =
        "Si l’envoi est autorisé, tu recevras un lien de connexion. Vérifie aussi tes courriers indésirables.";
    } catch (err) {
      $("#auth-status").textContent = "Envoi impossible : " + err.message;
    } finally {
      b.disabled = false;
    }
  }
});
window.addEventListener("hashchange", () => {
  $("#module-drawer")?.close();
  document.body.classList.remove("menu-open");
  render(true);
});
window.addEventListener("storage", (e) => {
  if (e.key === KEY) {
    try {
      state = load(localStorage, modules);
      render();
      toast("Progression actualisée depuis un autre onglet.");
    } catch {}
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.body.classList.remove("menu-open");
    $(".mobile-menu")?.setAttribute("aria-expanded", "false");
  }
});
let drawerModule = null;
const drawer = document.createElement("dialog");
drawer.id = "module-drawer";
drawer.setAttribute("aria-labelledby", "drawer-title");
document.body.append(drawer);
drawer.addEventListener("close", () => {
  drawerModule = null;
});
function drawModule(id) {
  drawer.innerHTML = `<button class="dialog-close" data-close="module-drawer" aria-label="Fermer la fiche">×</button><div class="drawer-content">${modulePage(id)}</div>`;
  drawer.querySelector("h1").id = "drawer-title";
}
function openModule(id) {
  if (!byId[id]) return;
  drawerModule = id;
  drawModule(id);
  drawer.showModal();
  drawer.scrollTop = 0;
}
document.addEventListener("pointerover", (e) => {
  const node = e.target.closest("[data-open-module]");
  if (!node) return;
  document
    .querySelectorAll(".graph-edges path[data-from]")
    .forEach((line) =>
      line.classList.toggle(
        "highlight",
        line.dataset.from === node.dataset.openModule ||
          line.dataset.to === node.dataset.openModule,
      ),
    );
});
function catalogPage() {
  const core=modules.filter((m)=>m.type==="CORE").length;
  return `<section class="catalog-hero"><span class="catalog-kicker">LUMINA / PERSONAL CYBER MASTERY SYSTEM</span><h1 tabindex="-1">Devenir très fort ne demande pas plus de contenu.<br><em>Ça demande un meilleur système.</em></h1><p>Ta roadmap personnelle relie systèmes, programmation, Web, Active Directory, Red Team et défense.<br>Chaque compétence possède des prérequis, des labs et une preuve de maîtrise.</p><div class="catalog-actions"><a class="button primary" href="#/path">Entrer dans la Master Roadmap <span>→</span></a><a class="button outline" href="#/map">Voir le Skill Graph</a></div><div class="catalog-pills"><span>↗ ${modules.length} skill gates</span><span>✓ ${projects.length} jalons majeurs</span><span>◇ FORGE 40 intégré</span><span>⚑ CAPT → CPTS → Pro Labs</span></div></section>
<section class="catalog-section"><div class="catalog-section-title"><h2>Le système complet</h2><span>${stages.length} phases · ${core} compétences core · ${tracks.length} branches.</span></div><div class="catalog-grid"><a class="catalog-card featured" href="#/path"><div><span class="catalog-card-icon">⌁</span><span class="catalog-label">PARCOURS PRINCIPAL</span></div><h3>Cybersecurity Master Roadmap</h3><p>Reconstruction des bases → pentest → Web/API → entreprise/AD → Red/Purple → capstone.</p><footer><span>${modules.length} modules · ${stages.length} phases</span><b>↗</b></footer></a>${tracks.map((t) => `<a class="catalog-card" href="#/map/track-${t.id}"><div><span class="catalog-card-icon">${esc(t.icon)}</span><span class="catalog-label">BRANCHE AVANCÉE</span></div><h3>${t.title}</h3><p>${t.desc}</p><footer><span>Prérequis transitifs + capstone</span><b>↗</b></footer></a>`).join("")}</div></section>
<section class="catalog-section"><div class="catalog-section-title"><h2>Les skill gates critiques</h2><span>Ceux qui changent réellement ton niveau.</span></div><div class="skill-chips">${["02","04","06","10","15","18","24","27","30","33","35","43","45","48","50"].map((n) => `<button data-open-module="${byNumber[n].id}">${esc(byNumber[n].title)} <span>↗</span></button>`).join("")}</div></section>
<section class="catalog-bottom"><div><span class="eyebrow">RÈGLE DU PARCOURS</span><h2>Une certification valide un moment. Ton système de compétences doit survivre après.</h2><p>CPTS est un objectif majeur. La destination reste l’autonomie : comprendre, attaquer en lab, coder, détecter, corriger et expliquer.</p></div><a class="button outline" href="#/projects">Voir les jalons →</a></section>`;
}
render();
if (auth.configured)
  auth
    .getUser()
    .then((u) => {
      user = u;
      render();
    })
    .catch(() =>
      toast("Connexion indisponible. Le parcours reste accessible."),
    );
