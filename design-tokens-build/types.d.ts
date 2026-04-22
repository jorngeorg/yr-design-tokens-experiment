/* build: v1.13.2 */
import type {} from '@digdir/designsystemet-types';

// Augment types based on theme
declare module '@digdir/designsystemet-types' {
  export interface ColorDefinitions {
    primary: never;
    'cool-mint': never;
    'warm-mint': never;
    'cool-green': never;
    'warm-green': never;
    yellow: never;
    'cool-orange': never;
    'warm-orange': never;
    red: never;
    'warm-pink': never;
    'cool-pink': never;
    purple: never;
    neutral: never;
  }
  export interface SeverityColorDefinitions {
    info: never;
    success: never;
    warning: never;
    danger: never;
  }
}
