import CanvasItem from "./CanvasItem";

export type CanvasItemProps = {
  /**
   * Aspect ratio of the item. If set, the item will be resized to keep the aspect ratio when resizing. If not set, the item will be resized freely.
   */
  aspectRatio?: number | boolean;
  /**
   * The height of the item.
   */
  height: number;
  /**
   * The left position of the item.
   */
  left: number;
  /**
   * The minimum height of the item.
   */
  minHeight?: number;
  /**
   * The minimum width of the item.
   */
  minWidth?: number;
  /**
   * Callback function when the item is clicked.
   *
   * **Signature**
   *
   * ```
   * function(event: ReactMouseEvent<HTMLDivElement>) => void
   * ```
   * event: The event source of the callback.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /**
   * Callback function when the item is dragged.
   *
   * **Signature**
   *
   * ```
   * function(top: number, left: number) => void
   * ```
   *
   * top: The new top position of the item.
   *
   * left: The new left position of the item.
   */
  onDrag?: (top: number, left: number) => void;
  /**
   * Callback function when the item is resized.
   *
   * **Signature**
   * ```
   * function({top: number, left: number, width: number, height: number, rotateAngle: number}, isShiftKey: boolean, type: string) => void
   * ```
   *
   * top: The new top position of the item.
   *
   * left: The new left position of the item.
   *
   * width: The new width of the item.
   *
   * height: The new height of the item.
   *
   * rotateAngle: The new rotate angle of the item.
   *
   * isShiftKey: Whether the shift key is pressed.
   *
   * type: The type of the resize handle.
   */
  onResize?: ({
    top,
    left,
    width,
    height,
    rotateAngle,
    isShiftKey,
    type
  }: {
    top: number;
    left: number;
    width: number;
    height: number;
    rotateAngle: number;
    isShiftKey: boolean;
    type: string;
  }) => void;
  /**
   * Callback function when the item is rotated.
   *
   * **Signature**
   *
   * ```
   * function(rotateAngle: number) => void
   * ```
   *
   * rotateAngle: The new rotate angle of the item.
   */
  onRotate?: (rotateAngle: number) => void;
  /**
   * The allowable resize directions of the item. Array of 'n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'.
   */
  resizeDirection?: "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw"[];
  /**
   * The rotation angle of the item.
   */
  rotateAngle?: number;
  /**
   * Defines whether the item is selected. When the item is selected, the resize and rotate handles will be shown.
   */
  selected?: boolean;
  /**
   * The top position of the item.
   */
  top: number;
  /**
   * The width of the item.
   */
  width: number;
  /**
   * Z-index of the rectangle
   */
  zIndex?: number;
};

export default CanvasItem as React.FC<CanvasItemProps>;
