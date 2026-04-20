import { forwardRef, type HTMLAttributes, type CSSProperties } from "react";
import {
  type SpacingProps,
  extractSpacingProps,
  getSpacingStyles,
} from "./spacing";

export interface InlineProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<SpacingProps, "gap"> {
  /** HTML element to render as */
  as?:
    | "div"
    | "span"
    | "section"
    | "article"
    | "aside"
    | "main"
    | "nav"
    | "header"
    | "footer";
  /** Gap between inline items - supports spacing tokens */
  gap?: SpacingProps["gap"] | CSSProperties["gap"];
  /** Align items on the cross axis */
  align?: CSSProperties["alignItems"];
  /** Justify content on the main axis */
  justify?: CSSProperties["justifyContent"];
  /** Whether items should wrap to next line */
  wrap?: boolean;
}

function isSpacingToken(
  value: unknown
): value is SpacingProps["gap"] {
  if (typeof value === "string") {
    return /^\d+$/.test(value);
  }
  if (Array.isArray(value)) {
    return value.every((v) => typeof v === "string" && /^\d+$/.test(v));
  }
  return false;
}

function resolveGapValue(
  value: SpacingProps["gap"] | CSSProperties["gap"] | undefined
): string | undefined {
  if (value === undefined) return undefined;

  if (typeof value === "string" && /^\d+$/.test(value)) {
    return `var(--ds-size-${value})`;
  }
  if (Array.isArray(value)) {
    return `var(--ds-size-${value[0]})`;
  }
  return value as string;
}

export const Inline = forwardRef<HTMLDivElement, InlineProps>(
  (
    {
      as: Component = "div",
      gap,
      align,
      justify,
      wrap = true,
      style,
      ...props
    },
    ref
  ) => {
    const { spacingProps, restProps } = extractSpacingProps(props);

    // Process gap value
    if (gap !== undefined && isSpacingToken(gap)) {
      spacingProps.gap = gap;
    }

    const spacingStyles = getSpacingStyles(spacingProps);

    const inlineStyle: CSSProperties = {
      display: "flex",
      flexDirection: "row",
      flexWrap: wrap ? "wrap" : "nowrap",
      gap: spacingProps.gap ? spacingStyles.gap : resolveGapValue(gap),
      alignItems: align,
      justifyContent: justify,
      ...spacingStyles,
      ...style,
    };

    return <Component ref={ref} style={inlineStyle} {...restProps} />;
  }
);

Inline.displayName = "Inline";
