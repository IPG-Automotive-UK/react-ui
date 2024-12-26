import type { Label } from "../../LabelSelector/Label.types";
import LabelFilter from "./LabelFilter";

/**
 * Props definition for the LabelFilter component
 */
export type LabelFilterProps = {
  /**
   * Label for the filter
   */
  label?: string;
  /**
   * How many tags to show before truncating and showing the plus sign, -1 is no limit.
   */
  limitTags?: number;
  /**
   * Name of the filter
   */
  name?: string;
  /**
   * OnChange handler for the filter box
   * @param value the value to add/delete from the filtered values
   * @returns void
   */
  onChange?: (value: Label[]) => void;
  /**
   * Options to choose from in the dropdown box
   */
  options: Label[];
  /**
   * Current value of what's been selected
   */
  value?: Label[];
};

export default LabelFilter as React.FC<LabelFilterProps>;
