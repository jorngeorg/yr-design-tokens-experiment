import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "./Heading";
import { Label } from "./Label";
import { Paragraph } from "./Paragraph";

const meta: Meta = {
  title: "Components/Typography",
};

export default meta;

export const Headings: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Heading level={1} data-size="2xl">
        Heading 1 (2xl)
      </Heading>
      <Heading level={2} data-size="xl">
        Heading 2 (xl)
      </Heading>
      <Heading level={3} data-size="lg">
        Heading 3 (lg)
      </Heading>
      <Heading level={4} data-size="md">
        Heading 4 (md)
      </Heading>
      <Heading level={5} data-size="sm">
        Heading 5 (sm)
      </Heading>
      <Heading level={6} data-size="xs">
        Heading 6 (xs)
      </Heading>
    </div>
  ),
};

export const HeadingSizes: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Heading data-size="2xl">Size 2xl</Heading>
      <Heading data-size="xl">Size xl</Heading>
      <Heading data-size="lg">Size lg</Heading>
      <Heading data-size="md">Size md (default)</Heading>
      <Heading data-size="sm">Size sm</Heading>
      <Heading data-size="xs">Size xs</Heading>
      <Heading data-size="2xs">Size 2xs</Heading>
    </div>
  ),
};

export const Labels: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div>
        <Label weight="regular">Label (regular)</Label>
      </div>
      <div>
        <Label weight="medium">Label (medium - default)</Label>
      </div>
      <div>
        <Label weight="semibold">Label (semibold)</Label>
      </div>
    </div>
  ),
};

export const LabelSizes: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Label data-size="lg">Large label</Label>
      <Label data-size="md">Medium label (default)</Label>
      <Label data-size="sm">Small label</Label>
    </div>
  ),
};

export const Paragraphs: StoryObj = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        maxWidth: "600px",
      }}
    >
      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: "0.5rem" }}>
          Default variant
        </Heading>
        <Paragraph>
          This is a paragraph with the default variant. It provides comfortable
          reading for general content and is suitable for most text blocks.
        </Paragraph>
      </div>
      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: "0.5rem" }}>
          Long variant
        </Heading>
        <Paragraph variant="long">
          This is a paragraph with the long variant. It is optimized for longer
          form content like articles or documentation where readers will spend
          more time reading continuously.
        </Paragraph>
      </div>
      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: "0.5rem" }}>
          Short variant
        </Heading>
        <Paragraph variant="short">
          This is a paragraph with the short variant, optimized for brief text.
        </Paragraph>
      </div>
    </div>
  ),
};

export const ParagraphSizes: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Paragraph data-size="xl">Extra large paragraph text</Paragraph>
      <Paragraph data-size="lg">Large paragraph text</Paragraph>
      <Paragraph data-size="md">Medium paragraph text (default)</Paragraph>
      <Paragraph data-size="sm">Small paragraph text</Paragraph>
      <Paragraph data-size="xs">Extra small paragraph text</Paragraph>
    </div>
  ),
};
