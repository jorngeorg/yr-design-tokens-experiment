import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag, type TagProps } from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
};

export default meta;
type Story = StoryObj<typeof Tag>;

  const colors = [
    'accent',
    'brand1',
    'brand2',
    'brand3',
    'neutral',
    'success',
    'warning',
    'danger',
    'info',
  ] as TagProps['data-color'][];

export const Default: Story = {
  render: () => (
    <div style={{display: "grid", gap: '1rem'}}>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {colors.map((color) => (
          <Tag key={color} data-color={color}>
            {color}
          </Tag>
        ))}
      </div>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {colors.map((color) => (
          <Tag key={color} data-color={color} variant="outline" shape="rounded">
            {color}
          </Tag>
        ))}
      </div>
    </div>
  ),
};
