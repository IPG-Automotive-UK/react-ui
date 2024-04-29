/**
 * This type defines the Part object
 */
export type Part = {
  /** Part id */
  _id: string;
  /** Part name */
  part_name: string;
  /** Part number */
  part_number: string;
};

/**
 * This type defines the props for the PartSelector component
 */
export type PartSelectorProps = {
  /**
   * FlexDirection of the component
   */
  flexDirection?: "row" | "column";
  /**
   * FlexWrap of the component
   */
  flexWrap?: "nowrap" | "wrap";
  /**
   * Callback function fired on each part change
   */
  onChange: (value: Part) => void;
  /**
   * Array of parts
   */
  parts: Part[];
  /**
   * The currently selected part
   */
  value: Part;
  /**
   * Size of the field
   */
  size?: "small" | "medium";
  /**
   * Sort order of the part names and numbers
   */
  sortOrder?: "asc" | "desc";
};
