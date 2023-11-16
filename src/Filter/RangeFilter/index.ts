import RangeFilter from "./RangeFilter";

export type RangeFilterProps = {
  label?: string;
  max?: number;
  min?: number;
  onChange?: (value: number[]) => void;
  unit?: string;
  value?: number[];
};

export default RangeFilter as React.FC<RangeFilterProps>;
