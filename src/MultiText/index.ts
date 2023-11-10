type Row = {
  label: string;
  value: number;
};
export type MultiTextProps = {
  onChange?: (rows: Row[]) => void;
  rows?: Row[];
};

declare const MultiText: React.FC<MultiTextProps>;

export default MultiText;
