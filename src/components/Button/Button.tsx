import { forwardRef } from "react";
import {
  Button as DSButton,
  type ButtonProps as DSButtonProps,
} from "@digdir/designsystemet-react";
import "./Button.css";

type Size = "sm" | "md" | "lg";
type Variant = "default" | "outline" | "secondary" | "ghost" | "destructive";

export interface ButtonProps extends Omit<DSButtonProps, "variant"> {
  /** Button size @default 'md' */
  size?: Size;
  /** Button variant @default 'default' */
  variant?: Variant;
}

const variantToProps = (variant: Variant) => {
  switch (variant) {
    case "default":
      return { variant: "primary" as const };
    case "outline":
      return { variant: "secondary" as const };
    case "secondary":
      return { variant: "primary" as const };
    case "ghost":
      return { variant: "tertiary" as const };
    case "destructive":
      return { variant: "primary" as const, "data-color": "danger" as const };
  }
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size = "md", variant = "default", ...props }, ref) => {
    const variantProps = variantToProps(variant);
    return (
      <DSButton
        ref={ref}
        data-size={size}
        data-yr-variant={variant}
        className="yr-button"
        {...variantProps}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
