import MultiColor from "./MultiColor";

type Row = {
  color: string;
  value: number;
};
export type MultiColorProps = {
  onChange?: (rows: Row[]) => void;
  rows?: Row[];
};

export default MultiColor as React.FC<MultiColorProps>;
