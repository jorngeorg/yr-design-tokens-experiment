import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef } from "react";
import { Dialog } from "./Dialog";
import { Button } from "../Button";
import { Heading } from "../Typography/Heading";
import { Paragraph } from "../Typography/Paragraph";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <Dialog.TriggerContext>
      <Dialog.Trigger>Open dialog</Dialog.Trigger>
      <Dialog>
        <Dialog.Block>
          <Heading>Dialog title</Heading>
        </Dialog.Block>
        <Dialog.Block>
          <Paragraph>This is the dialog content. You can put any content here.</Paragraph>
        </Dialog.Block>
      </Dialog>
    </Dialog.TriggerContext>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Dialog.TriggerContext>
      <Dialog.Trigger>Open dialog with footer</Dialog.Trigger>
      <Dialog>
        <Dialog.Block>
          <Heading level={2}>Confirm action</Heading>
        </Dialog.Block>
        <Dialog.Block>
          <Paragraph>Are you sure you want to proceed with this action?</Paragraph>
        </Dialog.Block>
        <Dialog.Block>
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
            <Button variant="outline">Cancel</Button>
            <Button variant="default">Confirm</Button>
          </div>
        </Dialog.Block>
      </Dialog>
    </Dialog.TriggerContext>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Dialog.TriggerContext>
        <Dialog.Trigger>Center (default)</Dialog.Trigger>
        <Dialog placement="center">
          <Dialog.Block>
            <Heading level={2}>Center placement</Heading>
          </Dialog.Block>
          <Dialog.Block>
            <Paragraph>This dialog appears in the center of the screen.</Paragraph>
          </Dialog.Block>
        </Dialog>
      </Dialog.TriggerContext>

      <Dialog.TriggerContext>
        <Dialog.Trigger>Left drawer</Dialog.Trigger>
        <Dialog placement="left">
          <Dialog.Block>
            <Heading level={2}>Left drawer</Heading>
          </Dialog.Block>
          <Dialog.Block>
            <Paragraph>This dialog slides in from the left.</Paragraph>
          </Dialog.Block>
        </Dialog>
      </Dialog.TriggerContext>

      <Dialog.TriggerContext>
        <Dialog.Trigger>Right drawer</Dialog.Trigger>
        <Dialog placement="right">
          <Dialog.Block>
            <Heading level={2}>Right drawer</Heading>
          </Dialog.Block>
          <Dialog.Block>
            <Paragraph>This dialog slides in from the right.</Paragraph>
          </Dialog.Block>
        </Dialog>
      </Dialog.TriggerContext>

      <Dialog.TriggerContext>
        <Dialog.Trigger>Top drawer</Dialog.Trigger>
        <Dialog placement="top">
          <Dialog.Block>
            <Heading level={2}>Top drawer</Heading>
          </Dialog.Block>
          <Dialog.Block>
            <Paragraph>This dialog slides in from the top.</Paragraph>
          </Dialog.Block>
        </Dialog>
      </Dialog.TriggerContext>

      <Dialog.TriggerContext>
        <Dialog.Trigger>Bottom drawer</Dialog.Trigger>
        <Dialog placement="bottom">
          <Dialog.Block>
            <Heading level={2}>Bottom drawer</Heading>
          </Dialog.Block>
          <Dialog.Block>
            <Paragraph>This dialog slides in from the bottom.</Paragraph>
          </Dialog.Block>
        </Dialog>
      </Dialog.TriggerContext>
    </div>
  ),
};

export const ClosedByAny: Story = {
  name: "Close on backdrop click",
  render: () => (
    <Dialog.TriggerContext>
      <Dialog.Trigger>Open (click backdrop to close)</Dialog.Trigger>
      <Dialog closedby="any">
        <Dialog.Block>
          <Heading level={2}>Click outside to close</Heading>
        </Dialog.Block>
        <Dialog.Block>
          <Paragraph>This dialog can be closed by clicking the backdrop.</Paragraph>
        </Dialog.Block>
      </Dialog>
    </Dialog.TriggerContext>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <Dialog.TriggerContext>
      <Dialog.Trigger>Open (no close button)</Dialog.Trigger>
      <Dialog closeButton={false} closedby="any">
        <Dialog.Block>
          <Heading level={2}>No close button</Heading>
        </Dialog.Block>
        <Dialog.Block>
          <Paragraph>This dialog has no close button. Click the backdrop or press Escape to close.</Paragraph>
        </Dialog.Block>
      </Dialog>
    </Dialog.TriggerContext>
  ),
};

export const ControlledWithRef: Story = {
  name: "Controlled with ref",
  render: function ControlledDialog() {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return (
      <>
        <Button onClick={() => dialogRef.current?.showModal()}>
          Open controlled dialog
        </Button>
        <Dialog ref={dialogRef}>
          <Dialog.Block>
            <Heading level={2}>Controlled dialog</Heading>
          </Dialog.Block>
          <Dialog.Block>
            <Paragraph>This dialog is controlled using a ref instead of TriggerContext.</Paragraph>
          </Dialog.Block>
          <Dialog.Block>
            <Button onClick={() => dialogRef.current?.close()}>Close</Button>
          </Dialog.Block>
        </Dialog>
      </>
    );
  },
};

export const NonModal: Story = {
  name: "Non-modal dialog",
  render: function NonModalDialog() {
    const dialogRef = useRef<HTMLDialogElement>(null);

    return (
      <>
        <Button onClick={() => dialogRef.current?.show()}>
          Open non-modal dialog
        </Button>
        <Dialog ref={dialogRef} modal={false}>
          <Dialog.Block>
            <Heading level={2}>Non-modal dialog</Heading>
          </Dialog.Block>
          <Dialog.Block>
            <Paragraph>This is a non-modal dialog. You can still interact with the page behind it.</Paragraph>
          </Dialog.Block>
        </Dialog>
      </>
    );
  },
};
