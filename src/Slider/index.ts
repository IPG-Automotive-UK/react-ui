import type {
  SliderProps as MuiSliderProps,
  SxProps,
  Theme
} from "@mui/material";

import Slider from "./Slider";

export type SliderProps = {
  color?: string;
  disabled?: boolean;
  labelPosition?: " bottom" | "top" | "left" | "right";
  labelStyle?: SxProps<Theme>;
  labels?: {
    label?: string;
    value: number;
  }[];
  max?: number;
  min?: number;
  onChange?: MuiSliderProps["onChange"];
  onChangeCommitted?: MuiSliderProps["onChangeCommitted"];
  showLabels?: boolean;
  step?: number;
  title: string;
  value?: number;
  valueLabelDisplay?: "auto" | "off" | "on";
};

export default Slider as React.FC<SliderProps>;
