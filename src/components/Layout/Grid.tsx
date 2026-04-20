import { forwardRef, type HTMLAttributes, type CSSProperties } from "react";
import {
  type SpacingProps,
  extractSpacingProps,
  getSpacingStyles,
} from "./spacing";

export interface GridProps
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
  /** Grid template columns */
  columns?: CSSProperties["gridTemplateColumns"];
  /** Grid template rows */
  rows?: CSSProperties["gridTemplateRows"];
  /** Gap between grid items - supports spacing tokens */
  gap?: SpacingProps["gap"] | CSSProperties["gap"];
  /** Row gap between grid items - supports spacing tokens */
  rowGap?: SpacingProps["rowGap"] | CSSProperties["rowGap"];
  /** Column gap between grid items - supports spacing tokens */
  columnGap?: SpacingProps["columnGap"] | CSSProperties["columnGap"];
  /** Align items on the block axis */
  align?: CSSProperties["alignItems"];
  /** Justify items on the inline axis */
  justify?: CSSProperties["justifyItems"];
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

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      as: Component = "div",
      columns,
      rows,
      gap,
      rowGap,
      columnGap,
      align,
      justify,
      style,
      ...props
    },
    ref
  ) => {
    const { spacingProps, restProps } = extractSpacingProps(props);

    // Process gap values - handle both token and CSS values
    if (gap !== undefined && isSpacingToken(gap)) {
      spacingProps.gap = gap;
    }
    if (rowGap !== undefined && isSpacingToken(rowGap)) {
      spacingProps.rowGap = rowGap;
    }
    if (columnGap !== undefined && isSpacingToken(columnGap)) {
      spacingProps.columnGap = columnGap;
    }

    const spacingStyles = getSpacingStyles(spacingProps);

    const gridStyle: CSSProperties = {
      display: "grid",
      gridTemplateColumns: columns,
      gridTemplateRows: rows,
      gap: spacingProps.gap ? spacingStyles.gap : resolveGapValue(gap),
      rowGap: spacingProps.rowGap ? spacingStyles.rowGap : resolveGapValue(rowGap),
      columnGap: spacingProps.columnGap
        ? spacingStyles.columnGap
        : resolveGapValue(columnGap),
      alignItems: align,
      justifyItems: justify,
      ...spacingStyles,
      ...style,
    };

    // Clean up: remove gap properties that are already set
    if (!spacingProps.gap && gap !== undefined) {
      gridStyle.gap = resolveGapValue(gap);
    }

    return <Component ref={ref} style={gridStyle} {...restProps} />;
  }
);

Grid.displayName = "Grid";
