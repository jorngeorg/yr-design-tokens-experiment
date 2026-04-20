import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "./Field";
import { Input } from "../Input";
import { Label } from "../Typography";

const meta: Meta<typeof Field> = {
  title: "Components/Form/Field",
  component: Field,
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Default: Story = {
  render: () => (
    <Field>
      <Label>Name</Label>
      <Input />
    </Field>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Field>
      <Label>Email</Label>
      <Field.Description>We will never share your email.</Field.Description>
      <Input type="email" />
    </Field>
  ),
};

export const WithAffixes: Story = {
  render: () => (
    <Field>
      <Label>Price</Label>
      <Field.Affixes>
        <Field.Affix>NOK</Field.Affix>
        <Input type="number" />
        <Field.Affix>per month</Field.Affix>
      </Field.Affixes>
    </Field>
  ),
};

export const WithCounter: Story = {
  render: () => (
    <Field>
      <Label>Bio</Label>
      <Input />
      <Field.Counter limit={100} />
    </Field>
  ),
};
