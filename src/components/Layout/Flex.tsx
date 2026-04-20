import { forwardRef, type HTMLAttributes, type CSSProperties } from "react";
import {
  type SpacingProps,
  extractSpacingProps,
  getSpacingStyles,
} from "./spacing";

export interface FlexProps
  extends HTMLAttributes<HTMLDivElement>,
    Omit<SpacingProps, "gap" | "rowGap" | "columnGap"> {
  /** HTML element to render as */
  as?:
    | "div"
    | "section"
    | "article"
    | "aside"
    | "main"
    | "nav"
    | "header"
    | "footer";
  /** Flex direction */
  direction?: CSSProperties["flexDirection"];
  /** Align items on the cross axis */
  align?: CSSProperties["alignItems"];
  /** Justify content on the main axis */
  justify?: CSSProperties["justifyContent"];
  /** Gap between flex items - supports spacing tokens */
  gap?: SpacingProps["gap"] | CSSProperties["gap"];
  /** Whether flex items should wrap */
  wrap?: CSSProperties["flexWrap"];
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      as: Component = "div",
      direction,
      align,
      justify,
      gap,
      wrap,
      style,
      ...props
    },
    ref
  ) => {
    const { spacingProps, restProps } = extractSpacingProps(props);

    // Handle gap - could be a spacing token or a CSS value
    const gapValue =
      typeof gap === "string" && /^\d+$/.test(gap)
        ? `var(--ds-size-${gap})`
        : Array.isArray(gap)
          ? `var(--ds-size-${gap[0]})`
          : gap;

    // Add gap to spacing props for processing if it's a token
    if (gap !== undefined && (typeof gap === "string" && /^\d+$/.test(gap) || Array.isArray(gap))) {
      spacingProps.gap = gap as SpacingProps["gap"];
    }

    const spacingStyles = getSpacingStyles(spacingProps);

    const flexStyle: CSSProperties = {
      display: "flex",
      flexDirection: direction,
      alignItems: align,
      justifyContent: justify,
      gap: spacingProps.gap ? spacingStyles.gap : gapValue,
      flexWrap: wrap,
      ...spacingStyles,
      ...style,
    };

    // Remove duplicate gap from spacingStyles if we handled it in flexStyle
    if (spacingProps.gap) {
      delete (flexStyle as Record<string, unknown>)["gap"];
      flexStyle.gap = spacingStyles.gap;
    }

    return <Component ref={ref} style={flexStyle} {...restProps} />;
  }
);

Flex.displayName = "Flex";
