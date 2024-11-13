// SidebarFilterProps props type
export type SidebarFilterProps = {
  /**
   * The content of the component that will be displayed in the sidebar.
   */
  children: React.ReactNode;
  /**
   * The number of filters that are active.
   */
  count?: number;
  /**
   * Callback function to clear all filters.
   */
  onClear?: (event: React.MouseEvent<HTMLElement>) => void;
};
