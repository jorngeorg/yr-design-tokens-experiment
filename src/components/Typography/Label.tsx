import { forwardRef } from "react";
import {
  Label as DSLabel,
  type LabelProps as DSLabelProps,
} from "@digdir/designsystemet-react";

export interface LabelProps extends DSLabelProps {}

export const Label = forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  return <DSLabel ref={ref} {...props} />;
});

Label.displayName = "Label";
