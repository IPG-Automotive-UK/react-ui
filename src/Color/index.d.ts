export type ColorProps = {
  onChange?: (color: string) => void;
  showControls?: boolean;
  showNoColor?: boolean;
  showPicker?: boolean;
  value?: string;
};

declare const Color: React.FC<ColorProps>;

export default Color;
