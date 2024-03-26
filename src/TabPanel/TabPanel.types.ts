/**
 * Represents the props of the TabPanel component
 */
export type TabPanelProps = {
  /**
   * The children of the tab panel. These are the tabs that will be rendered.
   */
  children: React.ReactNode;
  /**
   * The active tab index, this is the tab which is currently selected.
   */
  active: number;
  /**
   * The callback function that is called when the active tab changes.
   */
  onTabChange?: (newActiveTab: number) => void;
};
