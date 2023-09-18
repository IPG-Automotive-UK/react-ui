type Row = {
  color: string;
  value: number;
};
export type MultiColorProps = {
  onChange?: (rows: Row[]) => void;
  rows?: Row[];
};

declare const MultiColor: React.FC<MultiColorProps>;

export default MultiColor;
