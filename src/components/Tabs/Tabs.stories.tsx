import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Tabs } from "./Tabs";
import { Paragraph } from "../Typography/Paragraph";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <Tabs.List>
        <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
        <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
        <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="tab1">
        <Paragraph>Content for Tab 1</Paragraph>
      </Tabs.Panel>
      <Tabs.Panel value="tab2">
        <Paragraph>Content for Tab 2</Paragraph>
      </Tabs.Panel>
      <Tabs.Panel value="tab3">
        <Paragraph>Content for Tab 3</Paragraph>
      </Tabs.Panel>
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: function ControlledTabs() {
    const [activeTab, setActiveTab] = useState("tab1");

    return (
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="tab1">First</Tabs.Tab>
          <Tabs.Tab value="tab2">Second</Tabs.Tab>
          <Tabs.Tab value="tab3">Third</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="tab1">
          <Paragraph>First panel content. Current tab: {activeTab}</Paragraph>
        </Tabs.Panel>
        <Tabs.Panel value="tab2">
          <Paragraph>Second panel content. Current tab: {activeTab}</Paragraph>
        </Tabs.Panel>
        <Tabs.Panel value="tab3">
          <Paragraph>Third panel content. Current tab: {activeTab}</Paragraph>
        </Tabs.Panel>
      </Tabs>
    );
  },
};

export const ManyTabs: Story = {
  name: "Many tabs",
  render: () => (
    <Tabs defaultValue="tab1">
      <Tabs.List>
        <Tabs.Tab value="tab1">Overview</Tabs.Tab>
        <Tabs.Tab value="tab2">Details</Tabs.Tab>
        <Tabs.Tab value="tab3">Settings</Tabs.Tab>
        <Tabs.Tab value="tab4">History</Tabs.Tab>
        <Tabs.Tab value="tab5">Notifications</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="tab1">
        <Paragraph>Overview content</Paragraph>
      </Tabs.Panel>
      <Tabs.Panel value="tab2">
        <Paragraph>Details content</Paragraph>
      </Tabs.Panel>
      <Tabs.Panel value="tab3">
        <Paragraph>Settings content</Paragraph>
      </Tabs.Panel>
      <Tabs.Panel value="tab4">
        <Paragraph>History content</Paragraph>
      </Tabs.Panel>
      <Tabs.Panel value="tab5">
        <Paragraph>Notifications content</Paragraph>
      </Tabs.Panel>
    </Tabs>
  ),
};
