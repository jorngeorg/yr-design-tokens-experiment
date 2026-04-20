import type { Preview } from '@storybook/react-vite'

// Import designsystemet base styles
import "@digdir/designsystemet-css";

// Import our custom built theme (replaces @digdir/designsystemet-css/theme)
import "../design-tokens-build/theme.css";

// Import NRK color tokens
import "../design-tokens-build/nrk.css";

// Import Yr styles (layer order, NRK primitives, font)
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;
