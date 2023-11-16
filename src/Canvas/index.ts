import { SxProps, Theme } from "@mui/material/styles";

import Canvas from "./Canvas";

export type CanvasProps = {
  backgroundColor?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
  gridColor?: string;
  gridSize?: number;
  height?: number;
  minHeight?: number;
  minWidth?: number;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onResize?: (newWidth: number, newHeight: number) => void;
  onSelectionRectangle?: ({
    top,
    left,
    width,
    height
  }: {
    top: number;
    left: number;
    width: number;
    height: number;
  }) => void;
  ref?: React.RefObject<HTMLDivElement>;
  showBorder?: boolean;
  showGrid?: boolean;
  sx?: SxProps<Theme>;
  tabIndex?: number;
  width?: number;
};

export default Canvas as React.FC<CanvasProps>;
