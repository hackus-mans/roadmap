const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
(async () => {
  const options = { headless: true };
  if (process.env.CHROMIUM_EXECUTABLE)
    options.executablePath = process.env.CHROMIUM_EXECUTABLE;
  else if (process.env.USE_SPARTICUZ) {
    const mod = require("@sparticuz/chromium");
    const c = mod.default || mod;
    options.executablePath = await c.executablePath();
    options.args = c.args;
  }
  const browser = await chromium.launch(options);
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1100 },
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const base = process.env.TEST_BASE_URL || "http://localhost:4173";
  fs.mkdirSync(".test-output", { recursive: true });
  await page.goto(base);
  await page.locator("h1").waitFor();
  assert.match(await page.title(), /Lumina Academy/);
  await page.screenshot({ path: ".test-output/desktop.png", fullPage: true });
  await page.getByRole("button", { name: /Construire mon parcours/ }).click();
  await page.getByLabel("Comment veux-tu être appelé").fill("Joseph");
  await page.locator("#onboard-form button[type=submit]").click();
  await page.getByRole("radio", { name: "Web & API Exploitation", exact: true }).check();
  await page.locator("#onboard-form button[type=submit]").click();
  await page.getByLabel("Temps disponible").selectOption("10");
  await page.locator("#onboard-form button[type=submit]").click();
  await page.locator("#onboarding").waitFor({ state: "hidden" });
  assert.match(await page.locator("h1").textContent(), /Joseph/);
  assert.match(await page.locator(".study-plan").textContent(), /10 h/);
  await page.getByRole("link", { name: /Continuer mon parcours/ }).click();
  await page.waitForFunction(
    () => document.querySelector("h1")?.textContent === "Diagnostic technique",
  );
  assert.match(await page.locator("h1").textContent(), /Diagnostic/);
  assert.equal(await page.locator("[data-complete]").isDisabled(), true);
  for (const cb of await page.locator("[data-check]").all()) await cb.check();
  await page
    .getByLabel("Ma preuve de maîtrise")
    .fill(
      "J’ai documenté une capture DNS, TCP et HTTP dans mon laboratoire personnel.",
    );
  assert.equal(await page.locator("[data-complete]").isDisabled(), false);
  await page.locator("[data-complete]").click();
  assert.match(
    await page.locator(".module-detail-meta").textContent(),
    /Validé/,
  );
  await page.reload();
  await page.locator("h1").waitFor();
  assert.match(
    await page.getByLabel("Ma preuve de maîtrise").inputValue(),
    /capture DNS/,
  );
  await page.goto(base + "/#/module/core-09");
  await page.locator("[data-complete]").waitFor();
  for (const cb of await page.locator("[data-check]").all()) await cb.check();
  await page
    .getByLabel("Ma preuve de maîtrise")
    .fill(
      "Une preuve suffisante ne doit pas contourner les prérequis de ce module.",
    );
  assert.equal(await page.locator("[data-complete]").isDisabled(), true);
  await page.goto(base + "/#/map");
  await page.locator("#search").waitFor();
  assert.equal(await page.locator(".skill-node").count(), 50);
  await page.screenshot({
    path: ".test-output/map-desktop.png",
    fullPage: true,
  });
  assert.ok((await page.locator(".graph-edges>path").count()) > 100);
  await page.locator('[data-open-module="foundations-02"]').click();
  await page.locator("#module-drawer").waitFor({ state: "visible" });
  assert.match(await page.locator("#drawer-title").textContent(), /Linux/);
  await page.locator("#module-drawer [data-close]").click();
  await page.getByRole("button", { name: "Réduire le zoom" }).click();
  assert.equal(await page.locator("#zoom-label").textContent(), "85 %");
  await page.getByRole("button", { name: "Ajuster", exact: true }).click();

  await page
    .getByRole("searchbox", { name: "Chercher une compétence" })
    .fill("Kerberos");
  assert.equal(await page.locator(".skill-node").count(), 1);
  await page
    .getByRole("searchbox", { name: "Chercher une compétence" })
    .fill("zzzz-no-result");
  assert.equal(await page.getByText("Aucun module trouvé").count(), 1);
  await page.getByRole("button", { name: "Réinitialiser les filtres" }).click();
  await page.getByRole("button", { name: "Liste", exact: true }).click();
  assert.equal(await page.locator(".module-row").count(), 50);
  await page.goto(base + "/#/projects");
  await page.locator("[data-project-notes]").first().waitFor();
  await page
    .locator("[data-project-notes]")
    .first()
    .fill("Mon premier schéma de laboratoire est terminé et documenté.");
  await page.reload();
  assert.match(
    await page.locator("[data-project-notes]").first().inputValue(),
    /schéma/,
  );
  await page.goto(base + "/#/chains");
  await page.locator("[data-scenario]").first().waitFor();
  await page
    .locator("[data-scenario]")
    .first()
    .fill("La segmentation interrompt les communications non nécessaires.");
  await page.reload();
  assert.match(
    await page.locator("[data-scenario]").first().inputValue(),
    /segmentation/,
  );
  await page.goto(base + "/#/resources");
  await page.locator("#resource-search").waitFor();
  await page.locator("#resource-search").fill("python");
  assert.ok((await page.locator(".resource-card:visible").count()) >= 1);
  await page.locator("#resource-search").fill("zzz");
  assert.equal(await page.locator("#resources-empty").isVisible(), true);
  await page.getByRole("button", { name: "Mon espace", exact: true }).click();
  assert.equal(
    await page
      .getByText("Les inscriptions ne sont pas encore ouvertes.")
      .isVisible(),
    true,
  );
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("#account").isVisible(), false);
  await page.goto(base + "/#/progress");
  await page.locator("[data-action=export]").waitFor();
  const downloadPromise = page.waitForEvent("download");
  await page.locator("[data-action=export]").click();
  const download = await downloadPromise;
  assert.equal(download.suggestedFilename(), "lumina-academy-progression.json");
  const file = await download.path();
  const exported = JSON.parse(fs.readFileSync(file, "utf8"));
  assert.equal(exported.profile.name, "Joseph");
  page.on("dialog", (d) => d.accept());
  await page.locator("#import-file").setInputFiles({
    name: "bad.json",
    mimeType: "application/json",
    buffer: Buffer.from("{}"),
  });
  await page.waitForFunction(() =>
    document.querySelector("#toast").textContent.includes("Import refusé"),
  );
  assert.match(await page.locator("#toast").textContent(), /Import refusé/);
  await page.locator("#import-file").setInputFiles(file);
  await page.waitForFunction(() =>
    document.querySelector("#toast").textContent.includes("importée"),
  );
  assert.match(await page.locator("#toast").textContent(), /importée/);
  await page.goto(base + "/roadmap.html#enterprise");
  await page.locator(".skill-node").first().waitFor();
  assert.match(page.url(), /#\/map\/enterprise/);
  assert.equal(await page.locator(".skill-node").count(), 9);
  const mobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  mobile.on("pageerror", (e) => errors.push(e.message));
  for (const route of [
    "catalog",
    "path",
    "map",
    "module/foundations-01",
    "tracks",
    "projects",
    "chains",
    "resources",
    "progress",
  ]) {
    await mobile.goto(base + "/#/" + route);
    await mobile.locator("h1").waitFor();
    const overflow = await mobile.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
    assert.equal(overflow, false, "mobile overflow " + route);
    if (route === "path" || route === "map")
      await mobile.screenshot({
        path: ".test-output/mobile-" + route + ".png",
        fullPage: true,
      });
  }
  await mobile.getByRole("button", { name: "Ouvrir le menu" }).click();
  assert.equal(
    await mobile
      .getByRole("button", { name: "Ouvrir le menu" })
      .getAttribute("aria-expanded"),
    "true",
  );
  await mobile
    .getByRole("link", { name: "Carte des compétences", exact: true })
    .click();
  await mobile
    .getByRole("heading", { name: "Cybersecurity Mastery Graph" })
    .waitFor();
  assert.equal(
    await mobile
      .locator("body")
      .evaluate((el) => el.classList.contains("menu-open")),
    false,
  );
  await mobile.goto(base + "/#/invalid-route");
  await mobile.locator("h1").waitFor();
  assert.match(await mobile.locator("h1").textContent(), /n’existe pas/);
  const blocked = await browser.newPage();
  await blocked.addInitScript(() =>
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("storage disabled");
      },
    }),
  );
  await blocked.goto(base);
  await blocked.locator("h1").waitFor();
  assert.match(await blocked.title(), /Lumina/);
  assert.deepEqual(errors, []);
  console.log(
    "PASS: onboarding, progression, prerequisites, notes, search, filters, export/import, legacy routes, 9 mobile views, navigation and disabled storage. No JS errors.",
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
