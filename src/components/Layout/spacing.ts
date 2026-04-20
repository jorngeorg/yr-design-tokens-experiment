import type { CSSProperties } from "react";

/**
 * Spacing scale tokens based on designsystemet --ds-size-* tokens
 * Maps to var(--ds-size-{n})
 */
export type SpacingToken =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15"
  | "18"
  | "22"
  | "26"
  | "30";

/**
 * Responsive breakpoints (mobile-first)
 * - Index 0: base (mobile)
 * - Index 1: sm (640px)
 * - Index 2: md (768px)
 * - Index 3: lg (1024px)
 * - Index 4: xl (1280px)
 */
export type ResponsiveValue<T> = T | [T] | [T, T] | [T, T, T] | [T, T, T, T] | [T, T, T, T, T];

export type SpacingValue = SpacingToken | ResponsiveValue<SpacingToken>;

const BREAKPOINTS = ["640px", "768px", "1024px", "1280px"];

/**
 * Converts a spacing token to its CSS variable value
 */
export function tokenToVar(token: SpacingToken): string {
  return `var(--ds-size-${token})`;
}

/**
 * Generates a unique CSS variable name for responsive properties
 */
let varCounter = 0;
export function generateVarName(prefix: string): string {
  return `--_yr-${prefix}-${++varCounter}`;
}

/**
 * Resolves a spacing value to a CSS value string
 * For non-responsive values, returns the CSS variable directly
 * For responsive values, returns the base value (responsive handled via CSS)
 */
export function resolveSpacing(value: SpacingValue | undefined): string | undefined {
  if (value === undefined) return undefined;

  if (typeof value === "string") {
    return tokenToVar(value);
  }

  // For arrays, return the first (base) value
  // Responsive styles are handled separately via generateResponsiveStyles
  return tokenToVar(value[0]);
}

/**
 * Interface for spacing props that can be applied to layout components
 */
export interface SpacingProps {
  /** Padding on all sides */
  padding?: SpacingValue;
  /** Padding on left and right */
  paddingX?: SpacingValue;
  /** Padding on top and bottom */
  paddingY?: SpacingValue;
  /** Padding on top */
  paddingTop?: SpacingValue;
  /** Padding on right */
  paddingRight?: SpacingValue;
  /** Padding on bottom */
  paddingBottom?: SpacingValue;
  /** Padding on left */
  paddingLeft?: SpacingValue;
  /** Margin on all sides */
  margin?: SpacingValue;
  /** Margin on left and right */
  marginX?: SpacingValue;
  /** Margin on top and bottom */
  marginY?: SpacingValue;
  /** Margin on top */
  marginTop?: SpacingValue;
  /** Margin on right */
  marginRight?: SpacingValue;
  /** Margin on bottom */
  marginBottom?: SpacingValue;
  /** Margin on left */
  marginLeft?: SpacingValue;
  /** Gap between items (for flex/grid) */
  gap?: SpacingValue;
  /** Row gap (for grid) */
  rowGap?: SpacingValue;
  /** Column gap (for grid) */
  columnGap?: SpacingValue;
}

type SpacingStyleKey =
  | "padding"
  | "paddingTop"
  | "paddingRight"
  | "paddingBottom"
  | "paddingLeft"
  | "margin"
  | "marginTop"
  | "marginRight"
  | "marginBottom"
  | "marginLeft"
  | "gap"
  | "rowGap"
  | "columnGap";

/**
 * Checks if a value is responsive (array)
 */
function isResponsive(value: SpacingValue | undefined): value is ResponsiveValue<SpacingToken> & SpacingToken[] {
  return Array.isArray(value);
}

/**
 * Generates inline styles and CSS for responsive spacing
 * Returns styles object and a style element to be rendered
 */
export function useSpacingStyles(
  props: SpacingProps,
  componentId: string
): { style: CSSProperties; cssVars: Record<string, string> } {
  const style: CSSProperties = {};
  const cssVars: Record<string, string> = {};

  const processSpacing = (
    value: SpacingValue | undefined,
    cssKey: SpacingStyleKey,
    varPrefix: string
  ) => {
    if (value === undefined) return;

    if (!isResponsive(value)) {
      // Simple non-responsive value
      (style as Record<string, string>)[cssKey] = tokenToVar(value);
    } else {
      // Responsive value - use CSS custom property with fallback
      const varName = `--_yr-${varPrefix}-${componentId}`;

      // Set base value
      cssVars[varName] = tokenToVar(value[0]);

      // Generate media query overrides
      for (let i = 1; i < value.length && i <= BREAKPOINTS.length; i++) {
        const breakpoint = BREAKPOINTS[i - 1];
        const breakpointVarName = `${varName}-${i}`;
        cssVars[`${breakpointVarName}`] = tokenToVar(value[i]);
        cssVars[`${varName}@${breakpoint}`] = `var(${breakpointVarName})`;
      }

      (style as Record<string, string>)[cssKey] = `var(${varName})`;
    }
  };

  // Process padding
  if (props.padding !== undefined) {
    processSpacing(props.padding, "padding", "p");
  } else {
    if (props.paddingX !== undefined) {
      processSpacing(props.paddingX, "paddingLeft", "pl");
      processSpacing(props.paddingX, "paddingRight", "pr");
    }
    if (props.paddingY !== undefined) {
      processSpacing(props.paddingY, "paddingTop", "pt");
      processSpacing(props.paddingY, "paddingBottom", "pb");
    }
  }

  // Individual padding overrides
  if (props.paddingTop !== undefined) processSpacing(props.paddingTop, "paddingTop", "pt");
  if (props.paddingRight !== undefined) processSpacing(props.paddingRight, "paddingRight", "pr");
  if (props.paddingBottom !== undefined) processSpacing(props.paddingBottom, "paddingBottom", "pb");
  if (props.paddingLeft !== undefined) processSpacing(props.paddingLeft, "paddingLeft", "pl");

  // Process margin
  if (props.margin !== undefined) {
    processSpacing(props.margin, "margin", "m");
  } else {
    if (props.marginX !== undefined) {
      processSpacing(props.marginX, "marginLeft", "ml");
      processSpacing(props.marginX, "marginRight", "mr");
    }
    if (props.marginY !== undefined) {
      processSpacing(props.marginY, "marginTop", "mt");
      processSpacing(props.marginY, "marginBottom", "mb");
    }
  }

  // Individual margin overrides
  if (props.marginTop !== undefined) processSpacing(props.marginTop, "marginTop", "mt");
  if (props.marginRight !== undefined) processSpacing(props.marginRight, "marginRight", "mr");
  if (props.marginBottom !== undefined) processSpacing(props.marginBottom, "marginBottom", "mb");
  if (props.marginLeft !== undefined) processSpacing(props.marginLeft, "marginLeft", "ml");

  // Process gap
  if (props.gap !== undefined) processSpacing(props.gap, "gap", "gap");
  if (props.rowGap !== undefined) processSpacing(props.rowGap, "rowGap", "rg");
  if (props.columnGap !== undefined) processSpacing(props.columnGap, "columnGap", "cg");

  return { style, cssVars };
}

/**
 * Extracts spacing props from a props object
 */
export function extractSpacingProps<T extends SpacingProps>(
  props: T
): { spacingProps: SpacingProps; restProps: Omit<T, keyof SpacingProps> } {
  const {
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    margin,
    marginX,
    marginY,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    gap,
    rowGap,
    columnGap,
    ...restProps
  } = props;

  return {
    spacingProps: {
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      margin,
      marginX,
      marginY,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      gap,
      rowGap,
      columnGap,
    },
    restProps: restProps as Omit<T, keyof SpacingProps>,
  };
}

/**
 * Simple hook to get spacing styles without responsive media queries
 * For responsive values, only the first (base) value is used
 */
export function getSpacingStyles(props: SpacingProps): CSSProperties {
  const style: CSSProperties = {};

  const resolve = (value: SpacingValue | undefined): string | undefined => {
    if (value === undefined) return undefined;
    if (typeof value === "string") return tokenToVar(value);
    return tokenToVar(value[0]);
  };

  // Padding
  if (props.padding !== undefined) {
    style.padding = resolve(props.padding);
  } else {
    if (props.paddingX !== undefined) {
      style.paddingLeft = resolve(props.paddingX);
      style.paddingRight = resolve(props.paddingX);
    }
    if (props.paddingY !== undefined) {
      style.paddingTop = resolve(props.paddingY);
      style.paddingBottom = resolve(props.paddingY);
    }
  }
  if (props.paddingTop !== undefined) style.paddingTop = resolve(props.paddingTop);
  if (props.paddingRight !== undefined) style.paddingRight = resolve(props.paddingRight);
  if (props.paddingBottom !== undefined) style.paddingBottom = resolve(props.paddingBottom);
  if (props.paddingLeft !== undefined) style.paddingLeft = resolve(props.paddingLeft);

  // Margin
  if (props.margin !== undefined) {
    style.margin = resolve(props.margin);
  } else {
    if (props.marginX !== undefined) {
      style.marginLeft = resolve(props.marginX);
      style.marginRight = resolve(props.marginX);
    }
    if (props.marginY !== undefined) {
      style.marginTop = resolve(props.marginY);
      style.marginBottom = resolve(props.marginY);
    }
  }
  if (props.marginTop !== undefined) style.marginTop = resolve(props.marginTop);
  if (props.marginRight !== undefined) style.marginRight = resolve(props.marginRight);
  if (props.marginBottom !== undefined) style.marginBottom = resolve(props.marginBottom);
  if (props.marginLeft !== undefined) style.marginLeft = resolve(props.marginLeft);

  // Gap
  if (props.gap !== undefined) style.gap = resolve(props.gap);
  if (props.rowGap !== undefined) style.rowGap = resolve(props.rowGap);
  if (props.columnGap !== undefined) style.columnGap = resolve(props.columnGap);

  return style;
}
