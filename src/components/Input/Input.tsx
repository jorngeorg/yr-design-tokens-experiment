import { forwardRef } from "react";
import {
  Input as DSInput,
  type InputProps as DSInputProps,
} from "@digdir/designsystemet-react";

export interface InputProps extends DSInputProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <DSInput ref={ref} {...props} />;
});

Input.displayName = "Input";
