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
    "background-default":     { light: WHITE,   dark: v(palette, "950") },
    "background-tinted":      { light: v(palette, "50"),  dark: v(palette, "800") },
    "surface-default":        { light: WHITE,  dark: v(palette, "950") },
    "surface-tinted":         { light: v(palette, "100"),  dark: v(palette, "700") },
    "surface-hover":          { light: v(palette, "200"), dark: v(palette, "600") },
    "surface-active":         { light: v(palette, "300"), dark: v(palette, "500") },
    "border-subtle":          { light: v(palette, "200"), dark: v(palette, "600") },
    "border-default":         { light: v(palette, "400"), dark: v(palette, "500") },
    "border-strong":          { light: v(palette, "500"), dark: v(palette, "400") },
    "text-subtle":            { light: v(palette, "700"), dark: v(palette, "200") },
    "text-default":           { light: v(palette, "950"), dark: v(palette, "50") },
    "base-default":           { light: v(palette, "700"), dark: v(palette, "300") },
    "base-hover":             { light: v(palette, "800"), dark: v(palette, "200") },
    "base-active":            { light: v(palette, "900"), dark: v(palette, "100") },
    "base-contrast-subtle":   { light: v(palette, "200"),  dark: v(palette, "800") },
    "base-contrast-default":  { light: WHITE,  dark: v(palette, "950") },
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
        },
        neutral: v("Gray", "500"),
        support: {
          "alt-blue": v("Alt Blue", "500"),
          "cool-mint": v("Cool Mint", "500"), 
          "warm-mint": v("Warm Mint", "500"), 
          "cool-green": v("Cool Green", "500"), 
          "warm-green": v("Warm Green", "500"), 
          "yellow": v("Yellow", "500"), 
          "cool-orange": v("Cool Orange", "500"), 
          "warm-orange": v("Warm Orange", "500"), 
          "red": v("Red", "500"), 
          "warm-pink": v("Warm Pink", "500"), 
          "cool-pink": v("Cool Pink", "500"), 
          "purple": v("Purple", "500"), 
          "gray": v("Gray", "500"), 
        },
      },
			typography: {
				fontFamily: "NRK Sans Variable"
			},      
      borderRadius: 4,
      overrides: {
        colors: {
          "alt-blue": colorOverride("Alt Blue"),
          "cool-mint": colorOverride("Cool Mint"), 
          "warm-mint": colorOverride("Warm Mint"), 
          "cool-green": colorOverride("Cool Green"), 
          "warm-green": colorOverride("Warm Green"), 
          "yellow": colorOverride("Yellow"), 
          "cool-orange": colorOverride("Cool Orange"), 
          "warm-orange": colorOverride("Warm Orange"), 
          "red": colorOverride("Red"), 
          "warm-pink": colorOverride("Warm Pink"), 
          "cool-pink": colorOverride("Cool Pink"), 
          "purple": colorOverride("Purple"), 
          "gray": colorOverride("Gray"), 
          primary: colorOverride("Core Blue"),       
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
