import { ButtonProps } from "@mui/material";

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

// FilterButton props type
export type FilterButtonProps = {
  /**
   * The number of filters that are active.
   */
  count: number;
  /**
   * The label to display on the filter button.
   */
  label: string;
  /**
   * Callback function when the filter button is clicked.
   */
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
} & ButtonProps;
