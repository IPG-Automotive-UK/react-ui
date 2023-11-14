import {
  cyan,
  deepOrange,
  green,
  indigo,
  pink,
  purple,
  red,
  teal
} from "@mui/material/colors";

import { useMemo } from "react";

// custom hook to generate a color map for a list of options
export default function useColorMap(allOptions: string[]) {
  // generate color map from options
  const colorMap = useMemo(() => {
    // define list of colors
    const colors = [
      indigo[500],
      green[700],
      deepOrange[500],
      cyan[700],
      pink[600],
      teal[600],
      purple[500],
      red[600]
    ];

    // create color map
    const colorMap: { [key: string]: string } = {};
    for (let i = 0; i < allOptions.length; i++) {
      colorMap[allOptions[i]] = colors[i % colors.length];
    }
    return colorMap;
  }, [allOptions]);

  // return function to get color for a given option
  const getColor = (option: string) => colorMap[option];
  return getColor;
}
