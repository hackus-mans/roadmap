import { build } from "esbuild";
import { mkdir, copyFile, rm, cp } from "node:fs/promises";
await rm("dist", { recursive: true, force: true });
await mkdir("dist/assets", { recursive: true });
await cp("src", "dist/src", { recursive: true });
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
await mkdir("assets", { recursive: true });
await copyFile("dist/assets/app.js", "assets/app.js");
console.log(
  "Static site built in dist/ and root bundle refreshed for Pages branch compatibility.",
);
