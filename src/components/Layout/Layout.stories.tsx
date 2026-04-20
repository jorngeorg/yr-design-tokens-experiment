import type { Meta, StoryObj } from "@storybook/react";
import { Div } from "./Div";
import { Flex } from "./Flex";
import { Grid } from "./Grid";
import { Inline } from "./Inline";

const Box = ({
  children,
  color = "#e0e0e0",
}: {
  children?: React.ReactNode;
  color?: string;
}) => (
  <div
    style={{
      padding: "1rem",
      backgroundColor: color,
      borderRadius: "4px",
      textAlign: "center",
    }}
  >
    {children}
  </div>
);

// Div Stories
const divMeta: Meta<typeof Div> = {
  title: "Layout/Div",
  component: Div,
  tags: ["autodocs"],
};

export default divMeta;

type DivStory = StoryObj<typeof Div>;

export const DivDefault: DivStory = {
  name: "Default",
  render: () => (
    <Div style={{ backgroundColor: "#f0f0f0" }} padding="4">
      A basic div container with padding="4"
    </Div>
  ),
};

export const DivAsSection: DivStory = {
  name: "As Section",
  render: () => (
    <Div as="section" padding="6" style={{ backgroundColor: "#f0f0f0" }}>
      Rendered as a section element with padding="6"
    </Div>
  ),
};

export const DivWithSpacing: DivStory = {
  name: "With Spacing Tokens",
  render: () => (
    <Div
      padding="4"
      marginBottom="6"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <Div padding="2" style={{ backgroundColor: "#d0d0d0" }}>
        Nested div with padding="2"
      </Div>
    </Div>
  ),
};

export const DivResponsivePadding: DivStory = {
  name: "Responsive Padding",
  render: () => (
    <Div
      padding={["2", "4", "6", "8"]}
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <p>Responsive padding: 2 → 4 → 6 → 8</p>
      <p style={{ fontSize: "0.875rem", color: "#666" }}>
        Resize the viewport to see padding change at breakpoints
      </p>
    </Div>
  ),
};

export const DivPaddingXY: DivStory = {
  name: "Padding X/Y",
  render: () => (
    <Div
      paddingX="8"
      paddingY="2"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      paddingX="8" paddingY="2"
    </Div>
  ),
};

// Flex Stories
const flexMeta: Meta<typeof Flex> = {
  title: "Layout/Flex",
  component: Flex,
  tags: ["autodocs"],
};

type FlexStory = StoryObj<typeof Flex>;

export const FlexRow: FlexStory = {
  name: "Row (default)",
  render: () => (
    <Flex gap="4">
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Flex>
  ),
};

export const FlexColumn: FlexStory = {
  name: "Column",
  render: () => (
    <Flex direction="column" gap="4">
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Flex>
  ),
};

export const FlexCentered: FlexStory = {
  name: "Centered",
  render: () => (
    <Flex
      align="center"
      justify="center"
      gap="4"
      style={{ height: "200px", backgroundColor: "#f5f5f5" }}
    >
      <Box>Centered</Box>
    </Flex>
  ),
};

export const FlexSpaceBetween: FlexStory = {
  name: "Space Between",
  render: () => (
    <Flex justify="space-between" align="center">
      <Box>Left</Box>
      <Box>Center</Box>
      <Box>Right</Box>
    </Flex>
  ),
};

export const FlexWrap: FlexStory = {
  name: "Wrap",
  render: () => (
    <Flex wrap="wrap" gap="4" style={{ maxWidth: "300px" }}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
      <Box>Item 4</Box>
      <Box>Item 5</Box>
    </Flex>
  ),
};

export const FlexWithPadding: FlexStory = {
  name: "With Padding",
  render: () => (
    <Flex
      gap="4"
      padding="6"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Flex>
  ),
};

export const FlexResponsiveGap: FlexStory = {
  name: "Responsive Gap",
  render: () => (
    <Flex gap={["2", "4", "6", "8"]} wrap="wrap">
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
      <Box>Item 4</Box>
    </Flex>
  ),
};

// Grid Stories
const gridMeta: Meta<typeof Grid> = {
  title: "Layout/Grid",
  component: Grid,
  tags: ["autodocs"],
};

type GridStory = StoryObj<typeof Grid>;

export const GridBasic: GridStory = {
  name: "Basic 3 Columns",
  render: () => (
    <Grid columns="1fr 1fr 1fr" gap="4">
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
      <Box>4</Box>
      <Box>5</Box>
      <Box>6</Box>
    </Grid>
  ),
};

export const GridAutoFit: GridStory = {
  name: "Auto-fit",
  render: () => (
    <Grid columns="repeat(auto-fit, minmax(150px, 1fr))" gap="4">
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
      <Box>4</Box>
      <Box>5</Box>
    </Grid>
  ),
};

export const GridWithRows: GridStory = {
  name: "With Rows",
  render: () => (
    <Grid columns="1fr 1fr" rows="100px 100px" gap="4">
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
      <Box>4</Box>
    </Grid>
  ),
};

export const GridWithPadding: GridStory = {
  name: "With Padding",
  render: () => (
    <Grid
      columns="1fr 1fr 1fr"
      gap="4"
      padding="6"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
      <Box>4</Box>
      <Box>5</Box>
      <Box>6</Box>
    </Grid>
  ),
};

export const GridResponsiveGap: GridStory = {
  name: "Responsive Gap",
  render: () => (
    <Grid columns="repeat(auto-fit, minmax(100px, 1fr))" gap={["2", "4", "6"]}>
      <Box>1</Box>
      <Box>2</Box>
      <Box>3</Box>
      <Box>4</Box>
      <Box>5</Box>
      <Box>6</Box>
    </Grid>
  ),
};

// Inline Stories
const inlineMeta: Meta<typeof Inline> = {
  title: "Layout/Inline",
  component: Inline,
  tags: ["autodocs"],
};

type InlineStory = StoryObj<typeof Inline>;

export const InlineDefault: InlineStory = {
  name: "Default",
  render: () => (
    <Inline gap="2">
      <Box>Tag 1</Box>
      <Box>Tag 2</Box>
      <Box>Tag 3</Box>
    </Inline>
  ),
};

export const InlineWrapping: InlineStory = {
  name: "Wrapping",
  render: () => (
    <Inline gap="2" style={{ maxWidth: "250px" }}>
      <Box>Tag 1</Box>
      <Box>Tag 2</Box>
      <Box>Tag 3</Box>
      <Box>Tag 4</Box>
      <Box>Tag 5</Box>
    </Inline>
  ),
};

export const InlineNoWrap: InlineStory = {
  name: "No Wrap",
  render: () => (
    <Inline gap="2" wrap={false} style={{ maxWidth: "250px", overflow: "auto" }}>
      <Box>Tag 1</Box>
      <Box>Tag 2</Box>
      <Box>Tag 3</Box>
      <Box>Tag 4</Box>
      <Box>Tag 5</Box>
    </Inline>
  ),
};

export const InlineCentered: InlineStory = {
  name: "Centered",
  render: () => (
    <Inline gap="2" justify="center">
      <Box>Tag 1</Box>
      <Box>Tag 2</Box>
      <Box>Tag 3</Box>
    </Inline>
  ),
};

export const InlineWithPadding: InlineStory = {
  name: "With Padding",
  render: () => (
    <Inline gap="2" padding="4" style={{ backgroundColor: "#f5f5f5" }}>
      <Box>Tag 1</Box>
      <Box>Tag 2</Box>
      <Box>Tag 3</Box>
    </Inline>
  ),
};

// Spacing Token Reference
export const SpacingTokens: DivStory = {
  name: "Spacing Token Reference",
  render: () => (
    <Flex direction="column" gap="2">
      <p style={{ marginBottom: "1rem" }}>
        Available spacing tokens (0-15, 18, 22, 26, 30):
      </p>
      {["0", "1", "2", "3", "4", "5", "6", "8", "10", "12", "15"].map((token) => (
        <Flex key={token} align="center" gap="4">
          <code style={{ width: "40px" }}>{token}</code>
          <Div
            style={{
              width: `var(--ds-size-${token})`,
              height: "24px",
              backgroundColor: "#3b82f6",
              borderRadius: "2px",
            }}
          />
        </Flex>
      ))}
    </Flex>
  ),
};
