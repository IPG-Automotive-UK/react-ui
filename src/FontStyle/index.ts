import FontStyle from "./FontStyle";

export type FontStyleProps = {
  disabled?: boolean;
  onChange?: (event: React.MouseEvent<HTMLElement>, value: string[]) => void;
  orientation?: "horizontal" | "vertical";
  size?: "small" | "medium" | "large";
  value?: string[];
};

export default FontStyle as React.FC<FontStyleProps>;
