import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";

const root = path.resolve(fileURLToPath(import.meta.url), "..");

function generateTailwindTheme(): void {
  const css = fs.readFileSync(
    path.resolve(root, "design-tokens-build/nrk.css"),
    "utf-8",
  );

  const extract = (pattern: RegExp) =>
    (css.match(pattern)?.[1] ?? "")
      .split("\n")
      .filter((line) => line.trim().startsWith("--"))
      .map((line) => `  ${line.trim()}`)
      .join("\n")
      .replace(/--ds-color-/g, "--color-")
      .replace(/--ds-link-color-visited/g, "--color-link-visited");

  const lightVars = extract(
    /@layer ds\.theme\.color-scheme\.light \{[\s\S]*?:root[^{]*\{([\s\S]*?)\n\}/,
  );

  const darkVars = extract(
    /@layer ds\.theme\.color-scheme\.dark \{[\s\S]*?\[data-color-scheme="dark"\][^{]*\{([\s\S]*?)\n\}/,
  );

  // Generate theme-name-less aliases for the primary (default) color theme.
  // e.g. --color-background-default: var(--color-primary-background-default)
  const primaryAliases = lightVars
    .split("\n")
    .filter((line) => line.includes("--color-primary-"))
    .map((line) => {
      const match = line.match(/--color-primary-([a-z-]+):/);
      if (!match) return "";
      const suffix = match[1];
      return `  --color-${suffix}: var(--color-primary-${suffix});`;
    })
    .filter(Boolean)
    .join("\n");

  const output = `\
/**
 * NRK Design System — Tailwind v4 Theme
 * AUTO-GENERATED — do not edit. Run: npm run build:tokens
 *
 * Import in your CSS before tailwindcss:
 *   @import "yr-designsystemet/tailwind-theme.css";
 *   @import "tailwindcss";
 */

@theme {
  /* Disable default Tailwind theme */

${lightVars}

  /* Default aliases (no theme name) — resolve to the primary color theme */
${primaryAliases}
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
${darkVars}
  }
}
`;

  fs.writeFileSync(path.resolve(root, "src/tailwind-theme.css"), output);
}

export const generateTailwindThemePlugin = (): Plugin => ({
  name: "Generate Tailwind theme from Yr design tokens",
  buildStart: () => {
    generateTailwindTheme();
  },
});
