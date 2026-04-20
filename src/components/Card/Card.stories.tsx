import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";
import { Button } from "../Button";
import { Tag } from "../Tag";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <Card.Block>This is a basic card with a single block of content.</Card.Block>
    </Card>
  ),
};

export const WithMultipleBlocks: Story = {
  render: () => (
    <Card>
      <Card.Block>Header</Card.Block>
      <Card.Block>Content goes here</Card.Block>
      <Card.Block>Footer</Card.Block>
    </Card>
  ),
};

export const Tinted: Story = {
  render: () => (
    <Card variant="tinted">
      <Card.Block>This card has a tinted background.</Card.Block>
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Card style={{ flex: 1, minWidth: "200px" }}>
        <Card.Block>
          <strong>Default</strong>
        </Card.Block>
        <Card.Block>Default variant card</Card.Block>
      </Card>
      <Card variant="tinted" style={{ flex: 1, minWidth: "200px" }}>
        <Card.Block>
          <strong>Tinted</strong>
        </Card.Block>
        <Card.Block>Tinted variant card</Card.Block>
      </Card>
    </div>
  ),
};

const tintedColors = [
  "primary",
  "neutral",
  "info",
  "success",
  "warning",
  "danger",
] as const;

export const AllTintedVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}  data-color-scheme="light" >
      {tintedColors.map((color) => (
        <Card key={color} variant="tinted" data-color={color}>
          <Card.Block>
            <strong>{color}</strong>
          </Card.Block>
          <Card.Block>Tinted card with {color} color</Card.Block>
          <Card.Block>
            <Button size="sm" variant="default">Knapp</Button>
          </Card.Block>
        </Card>
      ))}
    </div>
  ),
};
