/**
 * Generates designsystemet.config.json and src/nrk-colors.css
 * from @nrk/core-design-tokens.
 *
 * Run: node scripts/generate-config.js
 *
 * This ensures our designsystemet theme and CSS primitives use the canonical
 * NRK color values from @nrk/core-design-tokens rather than hand-copied hex strings.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const tokens = JSON.parse(
  readFileSync(require.resolve("@nrk/core-design-tokens/nrk.tokens.json"), "utf8")
);

/** Extract hex value from a token object like { "$value": "#eef5ff" } */
const v = (colorGroup, shade, opacity) => (tokens.color[colorGroup][shade].$value + (opacity || '')).toLowerCase();

const WHITE = "#ffffff";
const BLACK = "#000000";

/**
 * Build a full 16-token color override from a palette.
 * Light mode goes light→dark (50→950), dark mode inverts.
 */
function colorOverride(palette, options = {}) {
  const { contrastOnBase = WHITE, darkContrastOnBase = BLACK } = options;
  return {
    "background-default":     { light: v("Gray", "50"),   dark: v("Gray", "950") },
    "background-tinted":      { light: v(palette, "50"),  dark: v(palette, "950") },
    "surface-default":        { light: WHITE,  dark: v(palette, "950") },
    "surface-tinted":         { light: v(palette, "50"),  dark: v(palette, "900") },
    "surface-hover":          { light: v(palette, "100"), dark: v(palette, "800") },
    "surface-active":         { light: v(palette, "200"), dark: v(palette, "700") },
    "border-subtle":          { light: v(palette, "200"), dark: v(palette, "700") },
    "border-default":         { light: v(palette, "500"), dark: v(palette, "400") },
    "border-strong":          { light: v(palette, "600"), dark: v(palette, "300") },
    "text-subtle":            { light: v(palette, "600"), dark: v(palette, "300") },
    "text-default":           { light: v(palette, "900"), dark: v(palette, "50") },
    "base-default":           { light: v(palette, "700"), dark: v(palette, "500") },
    "base-hover":             { light: v(palette, "800"), dark: v(palette, "400") },
    "base-active":            { light: v(palette, "900"), dark: v(palette, "300") },
    "base-contrast-subtle":   { light: v(palette, "200"),  dark: v(palette, "800") },
    "base-contrast-default":  { light: contrastOnBase,  dark: darkContrastOnBase },
  };
}

const config = {
  $schema: "https://designsystemet.no/schemas/cli/1.11.0.json",
  outDir: "./design-tokens",
  clean: true,
  themes: {
    nrk: {
      colors: {
        main: {
          primary: v("Core Blue", "700"),
          accent: v("Core Blue", "700"),
        },
        neutral: v("Gray", "500"),
        support: {
          extra1: v("Warm Pink", "500"),
          extra2: v("Yellow", "500"),
        },
      },
			typography: {
				fontFamily: "NRK Sans Variable"
			},      
      borderRadius: 4,
      overrides: {
        colors: {
          main: {
						"background-default": { 
              light: WHITE, 
              dark: v("Core Blue", 950)
            },
						"background-tinted": { 
              light: v("Core Blue", 500), 
              dark: v("Core Blue", 950)
            },
						"surface-default": { 
              light: WHITE, 
              dark: BLACK 
            },
						"surface-tinted": { 
              light: v("Core Blue", 50),
              dark: v("Core Blue", 900)
            },
						"surface-hover": { 
              light: v("Core Blue", 200),
              dark: v("Core Blue", 800)
            },
						"surface-active": { 
              light: v("Core Blue", 300),
              dark: v("Core Blue", 600)
            },
						"border-subtle": { 
              light: v("Core Blue", 200),
              dark: v("Core Blue", 700)
            },
						"border-default": { 
              light: v("Core Blue", 800),
              dark: v("Core Blue", 200)
            },
						"border-strong": { 
              light: v("Core Blue", 700),
              dark: v("Core Blue", 300)
            },
						"text-subtle": { 
              light: v("Core Blue", 700),
              dark: v("Core Blue", 200)
            },
						"text-default": { 
              light: v("Core Blue", 900),
              dark: v("Core Blue", 50)
            },
						"base-default": { 
              light: v("Core Blue", 700),
              dark: v("Core Blue", 300)
            },
						"base-hover": { 
              light: v("Core Blue", 800),
              dark: v("Core Blue", 200)
            },
						"base-active": { 
              light: v("Core Blue", 900),
              dark: v("Core Blue", 100)
            },
						"base-contrast-subtle": { 
              light: v("Core Blue", 200),
              dark: v("Core Blue", 800)
            },
						"base-contrast-default": { 
              light: WHITE,
              dark: BLACK
            },         
          },
          support: colorOverride("Warm Orange"),
          neutral: colorOverride("Gray"),
          info: colorOverride("Alt Blue"),
          success: colorOverride("Cool Green"),
          warning: {
						"background-default": { 
              light: WHITE, 
              dark: v("Cool Orange", 950)
            },
						"background-tinted": { 
              light: v("Cool Orange", 50, 'ff'), 
              dark: v("Cool Orange", 950, '0a')
            },
						"surface-default": { 
              light: WHITE, 
              dark: BLACK 
            },
						"surface-tinted": { 
              light: v("Cool Orange", 50),
              dark: v("Cool Orange", 900)
            },
						"surface-hover": { 
              light: v("Cool Orange", 200),
              dark: v("Cool Orange", 800)
            },
						"surface-active": { 
              light: v("Cool Orange", 300),
              dark: v("Cool Orange", 600)
            },
						"border-subtle": { 
              light: v("Cool Orange", 300),
              dark: v("Cool Orange", 700)
            },
						"border-default": { 
              light: v("Cool Orange", 800),
              dark: v("Cool Orange", 200)
            },
						"border-strong": { 
              light: v("Cool Orange", 700),
              dark: v("Cool Orange", 300)
            },
						"text-subtle": { 
              light: v("Cool Orange", 700),
              dark: v("Cool Orange", 200)
            },
						"text-default": { 
              light: v("Cool Orange", 900),
              dark: v("Cool Orange", 50)
            },
						"base-default": { 
              light: v("Cool Orange", 700),
              dark: v("Cool Orange", 300)
            },
						"base-hover": { 
              light: v("Cool Orange", 800),
              dark: v("Cool Orange", 200)
            },
						"base-active": { 
              light: v("Cool Orange", 900),
              dark: v("Cool Orange", 100)
            },
						"base-contrast-subtle": { 
              light: v("Cool Orange", 200),
              dark: v("Cool Orange", 800)
            },
						"base-contrast-default": { 
              light: WHITE,
              dark: BLACK
            },         
          },
          danger: {
						"background-default": { 
              light: WHITE, 
              dark: v("Red", 950)
            },
						"background-tinted": { 
              light: v("Red", 50), 
              dark: v("Red", 950, '0a')
            },
						"surface-default": { 
              light: WHITE, 
              dark: BLACK 
            },
						"surface-tinted": { 
              light: v("Red", 50),
              dark: v("Red", 900)
            },
						"surface-hover": { 
              light: v("Red", 200),
              dark: v("Red", 800)
            },
						"surface-active": { 
              light: v("Red", 300),
              dark: v("Red", 600)
            },
						"border-subtle": { 
              light: v("Red", 300),
              dark: v("Red", 700)
            },
						"border-default": { 
              light: v("Red", 800),
              dark: v("Red", 200)
            },
						"border-strong": { 
              light: v("Red", 700),
              dark: v("Red", 300)
            },
						"text-subtle": { 
              light: v("Red", 700),
              dark: v("Red", 200)
            },
						"text-default": { 
              light: v("Red", 900),
              dark: v("Red", 50)
            },
						"base-default": { 
              light: v("Red", 700),
              dark: v("Red", 300)
            },
						"base-hover": { 
              light: v("Red", 800),
              dark: v("Red", 200)
            },
						"base-active": { 
              light: v("Red", 900),
              dark: v("Red", 100)
            },
						"base-contrast-subtle": { 
              light: v("Red", 200),
              dark: v("Red", 800)
            },
						"base-contrast-default": { 
              light: WHITE,
              dark: BLACK
            },         
          },
        },
      },
    },
  },
};

const configPath = new URL("../designsystemet.config.json", import.meta.url).pathname;
writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n");
console.log("✅ Generated designsystemet.config.json");

// --- Generate src/nrk-colors.css ---

/** Convert "Core Blue" → "core-blue" */
function toKebab(name) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

const colorGroups = Object.entries(tokens.color).filter(
  ([, val]) => typeof val === "object" && !val.$value
);

let css = `/**
 * NRK Color Primitives — GENERATED from @nrk/core-design-tokens
 *
 * Do not edit manually. Run: npm run generate-config
 *
 * All NRK color palettes exposed as CSS custom properties.
 * These can be used directly in components when you need access
 * to the raw color values outside of designsystemet's semantic system.
 *
 * Usage: var(--nrk-core-blue-500)
 */

:root {
  /* Base colors */
  --nrk-base-white: #ffffff;
  --nrk-base-black: #000000;
  --nrk-base-yr-blue: #00b8f1;

`;

for (const [name, shades] of colorGroups) {
  const prefix = `--nrk-${toKebab(name)}`;
  css += `  /* ${name} */\n`;
  for (const [shade, token] of Object.entries(shades)) {
    if (shade.startsWith("$")) continue;
    css += `  ${prefix}-${shade}: ${token.$value.toLowerCase()};\n`;
  }
  css += "\n";
}

css = css.trimEnd() + "\n}\n";

const cssPath = new URL("../src/nrk-colors.css", import.meta.url).pathname;
writeFileSync(cssPath, css);
console.log("✅ Generated src/nrk-colors.css");
