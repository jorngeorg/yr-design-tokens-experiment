# Using Tailwind CSS with Yr Designsystemet

Yr Designsystemet ships a **Tailwind v4 theme** that maps all design tokens — colors, spacing, typography, and border radius — to Tailwind utility classes. This means you can use classes like `bg-primary-base-default`, `p-4`, or `text-3` and get pixel-perfect values from the design system.

## Quick start

### 1. Install Tailwind v4

```bash
npm install tailwindcss @tailwindcss/vite   # or @tailwindcss/postcss
```

### 2. Import the theme in your CSS

Create (or update) your main CSS file. The theme **must** be imported before `tailwindcss`:

```css
/* app.css */
@import "yr-designsystemet/tailwind-theme.css";
@import "tailwindcss";
```

That's it — all Yr tokens are now available as Tailwind utilities.

### 3. Configure your build tool

**Vite** (recommended):

```ts
// vite.config.ts
import tailwindcss from "@tailwindcss/vite";

export default {
  plugins: [tailwindcss()],
};
```

**PostCSS** (Next.js, Webpack, etc.):

```bash
npm install @tailwindcss/postcss
```

```js
// postcss.config.js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

---

## What's included

The theme file (`tailwind-theme.css`) registers tokens inside a `@theme` block, which tells Tailwind v4 to generate utility classes for them.

### Colors

Every color is available as `{property}-{name}`:

#### NRK primitive colors (`nrk-*`)

The full NRK palette with 50–950 shades:

```
nrk-core-blue-{50..950}    nrk-alt-blue-{50..950}
nrk-gray-{50..950}         nrk-red-{50..950}
nrk-purple-{50..950}       nrk-yellow-{50..950}
nrk-cool-green-{50..950}   nrk-warm-green-{50..950}
nrk-cool-mint-{50..950}    nrk-warm-mint-{50..950}
nrk-cool-orange-{50..950}  nrk-warm-orange-{50..950}
nrk-cool-pink-{50..950}    nrk-warm-pink-{50..950}
nrk-base-white             nrk-base-black
nrk-base-yr-blue
```

**Examples:**

```html
<div class="bg-nrk-core-blue-700 text-nrk-base-white">NRK Blue</div>
<span class="text-nrk-red-600">Error text</span>
```

#### Semantic colors

These follow the designsystemet convention and adapt to dark mode:

| Category   | Use case                        |
|------------|---------------------------------|
| `primary`  | Primary brand actions & surfaces |
| `accent`   | Secondary emphasis               |
| `neutral`  | Default text, borders, surfaces  |
| `extra1`   | Pink/magenta highlight           |
| `extra2`   | Yellow highlight                 |
| `info`     | Informational states             |
| `success`  | Positive states                  |
| `warning`  | Cautionary states                |
| `danger`   | Error / destructive states       |

Each category has these variants:

```
background-default    background-tinted
surface-default       surface-tinted      surface-hover    surface-active
border-subtle         border-default      border-strong
text-subtle           text-default
base-default          base-hover          base-active
base-contrast-subtle  base-contrast-default
```

**Examples:**

```html
<button class="bg-primary-base-default text-primary-base-contrast-default hover:bg-primary-base-hover">
  Primary button
</button>

<div class="bg-danger-surface-tinted border border-danger-border-default text-danger-text-default p-4 rounded-default">
  Something went wrong.
</div>

<p class="text-neutral-text-subtle">Secondary information</p>
```

### Spacing

The spacing scale is based on a 4px unit (in `md` size mode):

| Class | Value | Class  | Value |
|-------|-------|--------|-------|
| `p-0` | 0px   | `p-8`  | 32px  |
| `p-1` | 4px   | `p-9`  | 36px  |
| `p-2` | 8px   | `p-10` | 40px  |
| `p-3` | 12px  | `p-11` | 44px  |
| `p-4` | 16px  | `p-12` | 48px  |
| `p-5` | 20px  | `p-14` | 56px  |
| `p-6` | 24px  | `p-18` | 72px  |
| `p-7` | 28px  | `p-30` | 120px |

Works with all spacing utilities: `p-*`, `m-*`, `gap-*`, `space-x-*`, `inset-*`, etc.

```html
<div class="flex gap-4 p-6">
  <div class="m-2">Spaced content</div>
</div>
```

### Font sizes

Numeric font-size scale (matching designsystemet's `--ds-font-size-*`):

| Class    | Size |
|----------|------|
| `text-1` | 12px |
| `text-2` | 14px |
| `text-3` | 16px |
| `text-4` | 18px |
| `text-5` | 21px |
| `text-6` | 24px |
| `text-7` | 30px |
| `text-8` | 36px |
| `text-9` | 48px |
| `text-10`| 60px |

```html
<h1 class="text-8 leading-sm tracking-1">Page title</h1>
<p class="text-3 leading-md">Body text at 16px</p>
```

### Line height

| Class        | Value |
|--------------|-------|
| `leading-sm` | 1.3   |
| `leading-md` | 1.5   |
| `leading-lg` | 1.7   |

### Letter spacing

| Class        | Value     |
|--------------|-----------|
| `tracking-1` | -0.01em   |
| `tracking-2` | -0.005em  |
| `tracking-3` | -0.0025em |
| `tracking-4` | -0.0015em |
| `tracking-5` | 0em       |
| `tracking-6` | 0.0015em  |
| `tracking-7` | 0.0025em  |
| `tracking-8` | 0.005em   |
| `tracking-9` | 0.015em   |

### Border radius

| Class             | Value |
|-------------------|-------|
| `rounded-default` | 4px   |

---

## Dark mode

The theme ships dark mode overrides scoped to the `.dark` class. To enable dark mode, add `class="dark"` to a parent element (typically `<html>`):

```html
<html class="dark">
  <!-- All semantic colors automatically switch to dark variants -->
</html>
```

```html
<!-- These adapt to light/dark automatically -->
<div class="bg-neutral-background-default text-neutral-text-default">
  <p class="text-primary-text-subtle">Adapts to the current color scheme</p>
</div>
```

> NRK primitive colors (`nrk-*`) are **static** and do not change with dark mode. Use semantic colors for theme-aware styling.

---

## Using alongside designsystemet components

The Tailwind theme is designed to complement `@digdir/designsystemet-react` components, not replace them. Use Tailwind for layout, spacing, and custom elements; use designsystemet components for interactive UI:

```tsx
import { Button, Card } from "yr-designsystemet";

function FeatureCard() {
  return (
    <Card className="p-6 flex flex-col gap-4">
      <h2 className="text-6 leading-sm tracking-2 text-neutral-text-default">
        Weather forecast
      </h2>
      <p className="text-3 text-neutral-text-subtle leading-md">
        Check today's weather conditions.
      </p>
      <Button className="mt-2">View forecast</Button>
    </Card>
  );
}
```

---

## TypeScript preset

For programmatic access to token values (e.g. in JS-based styling, charts, or canvas rendering), import the TypeScript preset:

```ts
import {
  nrkColors,
  semanticColors,
  spacing,
  fontSizes,
  lineHeights,
  letterSpacings,
  borderRadius,
  sizeMode,
} from "yr-designsystemet/tailwind-preset";

// Use in inline styles, charting libraries, etc.
const chartColor = nrkColors["core-blue-500"]; // "#3d81d8"
const padding = spacing[4];                    // 16
const headingSize = fontSizes[8];              // 36

// Semantic colors include light/dark variants
const bgLight = semanticColors.primary["background-default"].light; // "#ffffff"
const bgDark = semanticColors.primary["background-default"].dark;   // "#061629"
```

---

## Regenerating the theme

The theme files are auto-generated from the design tokens. If colors, spacing, or typography change upstream:

```bash
# Full pipeline: regenerates config, tokens, and Tailwind theme
npm run build:tokens

# Or regenerate just the Tailwind files
npm run generate-tailwind-preset
```

You can also generate for a different size mode:

```bash
node scripts/generate-tailwind-preset.js sm   # small
node scripts/generate-tailwind-preset.js md   # medium (default)
node scripts/generate-tailwind-preset.js lg   # large
```

---

## Tips

- **Prefer semantic colors** (`primary-*`, `neutral-*`, `danger-*`) for UI that should respond to dark mode. Use `nrk-*` primitives only for elements that should stay the same in both modes.
- **Don't fight the spacing scale.** The scale matches designsystemet's sizing system — `gap-4` gives you 16px, the same as `--ds-spacing-4`. This keeps your Tailwind layout consistent with designsystemet components.
- **Combine with CSS custom properties.** You can still reference `--ds-*` or `--nrk-*` custom properties directly when you need values Tailwind doesn't cover:
  ```html
  <div style="box-shadow: 0 2px 8px var(--color-neutral-border-subtle)">
    Custom shadow using a theme token
  </div>
  ```
- **Layer order matters.** If you're also importing `yr-designsystemet/styles.css` for the full designsystemet setup, Tailwind utilities (which are unlayered by default) will naturally win over layered component styles.
