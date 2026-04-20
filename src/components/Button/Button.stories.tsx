import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

const variants = ["default", "outline", "secondary", "ghost", "destructive"] as const;
const sizes = ["sm", "md", "lg"] as const;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "auto repeat(5, auto)", gap: "1rem", alignItems: "center" }}>
      {/* Header row */}
      <div />
      {variants.map((variant) => (
        <div key={variant} style={{ fontWeight: 600, textAlign: "center" }}>{variant}</div>
      ))}

      {/* Button rows - one row per size */}
      {sizes.map((size) => (
        <>
          <div key={`${size}-label`} style={{ fontWeight: 600 }}>{size}</div>
          {variants.map((variant) => (
            <Button key={`${size}-${variant}`} variant={variant} size={size}>
              Button
            </Button>
          ))}
        </>
      ))}
    </div>
  ),
};
