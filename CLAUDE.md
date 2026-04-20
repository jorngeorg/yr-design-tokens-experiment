# Yr Designsystemet

A React design system for Yr, built on top of [designsystemet.no](https://designsystemet.no).

## Commands

- `npm run typecheck` - Type check the project
- `npm run storybook` - Start Storybook dev server on port 6006
- `npm run build` - Build the library to dist/
- `npm run build-storybook` - Build static Storybook
- `npm run generate-config` - Regenerate `designsystemet.config.json` and `src/nrk-colors.css` from `@nrk/core-design-tokens`
- `npm run build:tokens` - Full token pipeline: generate config → create tokens → build CSS

After making changes, always run `npm run typecheck` and verify visually in Storybook.

## Project Structure

```
src/
├── components/    # React components (Yr wrappers around designsystemet)
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── index.ts       # Main entry point - exports all public APIs
├── styles.css     # Layer order declaration, NRK font + primitives import
└── nrk-colors.css # GENERATED — NRK color palette as CSS custom properties
scripts/
└── generate-config.js  # Generates config + nrk-colors.css from @nrk/core-design-tokens
designsystemet.config.json  # GENERATED — theme config with NRK color overrides
```

Each component should have:
- `ComponentName.tsx` - The component implementation
- `ComponentName.stories.tsx` - Storybook stories
- `ComponentName.css` - Component styles (wrapped in `@layer yr.components`)

## CSS Layer Architecture

All CSS is organized into layers for predictable specificity:

```
@layer ds.theme, ds.base, ds.components, yr.primitives, yr.components;
```

| Layer | Priority | Source | Contents |
|-------|----------|--------|----------|
| `ds.theme` | 1 (lowest) | `design-tokens-build/theme.css` | Generated color/spacing/typography tokens |
| `ds.base` | 2 | `@digdir/designsystemet-css` | Reset, focus styles, utilities |
| `ds.components` | 3 | `@digdir/designsystemet-css` | Default component styles |
| `yr.primitives` | 4 | `src/nrk-colors.css`, `src/styles.css` | NRK color vars (`--nrk-*`), font setup |
| `yr.components` | 5 (highest) | `src/components/**/*.css` | Yr component overrides |

### Adding component styles

Always wrap Yr component CSS in `@layer yr.components`:

```css
@layer yr.components {
  .yr-my-component {
    color: var(--ds-color-text-default);
    background: var(--nrk-core-blue-50);
  }
}
```

This guarantees Yr styles win over designsystemet defaults without `!important` or specificity hacks.

### Import order

Both `src/index.ts` and `.storybook/preview.ts` follow the same order:

1. `@digdir/designsystemet-css` — base + component styles (layers `ds.base`, `ds.components`)
2. `design-tokens-build/theme.css` — generated theme tokens (layer `ds.theme`)
3. `src/styles.css` — layer order declaration + NRK font + primitives

Component CSS files are imported by their respective `.tsx` files.

## Token Pipeline

Color values come from `@nrk/core-design-tokens`. The flow:

```
@nrk/core-design-tokens/nrk.tokens.json
        ↓  (scripts/generate-config.js)
designsystemet.config.json  +  src/nrk-colors.css
        ↓  (tokens create + tokens build)
design-tokens-build/theme.css
```

To update colors after bumping `@nrk/core-design-tokens`:

```sh
npm run build:tokens
```

## Code Conventions

### TypeScript
- Use type inference where obvious, explicit types for public APIs
- Prefer `interface` for component props
- Export prop types for consumers

### Components
- All components should wrap designsystemet components with Yr-specific styling/behavior
- Use `forwardRef` for components that render DOM elements
- Re-export the wrapped component from `src/index.ts`

### Example Component Pattern

```tsx
import { forwardRef } from "react";
import { Button as DSButton } from "@digdir/designsystemet-react";

export interface ButtonProps {
  // Yr-specific props + extended from designsystemet
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <DSButton ref={ref} {...props} />;
  }
);

Button.displayName = "Button";
```

## Dependencies

- `@digdir/designsystemet-react` - Core React components
- `@digdir/designsystemet-css` - Styling and theming
- `@nrk/core-design-tokens` - Canonical NRK color palette
- `@nrk/nrk-sans` - NRK Sans font

## Resources

- [Designsystemet docs](https://designsystemet.no/en/components)
- [Designsystemet GitHub](https://github.com/digdir/designsystemet)
