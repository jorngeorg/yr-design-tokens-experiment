import { forwardRef, type ReactNode } from "react";
import {
  Dialog as DSDialog,
  DialogBlock as DSDialogBlock,
  DialogTrigger as DSDialogTrigger,
  DialogTriggerContext as DSDialogTriggerContext,
  type DialogProps as DSDialogProps,
  type DialogBlockProps as DSDialogBlockProps,
  type DialogTriggerProps as DSDialogTriggerProps,
  type DialogTriggerContextProps as DSDialogTriggerContextProps,
} from "@digdir/designsystemet-react";

export interface DialogProps extends DSDialogProps {}

export interface DialogBlockProps extends DSDialogBlockProps {}

export interface DialogTriggerProps extends DSDialogTriggerProps {}

export interface DialogTriggerContextProps extends DSDialogTriggerContextProps {}

const DialogRoot = forwardRef<HTMLDialogElement, DialogProps>((props, ref) => {
  return <DSDialog ref={ref} {...props} />;
});

DialogRoot.displayName = "Dialog";

const DialogBlock = forwardRef<HTMLDivElement, DialogBlockProps>(
  (props, ref) => {
    return <DSDialogBlock ref={ref} {...props} />;
  }
);

DialogBlock.displayName = "Dialog.Block";

const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  (props, ref) => {
    return <DSDialogTrigger ref={ref} {...props} />;
  }
);

DialogTrigger.displayName = "Dialog.Trigger";

const DialogTriggerContext = ({
  children,
}: DialogTriggerContextProps): ReactNode => {
  return <DSDialogTriggerContext>{children}</DSDialogTriggerContext>;
};

DialogTriggerContext.displayName = "Dialog.TriggerContext";

export const Dialog = Object.assign(DialogRoot, {
  Block: DialogBlock,
  Trigger: DialogTrigger,
  TriggerContext: DialogTriggerContext,
});
