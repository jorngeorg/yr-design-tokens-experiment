import {
  Fieldset as DSFieldset,
  type FieldsetProps as DSFieldsetProps,
  type FieldsetLegendProps as DSFieldsetLegendProps,
  type FieldsetDescriptionProps as DSFieldsetDescriptionProps,
} from "@digdir/designsystemet-react";

export interface FieldsetProps extends DSFieldsetProps {}
export interface FieldsetLegendProps extends DSFieldsetLegendProps {}
export interface FieldsetDescriptionProps extends DSFieldsetDescriptionProps {}

type FieldsetComponent = typeof DSFieldset & {
  Legend: typeof DSFieldset.Legend;
  Description: typeof DSFieldset.Description;
};

export const Fieldset: FieldsetComponent = DSFieldset as FieldsetComponent;
