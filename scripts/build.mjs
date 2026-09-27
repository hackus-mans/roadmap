import { build } from "esbuild";
import { mkdir, copyFile, rm } from "node:fs/promises";
await rm("dist", { recursive: true, force: true });
await mkdir("dist/assets", { recursive: true });
await build({
  entryPoints: ["src/app.js"],
  bundle: true,
  format: "esm",
  minify: true,
  outfile: "dist/assets/app.js",
  target: ["es2022"],
});
for (const f of [
  "index.html",
  "roadmap.html",
  "tracks.html",
  "resources.html",
  "styles.css",
  "roadmap-data.js",
  "config.js",
  ".nojekyll",
])
  await copyFile(f, `dist/${f}`);
console.log("Static site built in dist/");
