import { forwardRef } from "react";
import {
  Paragraph as DSParagraph,
  type ParagraphProps as DSParagraphProps,
} from "@digdir/designsystemet-react";

export interface ParagraphProps extends DSParagraphProps {}

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  (props, ref) => {
    return <DSParagraph ref={ref} {...props} />;
  }
);

Paragraph.displayName = "Paragraph";
