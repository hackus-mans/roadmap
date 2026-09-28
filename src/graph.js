// Layout uses real prerequisites, not arbitrary card ordering.
export function layoutGraph(list, allByNumber) {
  const visible = new Set(list.map((m) => m.n)),
    ranks = new Map();
  function rank(m) {
    if (ranks.has(m.n)) return ranks.get(m.n);
    const parents = m.prereqs.filter((n) => visible.has(n));
    const value = parents.length
      ? 1 + Math.max(...parents.map((n) => rank(allByNumber[n])))
      : 0;
    ranks.set(m.n, value);
    return value;
  }
  list.forEach(rank);
  const levels = [...new Set(ranks.values())].sort((a, b) => a - b);
  const width = 1080,
    nodeWidth = 222,
    nodeHeight = 106,
    rowHeight = 178;
  const nodes = list.map((m) => {
    const row = list.filter((x) => ranks.get(x.n) === ranks.get(m.n)),
      index = row.indexOf(m);
    return {
      m,
      x: width / 2 + (index - (row.length - 1) / 2) * 258 - nodeWidth / 2,
      y: 65 + ranks.get(m.n) * rowHeight,
      width: nodeWidth,
      height: nodeHeight,
    };
  });
  const lookup = Object.fromEntries(nodes.map((n) => [n.m.n, n]));
  const edges = nodes.flatMap((to) =>
    to.m.prereqs
      .filter((n) => visible.has(n))
      .map((n) => ({ from: lookup[n], to })),
  );
  return {
    nodes,
    edges,
    width,
    height: Math.max(330, levels.length * rowHeight + 85),
  };
}
export function renderGraph(list, byNumber, getStatus, escape) {
  const g = layoutGraph(list, byNumber);
  const lines = g.edges
    .map(({ from, to }) => {
      const x1 = from.x + from.width / 2,
        y1 = from.y + from.height,
        x2 = to.x + to.width / 2,
        y2 = to.y;
      const midpoint = y1 + (y2 - y1) / 2;
      return `<path data-from="${from.m.id}" data-to="${to.m.id}" d="M${x1},${y1} C${x1},${midpoint} ${x2},${midpoint} ${x2},${y2}"/>`;
    })
    .join("");
  return `<div class="graph-controls"><span><b>${list.length} compétences. ${g.edges.length} liens de prérequis.</b> Les flèches représentent les prérequis.</span><div><button data-zoom="out" aria-label="Réduire le zoom">−</button><output id="zoom-label">100 %</output><button data-zoom="in" aria-label="Augmenter le zoom">+</button><button data-zoom="fit">Ajuster</button></div></div><div class="graph-viewport" tabindex="0" role="region" aria-label="Arbre interactif des compétences. Défile horizontalement et verticalement ou utilise la vue liste."><div class="graph-scaler" style="width:${g.width}px;height:${g.height}px"><div class="graph-canvas" style="width:${g.width}px;height:${g.height}px"><svg class="graph-edges" viewBox="0 0 ${g.width} ${g.height}" aria-hidden="true"><defs><marker id="arrow-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#8b79a6"/></marker></defs>${lines}</svg><div class="graph-start">TON POINT DE DÉPART</div>${g.nodes.map(({ m, x, y, width, height }) => `<button class="graph-node skill-node ${getStatus(m)} ${m.type === "OPTION" ? "optional" : ""}" data-open-module="${m.id}" style="left:${x}px;top:${y}px;width:${width}px;height:${height}px" aria-label="${escape(m.title)} — ouvrir la fiche"><span class="graph-node-kicker">${m.n} · ${escape(m.stageTitle)}</span><strong>${escape(m.title)}</strong><span class="graph-node-topics">${escape(m.learn.slice(0, 2).join(" · "))}</span><span class="graph-check">${getStatus(m) === "done" ? "✓" : "↗"}</span></button>`).join("")}<span class="graph-end">La compétence se démontre. La spécialisation se choisit.</span></div></div></div>`;
}
