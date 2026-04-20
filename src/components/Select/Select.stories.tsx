import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";
import { Field } from "../Field";
import { Label } from "../Typography";

const meta: Meta<typeof Select> = {
  title: "Components/Form/Select",
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Field>
      <Label>Country</Label>
      <Select>
        <Select.Option value="">Select a country</Select.Option>
        <Select.Option value="no">Norway</Select.Option>
        <Select.Option value="se">Sweden</Select.Option>
        <Select.Option value="dk">Denmark</Select.Option>
        <Select.Option value="fi">Finland</Select.Option>
      </Select>
    </Field>
  ),
};

export const WithOptgroups: Story = {
  render: () => (
    <Field>
      <Label>City</Label>
      <Select>
        <Select.Option value="">Select a city</Select.Option>
        <Select.Optgroup label="Norway">
          <Select.Option value="oslo">Oslo</Select.Option>
          <Select.Option value="bergen">Bergen</Select.Option>
          <Select.Option value="trondheim">Trondheim</Select.Option>
        </Select.Optgroup>
        <Select.Optgroup label="Sweden">
          <Select.Option value="stockholm">Stockholm</Select.Option>
          <Select.Option value="gothenburg">Gothenburg</Select.Option>
          <Select.Option value="malmo">Malmö</Select.Option>
        </Select.Optgroup>
      </Select>
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field>
      <Label>Disabled select</Label>
      <Select disabled>
        <Select.Option value="1">Option 1</Select.Option>
        <Select.Option value="2">Option 2</Select.Option>
      </Select>
    </Field>
  ),
};
