export type TableCardProps = {
  action?: React.ReactNode;
  tableContent?: [string, string | React.ReactNode][];
  title?: string;
};

declare const TableCard: React.FC<TableCardProps>;

export default TableCard;
