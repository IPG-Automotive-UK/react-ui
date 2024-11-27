import { BulletGaugeProps } from "./BulletGauge.types";
import Plotly from "react-plotly.js";
import React from "react";
import { useTheme } from "@mui/material";

/**
 * This component displays a bullet gauge progress indicator.
 */
const BulletGauge = ({ title, value, suffix }: BulletGaugeProps) => {
  // theme hook
  const theme = useTheme();

  // Limit value to 100
  const limitedValue = Math.min(value, 100);

  return (
    <Plotly
      data={[
        {
          domain: { x: [0, 1], y: [0, 1] },
          gauge: {
            axis: {
              range: [null, 100],
              tickfont: {
                color: theme.palette.mode === "light" ? "black" : "white",
                size: 12
              }
            },
            bar: {
              color:
                limitedValue < 30
                  ? theme.palette.error.main
                  : value > 70
                    ? theme.palette.success.main
                    : theme.palette.warning.main
            },
            shape: "bullet"
          },
          mode: "gauge+number",
          number: {
            font: {
              color: theme.palette.mode === "light" ? "black" : "white",
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
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        title: {
          font: {
            color:
              theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.54)" : "white",
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
