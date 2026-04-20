import { forwardRef } from "react";
import {
  Radio as DSRadio,
  type RadioProps as DSRadioProps,
} from "@digdir/designsystemet-react";

export type RadioProps = DSRadioProps;

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  return <DSRadio ref={ref} {...props} />;
});

Radio.displayName = "Radio";
