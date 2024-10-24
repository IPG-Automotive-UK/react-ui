import FilterStack from "./FilterStack.js";

export type FilterStackProps = {
  children?: React.ReactNode;
  count?: number;
  onClear?: (event: React.MouseEvent<HTMLElement>) => void;
};

export default FilterStack as React.FC<FilterStackProps>;
