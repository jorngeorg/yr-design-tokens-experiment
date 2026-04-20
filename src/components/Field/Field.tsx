import {
  Field as DSField,
  type FieldProps as DSFieldProps,
  type FieldDescriptionProps as DSFieldDescriptionProps,
  type FieldAffixesProps as DSFieldAffixesProps,
  type FieldAffixProps as DSFieldAffixProps,
  type FieldCounterProps as DSFieldCounterProps,
} from "@digdir/designsystemet-react";

export interface FieldProps extends DSFieldProps {}
export interface FieldDescriptionProps extends DSFieldDescriptionProps {}
export interface FieldAffixesProps extends DSFieldAffixesProps {}
export interface FieldAffixProps extends DSFieldAffixProps {}
export interface FieldCounterProps extends DSFieldCounterProps {}

type FieldComponent = typeof DSField & {
  Description: typeof DSField.Description;
  Affixes: typeof DSField.Affixes;
  Affix: typeof DSField.Affix;
  Counter: typeof DSField.Counter;
};

export const Field: FieldComponent = DSField as FieldComponent;
