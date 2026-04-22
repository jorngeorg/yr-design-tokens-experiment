import { forwardRef } from "react";
import {
  Paragraph as DSParagraph,
  type ParagraphProps as DSParagraphProps,
} from "@digdir/designsystemet-react";
import "./Paragraph.css";

export interface ParagraphProps extends DSParagraphProps {
  "data-weight"?: "regular" | "medium";
}

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  (props, ref) => {
    return <DSParagraph ref={ref} {...props} />;
  }
);

Paragraph.displayName = "Paragraph";
