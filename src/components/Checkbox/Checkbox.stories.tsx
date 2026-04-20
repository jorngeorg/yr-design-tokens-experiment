import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";
import { Fieldset } from "../Fieldset";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Form/Checkbox",
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => <Checkbox label="I agree to the terms and conditions" value="agree" />,
};

export const WithDescription: Story = {
  render: () => (
    <Checkbox
      label="Newsletter subscription"
      description="Receive weekly updates about our products"
      value="newsletter"
    />
  ),
};

export const WithError: Story = {
  render: () => (
    <Checkbox
      label="I agree to the terms and conditions"
      error="You must agree to continue"
      value="agree"
    />
  ),
};

export const CheckboxGroup: Story = {
  render: () => (
    <Fieldset>
      <Fieldset.Legend>Select your interests</Fieldset.Legend>
      <Checkbox label="Technology" value="tech" />
      <Checkbox label="Science" value="science" />
      <Checkbox label="Art" value="art" />
      <Checkbox label="Music" value="music" />
    </Fieldset>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Checkbox label="This option is disabled" value="disabled" disabled />
  ),
};
