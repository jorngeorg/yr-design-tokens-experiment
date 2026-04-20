import { forwardRef } from "react";
import {
  Checkbox as DSCheckbox,
  type CheckboxProps as DSCheckboxProps,
} from "@digdir/designsystemet-react";

export type CheckboxProps = DSCheckboxProps;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    return <DSCheckbox ref={ref} {...props} />;
  }
);

Checkbox.displayName = "Checkbox";
