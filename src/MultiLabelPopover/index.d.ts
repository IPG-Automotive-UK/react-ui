import type { Label } from "../LabelSelector/Label.types";
export type MultiLabelPopoverProps = {
  labels?: Label[];
};

declare const MultiLabelPopover: React.FC<MultiLabelPopoverProps>;

export default MultiLabelPopover;
