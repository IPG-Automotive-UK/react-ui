import FilterPopper from "./FilterPopper";

export type FilterPopperProps = {
  children?: React.ReactNode;
  count?: number;
  label?: string;
};

export default FilterPopper as React.FC<FilterPopperProps>;
