import { forwardRef, type HTMLAttributes, type CSSProperties } from "react";
import {
  type SpacingProps,
  extractSpacingProps,
  getSpacingStyles,
} from "./spacing";

export interface DivProps extends HTMLAttributes<HTMLDivElement>, SpacingProps {
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
}

export const Div = forwardRef<HTMLDivElement, DivProps>(
  ({ as: Component = "div", style, ...props }, ref) => {
    const { spacingProps, restProps } = extractSpacingProps(props);
    const spacingStyles = getSpacingStyles(spacingProps);

    const combinedStyle: CSSProperties = {
      ...spacingStyles,
      ...style,
    };

    return <Component ref={ref} style={combinedStyle} {...restProps} />;
  }
);

Div.displayName = "Div";
