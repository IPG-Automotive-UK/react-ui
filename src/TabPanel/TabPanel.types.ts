/**
 * Represents the props of the TabPanel component
 */
export type TabPanelProps = {
  /**
   * The children of the tab panel. These are the tabs that will be rendered.
   */
  children: React.ReactNode;
  /**
   * Custom children to be rendered in the tab panel.
   */
  customChildren?: React.ReactNode;
  /**
   * The active tab index, this is the tab which is currently selected.
   */
  active: number;
  /**
   * The callback function that is called when the active tab changes.
   */
  onTabChange?: (newActiveTab: number) => void;
  /**
   * The variant of the tab panel. This can be either "standard" or "fullWidth".
   */
  variant?: "standard" | "fullWidth";
  /**
   * The display of the tab content. This can be either "flex" or "block".
   */
  display?: "flex" | "block";
  /**
   * The flexWrap of the tab content. This can be either "wrap" or "nowrap".
   */
  flexWrap?: "wrap" | "nowrap";
};
