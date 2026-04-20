// Yr Designsystemet - based on designsystemet.no

// Import designsystemet base styles
import "@digdir/designsystemet-css";

// Import our custom built theme (replaces @digdir/designsystemet-css/theme)
import "../design-tokens-build/theme.css";

// Import Yr styles (layer order, NRK primitives, font)
import "./styles.css";

// Export Yr components
export * from "./components";

// Export design tokens for Tailwind/NativeWind consumers
export { sizeMode, nrkColors, semanticColors, spacing, fontSizes, lineHeights, letterSpacings, borderRadius } from "./tailwind-preset";
