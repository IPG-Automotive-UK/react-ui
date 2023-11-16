import MultiText from "./MultiText";

type Row = {
  label: string;
  value: number;
};
export type MultiTextProps = {
  onChange?: (rows: Row[]) => void;
  rows?: Row[];
};

export default MultiText as React.FC<MultiTextProps>;
