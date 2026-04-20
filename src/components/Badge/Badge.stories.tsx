import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

const colors = ["accent", "info", "success", "warning", "danger"] as const;
const variants = ["base", "tinted"] as const;

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto repeat(5, auto)",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      {/* Header row */}
      <div />
      {colors.map((color) => (
        <div key={color} style={{ fontWeight: 600, textAlign: "center" }}>
          {color}
        </div>
      ))}

      {/* Badge rows - one row per variant */}
      {variants.map((variant) => (
        <>
          <div key={`${variant}-label`} style={{ fontWeight: 600 }}>
            {variant}
          </div>
          {colors.map((color) => (
            <Badge
              key={`${variant}-${color}`}
              variant={variant}
              data-color={color}
              count={5}
            />
          ))}
        </>
      ))}
    </div>
  ),
};

export const WithCount: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Badge count={1} />
      <Badge count={5} />
      <Badge count={99} />
      <Badge count={100} maxCount={99} />
    </div>
  ),
};

export const Positioned: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
      <Badge.Position placement="top-right">
        <Badge count={3} data-color="danger" />
        <div
          style={{
            width: 40,
            height: 40,
            backgroundColor: "var(--ds-color-neutral-surface-tinted)",
            borderRadius: 8,
          }}
        />
      </Badge.Position>

      <Badge.Position placement="top-left">
        <Badge count={7} data-color="info" />
        <div
          style={{
            width: 40,
            height: 40,
            backgroundColor: "var(--ds-color-neutral-surface-tinted)",
            borderRadius: 8,
          }}
        />
      </Badge.Position>

      <Badge.Position placement="bottom-right">
        <Badge count={12} data-color="success" />
        <div
          style={{
            width: 40,
            height: 40,
            backgroundColor: "var(--ds-color-neutral-surface-tinted)",
            borderRadius: 8,
          }}
        />
      </Badge.Position>

      <Badge.Position placement="top-right" overlap="circle">
        <Badge count={5} data-color="warning" />
        <div
          style={{
            width: 40,
            height: 40,
            backgroundColor: "var(--ds-color-neutral-surface-tinted)",
            borderRadius: "50%",
          }}
        />
      </Badge.Position>
    </div>
  ),
};

export const StatusIndicator: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Badge data-color="success" />
      <Badge data-color="warning" />
      <Badge data-color="danger" />
      <Badge data-color="info" />
    </div>
  ),
};
