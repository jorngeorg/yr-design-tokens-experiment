import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio } from "./Radio";
import { Fieldset } from "../Fieldset";

const meta: Meta<typeof Radio> = {
  title: "Components/Form/Radio",
  component: Radio,
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: () => <Radio label="Option A" value="a" name="single" />,
};

export const RadioGroup: Story = {
  render: () => (
    <Fieldset>
      <Fieldset.Legend>Select your preferred contact method</Fieldset.Legend>
      <Radio label="Email" value="email" name="contact" />
      <Radio label="Phone" value="phone" name="contact" />
      <Radio label="SMS" value="sms" name="contact" />
    </Fieldset>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Fieldset>
      <Fieldset.Legend>Subscription plan</Fieldset.Legend>
      <Radio
        label="Free"
        description="Basic features, limited usage"
        value="free"
        name="plan"
      />
      <Radio
        label="Pro"
        description="All features, unlimited usage"
        value="pro"
        name="plan"
      />
      <Radio
        label="Enterprise"
        description="Custom solutions for large teams"
        value="enterprise"
        name="plan"
      />
    </Fieldset>
  ),
};

export const WithError: Story = {
  render: () => (
    <Fieldset>
      <Fieldset.Legend>Select an option</Fieldset.Legend>
      <Radio label="Option 1" value="1" name="error-example" error="Please select an option" />
      <Radio label="Option 2" value="2" name="error-example" />
    </Fieldset>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Fieldset>
      <Fieldset.Legend>Disabled options</Fieldset.Legend>
      <Radio label="Available" value="available" name="disabled-example" />
      <Radio label="Disabled" value="disabled" name="disabled-example" disabled />
    </Fieldset>
  ),
};
