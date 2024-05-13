import { BulletGaugeProps } from "./BulletGauge.types";
import Plotly from "react-plotly.js";
import React from "react";
import { useTheme } from "@mui/material";

const BulletGauge = ({ title, value, suffix }: BulletGaugeProps) => {
  // theme hook
  const theme = useTheme();

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
              color: value < 30 ? "#f44336" : value > 70 ? "#4caf50" : "#ff9800"
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
          value
        }
      ]}
      layout={{
        font: {
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