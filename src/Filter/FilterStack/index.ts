export type FilterStackProps = {
  children?: React.ReactNode;
  count?: number;
  onClear?: (event: React.MouseEvent<HTMLElement>) => void;
};

declare const FilterStack: React.FC<FilterStackProps>;

export default FilterStack;
