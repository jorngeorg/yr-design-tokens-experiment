import { forwardRef } from "react";
import {
  Select as DSSelect,
  SelectOption as DSSelectOption,
  SelectOptgroup as DSSelectOptgroup,
  type SelectProps as DSSelectProps,
  type SelectOptionProps as DSSelectOptionProps,
  type SelectOptgroupProps as DSSelectOptgroupProps,
} from "@digdir/designsystemet-react";

export interface SelectProps extends DSSelectProps {}
export interface SelectOptionProps extends DSSelectOptionProps {}
export interface SelectOptgroupProps extends DSSelectOptgroupProps {}

const SelectRoot = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  return <DSSelect ref={ref} {...props} />;
});

SelectRoot.displayName = "Select";

const Option = forwardRef<HTMLOptionElement, SelectOptionProps>((props, ref) => {
  return <DSSelectOption ref={ref} {...props} />;
});

Option.displayName = "Select.Option";

const Optgroup = forwardRef<HTMLOptGroupElement, SelectOptgroupProps>(
  (props, ref) => {
    return <DSSelectOptgroup ref={ref} {...props} />;
  }
);

Optgroup.displayName = "Select.Optgroup";

type SelectComponent = typeof SelectRoot & {
  Option: typeof Option;
  Optgroup: typeof Optgroup;
};

export const Select = SelectRoot as SelectComponent;
Select.Option = Option;
Select.Optgroup = Optgroup;
