import Color from "./Color.js";

export type ColorProps = {
  onChange?: (color: string) => void;
  showControls?: boolean;
  showNoColor?: boolean;
  showPicker?: boolean;
  value?: string;
};

export default Color as React.FC<ColorProps>;
