import { forwardRef } from "react";
import {
  Tag as DSTag,
  type TagProps as DSTagProps,
} from "@digdir/designsystemet-react";
import "./Tag.css";

type Shape = 'angle' | 'rounded'

export interface TagProps extends DSTagProps {
  shape?: Shape
}


const TagRoot = forwardRef<HTMLSpanElement, TagProps>(({shape = 'angle', ...props}, ref) => {
  return <DSTag ref={ref} {...props} data-shape={shape} className="yr-tag" />;
});

TagRoot.displayName = "Tag";

export const Tag = TagRoot;
