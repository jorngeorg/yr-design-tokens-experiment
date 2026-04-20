import { forwardRef } from "react";
import {
  Badge as DSBadge,
  BadgePosition as DSBadgePosition,
  type BadgeProps as DSBadgeProps,
  type BadgePositionProps as DSBadgePositionProps,
} from "@digdir/designsystemet-react";

export interface BadgeProps extends DSBadgeProps {}

export interface BadgePositionProps extends DSBadgePositionProps {}

const BadgeRoot = forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  return <DSBadge ref={ref} {...props} />;
});

BadgeRoot.displayName = "Badge";

const BadgePosition = forwardRef<HTMLSpanElement, BadgePositionProps>(
  (props, ref) => {
    return <DSBadgePosition ref={ref} {...props} />;
  }
);

BadgePosition.displayName = "Badge.Position";

export const Badge = Object.assign(BadgeRoot, {
  Position: BadgePosition,
});
