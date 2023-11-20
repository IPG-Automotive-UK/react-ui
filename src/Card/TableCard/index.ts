import TableCard from "./TableCard";

export type TableCardProps = {
  action?: React.ReactNode;
  tableContent?: [string, string | React.ReactNode][];
  title?: string;
};

export default TableCard as React.FC<TableCardProps>;
