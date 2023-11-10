export type CanvasItemProps = {
  aspectRatio?: number | boolean;
  height: number;
  left: number;
  minHeight?: number;
  minWidth?: number;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onDrag?: (top: number, left: number) => void;
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
  onRotate?: (rotateAngle: number) => void;
  resizeDirection?: "n" | "ne" | "e" | "se" | "s" | "sw" | "w" | "nw"[];
  rotateAngle?: number;
  selected?: boolean;
  top: number;
  width: number;
  zIndex?: number;
};

declare const CanvasItem: React.FC<CanvasItemProps>;

export default CanvasItem;
