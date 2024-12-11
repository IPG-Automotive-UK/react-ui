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

/**
 * Custom hook (with memo) to generate a color map for a list of options
 * @param allOptions A list of all values that should be assigned a color
 */
export default function useColorMap(allOptions: string[]) {
  // generate color map from options
  const colorMap = useMemo(() => {
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

/**
 * A function to generate a color map for a list of options
 * @param allOptions A list of all values that should be assigned a color
 */
export function colorMap(allOptions: string[]) {
  // create color map
  const colorMap: { [key: string]: string } = {};
  for (let i = 0; i < allOptions.length; i++) {
    colorMap[allOptions[i]] = colors[i % colors.length];
  }
  // return function to get color for a given option
  const getColor = (option: string) => colorMap[option];
  return getColor;
}
