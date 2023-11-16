import type { Label } from "../LabelSelector/Label.types";
import MultiLabelPopover from "./MultiLabelPopover";

export type MultiLabelPopoverProps = {
  labels?: Label[];
};

export default MultiLabelPopover as React.FC<MultiLabelPopoverProps>;
