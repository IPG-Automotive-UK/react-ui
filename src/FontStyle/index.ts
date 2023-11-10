export type FontStyleProps = {
  disabled?: boolean;
  onChange?: (event: React.MouseEvent<HTMLElement>, value: string[]) => void;
  orientation?: "horizontal" | "vertical";
  size?: "small" | "medium" | "large";
  value?: string[];
};

declare const FontStyle: React.FC<FontStyleProps>;

export default FontStyle;
