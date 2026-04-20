import { forwardRef } from "react";
import {
  Heading as DSHeading,
  type HeadingProps as DSHeadingProps,
} from "@digdir/designsystemet-react";

export interface HeadingProps extends DSHeadingProps {}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (props, ref) => {
    return <DSHeading ref={ref} {...props} />;
  }
);

Heading.displayName = "Heading";
