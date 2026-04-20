import { forwardRef } from "react";
import {
  Tabs as DSTabs,
  TabsList as DSTabsList,
  TabsTab as DSTabsTab,
  TabsPanel as DSTabsPanel,
  type TabsProps as DSTabsProps,
  type TabsListProps as DSTabsListProps,
  type TabsTabProps as DSTabsTabProps,
  type TabsPanelProps as DSTabsPanelProps,
} from "@digdir/designsystemet-react";
import "./Tabs.css";

export interface TabsProps extends DSTabsProps {}
export interface TabsListProps extends DSTabsListProps {}
export interface TabsTabProps extends DSTabsTabProps {}
export interface TabsPanelProps extends DSTabsPanelProps {}

const TabsRoot = forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
  return <DSTabs ref={ref} {...props} className="yr-tabs" />;
});

TabsRoot.displayName = "Tabs";

const TabsList = forwardRef<HTMLDivElement, TabsListProps>((props, ref) => {
  return <DSTabsList ref={ref} {...props} className="yr-tabs-list" />;
});

TabsList.displayName = "Tabs.List";

const TabsTab = forwardRef<HTMLButtonElement, TabsTabProps>((props, ref) => {
  return <DSTabsTab ref={ref} {...props} className="yr-tabs-tab" />;
});

TabsTab.displayName = "Tabs.Tab";

const TabsPanel = forwardRef<HTMLDivElement, TabsPanelProps>((props, ref) => {
  return <DSTabsPanel ref={ref} {...props} className="yr-tabs-panel" />;
});

TabsPanel.displayName = "Tabs.Panel";

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab: TabsTab,
  Panel: TabsPanel,
});
