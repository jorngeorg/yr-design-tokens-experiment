import { forwardRef } from "react";
import {
  Card as DSCard,
  CardBlock as DSCardBlock,
  type CardProps as DSCardProps,
  type CardBlockProps as DSCardBlockProps,
} from "@digdir/designsystemet-react";

export interface CardProps extends DSCardProps {}

export interface CardBlockProps extends DSCardBlockProps {}

const CardRoot = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  return <DSCard ref={ref} {...props} />;
});

CardRoot.displayName = "Card";

const CardBlock = forwardRef<HTMLDivElement, CardBlockProps>((props, ref) => {
  return <DSCardBlock ref={ref} {...props} />;
});

CardBlock.displayName = "Card.Block";

export const Card = Object.assign(CardRoot, {
  Block: CardBlock,
});
