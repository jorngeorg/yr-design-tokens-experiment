/**
 * Generates Tailwind v4 theme CSS and a TypeScript preset
 * from designsystemet.config.json, src/nrk-colors.css, and design-tokens.
 *
 * Run: node scripts/generate-tailwind-preset.js [sm|md|lg]
 *
 * Outputs:
 *   src/tailwind-theme.css  — @theme block for Tailwind v4 consumers
 *   src/tailwind-preset.ts  — JS/TS exports for programmatic access
 */

import { readFileSync, writeFileSync } from "node:fs";

const sizeMode = process.argv[2] || "md";
if (!["sm", "md", "lg"].includes(sizeMode)) {
  console.error(`Invalid size mode "${sizeMode}". Use sm, md, or lg.`);
  process.exit(1);
}

const sizeModeName = { sm: "small", md: "medium", lg: "large" }[sizeMode];

// --- 1. Parse NRK primitive colors from nrk-colors.css ---

const nrkCss = readFileSync(
  new URL("../src/nrk-colors.css", import.meta.url),
  "utf-8",
);
const nrkColors = {};
/** Reverse lookup: lowercase hex → var(--nrk-...) */
const hexToNrkVar = {};
for (const match of nrkCss.matchAll(/--nrk-([\w-]+):\s*(#[\da-fA-F]+)/g)) {
  nrkColors[match[1]] = match[2];
  hexToNrkVar[match[2].toLowerCase()] = `var(--color-nrk-${match[1]})`;
}

/**
 * Convert a hex color to its var(--nrk-*) reference.
 * Returns the original value if no match is found (e.g. hex with alpha suffix).
 */
function hexToVar(hex) {
  return hexToNrkVar[hex.toLowerCase()] || hex;
}

// --- 2. Parse semantic colors from designsystemet.config.json ---

const config = JSON.parse(
  readFileSync(
    new URL("../designsystemet.config.json", import.meta.url),
    "utf-8",
  ),
);
const themeName = Object.keys(config.themes)[0];
const overrides = config.themes[themeName].overrides.colors;

const semanticColors = {};
for (const [category, tokens] of Object.entries(overrides)) {
  semanticColors[category] = {};
  for (const [token, values] of Object.entries(tokens)) {
    semanticColors[category][token] = {
      light: values.light,
      dark: values.dark,
    };
  }
}

// --- 3. Parse size tokens ---

const sizeConfig = JSON.parse(
  readFileSync(
    new URL(`../design-tokens/primitives/modes/size/${sizeModeName}.json`, import.meta.url),
    "utf-8",
  ),
);
const sizeGlobal = JSON.parse(
  readFileSync(
    new URL("../design-tokens/primitives/modes/size/global.json", import.meta.url),
    "utf-8",
  ),
);

const modeFontSize = parseFloat(sizeConfig.size["_mode-font-size"].$value);
const base = parseFloat(sizeConfig.size["_base"].$value);
const step = parseFloat(sizeConfig.size["_step"].$value);
const unit = step / base * modeFontSize;

// Extract the size multipliers from global.json
const sizeSteps = Object.keys(sizeGlobal._size)
  .filter((k) => !k.startsWith("$") && /^\d+$/.test(k))
  .map(Number)
  .sort((a, b) => a - b);

const spacing = {};
for (const n of sizeSteps) {
  spacing[n] = Math.floor(unit * n);
}

// --- 4. Parse typography tokens for the selected size mode ---

const typography = JSON.parse(
  readFileSync(
    new URL(`../design-tokens/primitives/modes/typography/size/${sizeModeName}.json`, import.meta.url),
    "utf-8",
  ),
);

const fontSizes = {};
for (const [scale, token] of Object.entries(typography["font-size"])) {
  fontSizes[scale] = parseFloat(token.$value);
}

const lineHeights = {};
for (const [name, token] of Object.entries(typography["line-height"])) {
  lineHeights[name] = token.$value; // e.g. "130%"
}

const letterSpacings = {};
for (const [scale, token] of Object.entries(typography["letter-spacing"])) {
  letterSpacings[scale] = token.$value; // e.g. "-0.5%"
}

const borderRadius = config.themes[themeName].borderRadius;

// --- 5. Generate src/tailwind-theme.css ---

let css = `/**
 * Yr Design System — Tailwind v4 Theme (size mode: ${sizeMode})
 * AUTO-GENERATED — do not edit. Run: npm run generate-tailwind-preset
 *
 * Import in your CSS before tailwindcss:
 *   @import "yr-designsystemet/tailwind-theme.css";
 *   @import "tailwindcss";
 */

`;

// --- :root — NRK primitive colors ---
css += "/* NRK Primitive Colors */\n";
css += ":root {\n";
for (const [key, value] of Object.entries(nrkColors)) {
  css += `  --color-nrk-${key}: ${value};\n`;
}
css += "}\n\n";

// --- @theme — light mode semantic colors + global theme variables ---
css += `@theme {\n`;
css += "  /* Disable default Tailwind theme */\n";
css += "  --*: initial;\n\n";

// Light mode semantic colors
css += "  /* Semantic Colors (light mode) */\n";
for (const [category, tokens] of Object.entries(semanticColors)) {
  for (const [token, values] of Object.entries(tokens)) {
    css += `  --color-${category}-${token}: ${hexToVar(values.light)};\n`;
  }
}
css += "\n";

// Focus & link colors (light)
css += "  --color-focus-inner: #ffffff;\n";
css += "  --color-focus-outer: #2c2b2c;\n";
css += "  --color-link-visited: #663299;\n";
css += "\n";

// Spacing
css += `  /* Spacing (size mode: ${sizeMode}, unit: ${unit.toFixed(4)}px) */\n`;
for (const [n, px] of Object.entries(spacing)) {
  css += `  --spacing-${n}: ${px}px;\n`;
}
css += "\n";

// Font sizes
css += `  /* Font Sizes (size mode: ${sizeMode}) */\n`;
for (const [scale, px] of Object.entries(fontSizes)) {
  css += `  --font-size-${scale}: ${px}px;\n`;
}
css += "\n";

// Line heights
css += "  /* Line Heights */\n";
for (const [name, value] of Object.entries(lineHeights)) {
  const decimal = parseFloat(value) / 100;
  css += `  --leading-${name}: ${decimal};\n`;
}
css += "\n";

// Letter spacing
css += "  /* Letter Spacing */\n";
for (const [scale, value] of Object.entries(letterSpacings)) {
  const em = parseFloat(value) / 100;
  css += `  --tracking-${scale}: ${em}em;\n`;
}
css += "\n";

// Border radius
css += "  /* Border Radius */\n";
css += `  --radius-default: ${borderRadius}px;\n`;

css += "}\n\n";

// --- @media (prefers-color-scheme: dark) — dark mode semantic colors ---
css += "/* Semantic Colors (dark mode) */\n";
css += "@media (prefers-color-scheme: dark) {\n";
css += "  :root {\n";
for (const [category, tokens] of Object.entries(semanticColors)) {
  for (const [token, values] of Object.entries(tokens)) {
    css += `    --color-${category}-${token}: ${hexToVar(values.dark)};\n`;
  }
}
css += "\n";
css += "    --color-focus-inner: #181818;\n";
css += "    --color-focus-outer: #ececec;\n";
css += "    --color-link-visited: #b49acd;\n";
css += "  }\n";
css += "}\n";

const cssPath = new URL("../src/tailwind-theme.css", import.meta.url).pathname;
writeFileSync(cssPath, css);
console.log(`✅ Generated src/tailwind-theme.css (size mode: ${sizeMode})`);

// --- 6. Generate src/tailwind-preset.ts ---

/** Serialize an object using numeric keys where possible (e.g. { 1: 12 } instead of { "1": 12 }) */
function toTs(obj, indent = 2) {
  const pad = " ".repeat(indent);
  const entries = Object.entries(obj).map(([k, v]) => {
    const key = /^\d+$/.test(k) ? k : JSON.stringify(k);
    const val =
      v !== null && typeof v === "object" ? toTs(v, indent + 2) : JSON.stringify(v);
    return `${pad}${key}: ${val}`;
  });
  return `{\n${entries.join(",\n")}\n${" ".repeat(indent - 2)}}`;
}

const resolvedLineHeights = Object.fromEntries(
  Object.entries(lineHeights).map(([k, v]) => [k, parseFloat(v) / 100]),
);
const resolvedLetterSpacings = Object.fromEntries(
  Object.entries(letterSpacings).map(([k, v]) => [k, parseFloat(v) / 100]),
);

const ts = `// AUTO-GENERATED — do not edit. Run: npm run generate-tailwind-preset
// Size mode: ${sizeMode}

export const sizeMode = "${sizeMode}" as const;

export const nrkColors = ${toTs(nrkColors)} as const;

export const semanticColors = ${toTs(semanticColors)} as const;

export const spacing = ${toTs(spacing)} as const;

export const fontSizes = ${toTs(fontSizes)} as const;

export const lineHeights = ${toTs(resolvedLineHeights)} as const;

export const letterSpacings = ${toTs(resolvedLetterSpacings)} as const;

export const borderRadius = ${borderRadius} as const;
`;

// --- 7. Generate src/tailwind-theme.ts (themes grouped by light/dark) ---

/** Reverse lookup: lowercase hex → NRK color name (e.g. "core-blue-700") */
const hexToNrkName = {};
for (const [name, hex] of Object.entries(nrkColors)) {
  hexToNrkName[hex.toLowerCase()] = name;
}

let themeTs = `// AUTO-GENERATED — do not edit. Run: npm run generate-tailwind-preset
// Size mode: ${sizeMode}

export const themes = {\n`;

for (const [category, tokens] of Object.entries(semanticColors)) {
  themeTs += `  ${JSON.stringify(category)}: {\n`;
  for (const mode of ["light", "dark"]) {
    themeTs += `    ${JSON.stringify(mode)}: {\n`;
    const tokenEntries = Object.entries(tokens);
    tokenEntries.forEach(([token, values], i) => {
      const hex = values[mode];
      const nrkName = hexToNrkName[hex.toLowerCase()];
      const comment = nrkName ? ` // ${nrkName}` : "";
      const comma = i < tokenEntries.length - 1 ? "," : "";
      themeTs += `      "--color-${token}": ${JSON.stringify(hex)}${comma}${comment}\n`;
    });
    themeTs += `    },\n`;
  }
  themeTs += `  },\n`;
}

themeTs += `} as const;\n`;

const themeJsPath = new URL("../src/tailwind-theme.ts", import.meta.url).pathname;
writeFileSync(themeJsPath, themeTs);
console.log(`✅ Generated src/tailwind-theme.ts (size mode: ${sizeMode})`);

const tsPath = new URL("../src/tailwind-preset.ts", import.meta.url).pathname;
writeFileSync(tsPath, ts);
console.log(`✅ Generated src/tailwind-preset.ts (size mode: ${sizeMode})`);
