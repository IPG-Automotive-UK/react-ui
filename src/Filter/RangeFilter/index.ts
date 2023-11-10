export type RangeFilterProps = {
  label?: string;
  max?: number;
  min?: number;
  onChange?: (value: number[]) => void;
  unit?: string;
  value?: number[];
};

declare const RangeFilter: React.FC<RangeFilterProps>;

export default RangeFilter;
