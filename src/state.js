export const KEY = "cyberpath-v3";
export const empty = () => ({
  version: 3,
  profile: null,
  modules: {},
  projects: {},
  scenarioNotes: {},
  updatedAt: null,
});
export function sanitize(raw, modules) {
  if (
    !raw ||
    raw.version !== 3 ||
    typeof raw.modules !== "object" ||
    !raw.modules
  )
    throw new Error("Format de sauvegarde incompatible.");
  const out = empty();
  if (raw.profile && typeof raw.profile === "object")
    out.profile = {
      name: String(raw.profile.name || "").slice(0, 40),
      hours: [5, 10, 15, 20, 25].includes(Number(raw.profile.hours))
        ? Number(raw.profile.hours)
        : 20,
      goal: String(raw.profile.goal || "general").slice(0, 30),
      level: ["restart", "it", "security"].includes(raw.profile.level)
        ? raw.profile.level
        : "it",
    };
  for (const m of modules) {
    const p = raw.modules[m.id];
    if (p && typeof p === "object")
      out.modules[m.id] = {
        checks: Array.from(
          { length: m.criteria.length },
          (_, i) => p.checks?.[i] === true,
        ),
        notes: String(p.notes || "").slice(0, 10000),
        done: p.done === true,
        updatedAt: typeof p.updatedAt === "string" ? p.updatedAt : null,
      };
  }
  for (const [id, p] of Object.entries(raw.projects || {}))
    if (/^[a-z0-9-]{1,80}$/i.test(id) && p && typeof p === "object")
      out.projects[id] = {
        checks: Array.from({ length: 4 }, (_, i) => p.checks?.[i] === true),
        notes: String(p.notes || "").slice(0, 10000),
      };
  for (const [i, note] of Object.entries(raw.scenarioNotes || {}))
    if (/^\d{1,3}$/.test(i))
      out.scenarioNotes[i] = String(note || "").slice(0, 10000);
  out.updatedAt = typeof raw.updatedAt === "string" ? raw.updatedAt : null;
  return out;
}
export function load(storage, modules) {
  try {
    const saved = storage.getItem(KEY);
    if (saved) return sanitize(JSON.parse(saved), modules);
  } catch {}
  const out = empty();
  try {
    const legacy = JSON.parse(storage.getItem("osr-progress-v2") || "{}");
    for (const m of modules)
      if (legacy[m.id])
        out.modules[m.id] = {
          done: true,
          checks: m.criteria.map(() => true),
          notes: "Validation importée de la version précédente.",
          updatedAt: null,
        };
  } catch {}
  return out;
}
export const completed = (state, m) => state.modules[m.id]?.done === true;
export const missing = (state, m, byNumber) =>
  m.prereqs.map((n) => byNumber[n]).filter((p) => !completed(state, p));
export function nextModule(state, modules, byNumber) {
  return (
    modules.find(
      (m) =>
        m.type === "CORE" &&
        !completed(state, m) &&
        !missing(state, m, byNumber).length,
    ) ||
    modules.find(
      (m) => !completed(state, m) && !missing(state, m, byNumber).length,
    ) ||
    null
  );
}
export function status(state, m, byNumber) {
  if (completed(state, m)) return "done";
  if (missing(state, m, byNumber).length) return "locked";
  if (state.modules[m.id]?.checks?.some(Boolean) || state.modules[m.id]?.notes)
    return "active";
  return "ready";
}
export function invalidateDependents(state, number, modules) {
  for (const m of modules)
    if (m.prereqs.includes(number) && state.modules[m.id]?.done) {
      state.modules[m.id].done = false;
      invalidateDependents(state, m.n, modules);
    }
}
