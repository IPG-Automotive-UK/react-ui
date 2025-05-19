import { useColorScheme, useTheme } from "@mui/material";

import { BulletGaugeProps } from "./BulletGauge.types";
import Plotly from "react-plotly.js";
import React from "react";

/**
 * This component displays a bullet gauge progress indicator.
 */
const BulletGauge = ({ title, value, suffix }: BulletGaugeProps) => {
  // theme hook
  const theme = useTheme();

  // Limit value to 100
  const limitedValue = Math.min(value, 100);

  // get current mode
  const { mode, systemMode } = useColorScheme();

  // resolve the actual mode: fallback to systemMode if mode is set to "system".
  const currentMode = mode === "system" ? systemMode : mode;

  return (
    <Plotly
      data={[
        {
          domain: { x: [0, 1], y: [0, 1] },
          gauge: {
            axis: {
              range: [null, 100],
              tickfont: {
                color:
                  currentMode === "dark"
                    ? theme?.colorSchemes?.dark?.palette.text.primary
                    : theme?.colorSchemes?.light?.palette.text.primary,
                size: 12
              }
            },
            bar: {
              color:
                limitedValue < 30
                  ? currentMode === "dark"
                    ? theme?.colorSchemes?.dark?.palette.error.main
                    : theme?.colorSchemes?.light?.palette.error.main
                  : value > 70
                    ? currentMode === "dark"
                      ? theme?.colorSchemes?.dark?.palette.success.main
                      : theme?.colorSchemes?.light?.palette.success.main
                    : currentMode === "dark"
                      ? theme?.colorSchemes?.dark?.palette.warning.main
                      : theme?.colorSchemes?.light?.palette.warning.main
            },
            shape: "bullet"
          },
          mode: "gauge+number",
          number: {
            font: {
              color:
                currentMode === "dark"
                  ? theme?.colorSchemes?.dark?.palette.text.primary
                  : theme?.colorSchemes?.light?.palette.text.primary,
              size: 20
            },
            suffix: suffix || ""
          },
          type: "indicator",
          value: limitedValue
        }
      ]}
      layout={{
        font: {
          family: "Montserrat, sans-serif",
          size: 16
        },
        height: 80,
        margin: { b: 25, l: 8, r: 0, t: 25 },
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        title: {
          font: {
            color:
              currentMode === "dark"
                ? theme?.colorSchemes?.dark?.palette.text.secondary
                : theme?.colorSchemes?.light?.palette.text.secondary,
            size: 12
          },
          pad: {
            l: 8,
            t: 3
          },
          text: title,
          x: 0,
          xanchor: "left",
          y: 1,
          yanchor: "top"
        },
        width: 300
      }}
      config={{
        displayModeBar: false
      }}
    />
  );
};

export default BulletGauge;
