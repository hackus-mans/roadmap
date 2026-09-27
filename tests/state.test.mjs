import test from "node:test";
import assert from "node:assert/strict";
globalThis.window = {};
await import("../roadmap-data.js");
const { modules, byNumber, byId, projects } =
  await import("../src/curriculum.js");
const {
  empty,
  sanitize,
  load,
  nextModule,
  missing,
  invalidateDependents,
  KEY,
} = await import("../src/state.js");
test("curriculum IDs, criteria, resources and dependencies are consistent and acyclic", () => {
  assert.equal(modules.length, 22);
  assert.equal(new Set(modules.map((m) => m.id)).size, 22);
  const visit = (m, path = []) => {
    assert.ok(!path.includes(m.n), "cycle " + m.n);
    for (const n of m.prereqs) {
      assert.ok(byNumber[n]);
      visit(byNumber[n], [...path, m.n]);
    }
  };
  for (const m of modules) {
    visit(m);
    assert.equal(m.criteria.length, 3);
    for (const [, url] of m.resources)
      assert.equal(new URL(url).protocol, "https:");
  }
  for (const p of projects) for (const n of p.requires) assert.ok(byNumber[n]);
});
test("next step respects dependencies and prioritizes core", () => {
  const s = empty();
  assert.equal(nextModule(s, modules, byNumber).n, "01");
  s.modules[byNumber["01"].id] = { done: true };
  assert.equal(nextModule(s, modules, byNumber).n, "02");
  assert.equal(missing(s, byNumber["16"], byNumber).length, 5);
});
test("reopening a module invalidates all dependent validations", () => {
  const s = empty();
  for (const m of modules) s.modules[m.id] = { done: true };
  invalidateDependents(s, "03", modules);
  assert.equal(s.modules[byNumber["13"].id].done, false);
  assert.equal(s.modules[byNumber["21"].id].done, false);
  assert.equal(s.modules[byNumber["02"].id].done, true);
});
test("legacy progress is retained", () => {
  const s = load(
    {
      getItem: (k) =>
        k === "osr-progress-v2"
          ? JSON.stringify({ "foundations-01": true })
          : null,
    },
    modules,
  );
  assert.equal(s.modules["foundations-01"].done, true);
  assert.equal(s.modules["foundations-01"].checks.length, 3);
});
test("malformed local storage falls back safely", () => {
  assert.deepEqual(load({ getItem: () => "{broken" }, modules), empty());
  assert.deepEqual(
    load(
      {
        getItem: () => {
          throw Error("disabled");
        },
      },
      modules,
    ),
    empty(),
  );
});
test("import rejects incompatible format and strips unknown IDs", () => {
  assert.throws(() => sanitize({}, modules));
  const s = empty();
  s.modules.unknown = { done: true };
  s.profile = { name: "a".repeat(100), hours: 999 };
  s.modules[byNumber["02"].id] = {
    notes: "x".repeat(20000),
    checks: [true, "true", 1],
    done: "true",
  };
  const result = sanitize(s, modules);
  assert.equal(result.modules.unknown, undefined);
  assert.equal(result.profile.name.length, 40);
  assert.equal(result.profile.hours, 5);
  assert.equal(result.modules[byNumber["02"].id].notes.length, 10000);
  assert.deepEqual(result.modules[byNumber["02"].id].checks, [
    true,
    false,
    false,
  ]);
  assert.equal(result.modules[byNumber["02"].id].done, false);
});
test("export/import round trip retains profile, notes, projects and scenarios", () => {
  const s = empty();
  s.profile = { name: "Joseph", hours: 10, goal: "web", level: "it" };
  s.modules["foundations-01"] = {
    done: true,
    checks: [true, true, true],
    notes: "Capture réseau documentée",
    updatedAt: null,
  };
  s.projects.lab = {
    checks: [true, false, false, false],
    notes: "Schéma de lab",
  };
  s.scenarioNotes[0] = "Hypothèse de filtrage";
  const r = sanitize(JSON.parse(JSON.stringify(s)), modules);
  assert.deepEqual(r.profile, s.profile);
  assert.deepEqual(r.modules, s.modules);
  assert.equal(r.scenarioNotes[0], s.scenarioNotes[0]);
  assert.deepEqual(r.projects, s.projects);
});
