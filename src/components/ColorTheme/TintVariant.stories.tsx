import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../Button";
import { Card } from "../Card";
import { Checkbox } from "../Checkbox";
import { Field } from "../Field";
import { Input } from "../Input";
import { Radio } from "../Radio";
import { Select } from "../Select";
import { Tag } from "../Tag";
import { Heading, Label, Paragraph } from "../Typography";

const meta: Meta = {
  title: "Theme/Tint Variant",
};

export default meta;
type Story = StoryObj;

const tintColors = [
  "neutral",
  "primary",
  "accent",
  "extra1",
  "extra2",
  "info",
  "success",
  "warning",
  "danger",
] as const;

export const TintVariantShowcase: Story = {
  name: "Components inside tinted cards",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      {tintColors.map((color) => (
        <Card key={color} variant="tinted" data-color={color}>
          <Card.Block>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Heading level={3} data-size="sm">{color}</Heading>
              <Tag data-color={color}>{color}</Tag>
            </div>
            <Paragraph data-size="sm" style={{ marginTop: "0.5rem" }}>
              Components inside inherit the <strong>{color}</strong> color context.
            </Paragraph>
          </Card.Block>

          <Card.Block>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <Field>
                <Label>Text input</Label>
                <Input placeholder="Enter text…" />
              </Field>

              <Field>
                <Label>Select</Label>
                <Select>
                  <Select.Option value="">Choose an option</Select.Option>
                  <Select.Option value="a">Option A</Select.Option>
                  <Select.Option value="b">Option B</Select.Option>
                </Select>
              </Field>

              <Checkbox label="Checkbox option" value="option" />
              <Radio label="Radio option" value="option" name={`radio-${color}`} />
            </div>
          </Card.Block>

          <Card.Block>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <Button size="sm" variant="default">Primary</Button>
              <Button size="sm" variant="outline">Outline</Button>
              <Button size="sm" variant="ghost">Ghost</Button>
            </div>
          </Card.Block>
        </Card>
      ))}
    </div>
  ),
};
