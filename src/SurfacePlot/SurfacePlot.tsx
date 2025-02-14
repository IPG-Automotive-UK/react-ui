import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

import ConditionalDialog from "../ConditionalDialog";
import Plotly from "react-plotly.js";
import { SurfacePlotProps } from "./SurfacePlot.types";
import { getConfig } from "../utils/plotlyConfig";

// The `SurfacePlot` component renders a 3D surface plot using Plotly.
const SurfacePlot = ({
  fullscreenTitle = "",
  xdata = [],
  ydata = [],
  zdata = [],
  xlabel = "",
  ylabel = "",
  zlabel = "",
  title = "",
  showGrid = true
}: SurfacePlotProps) => {
  // theme hook
  const theme = useTheme();

  // state for fullscreen
  const [isFullscreen, setIsFullscreen] = useState(false);

  // state to keep track of the wrapped axis labels for the plot
  const [wrappedLabel, setWrappedLabel] = useState({
    x: xlabel,
    y: ylabel,
    z: zlabel
  });

  // helper function to wrap text in axis labels
  const wrapText = (text: string, maxLength: number) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    const matches = text.match(new RegExp(`.{1,${maxLength}}`, "g"));
    return matches ? matches.join("<br>") : text;
  };

  // effect to wrap axis labels when the axis labels change
  useEffect(() => {
    // get the maximum width of the window
    const maxWidth = Math.max(window.innerWidth * 0.1, 50);
    // get the maximum number of characters that can fit in the axis label
    const maxLabelLength = Math.floor(maxWidth / 6);
    // set wrapped axis labels
    setWrappedLabel({
      x: wrapText(xlabel, maxLabelLength),
      y: wrapText(ylabel, maxLabelLength),
      z: wrapText(zlabel, maxLabelLength)
    });
  }, [xlabel, ylabel, zlabel]);

  // callback for fullscreen button
  const handleClickFullscreen = () => setIsFullscreen(true);
  // callback for closing fullscreen
  const handleClose = () => setIsFullscreen(false);
  // get config for plotly
  const config = getConfig({ handleClickFullscreen, isFullscreen });
  // determine whether to show title
  const showTitle = title !== "";

  return (
    <ConditionalDialog
      condition={isFullscreen}
      onClose={handleClose}
      title={fullscreenTitle}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
          width: "100%"
        }}
      >
        {!isFullscreen && showTitle ? (
          <Typography
            align="center"
            sx={{ padding: "0 16px", wordWrap: "break-word" }}
          >
            {title || ""}
          </Typography>
        ) : null}
        <Plotly
          data={[
            {
              colorbar: {
                tickfont: {
                  color: theme.palette.mode === "light" ? "" : "white",
                  family: "Montserrat, sans-serif",
                  shadow: "none",
                  size: 12,
                  weight: 400
                }
              },
              type: "surface",
              x: xdata,
              y: ydata,
              z: zdata
            }
          ]}
          layout={{
            autosize: true,
            font: { family: "Montserrat, sans-serif" },
            margin: { b: 15, l: 15, r: 15, t: 15 },
            paper_bgcolor: "transparent",
            scene: {
              camera: { eye: { x: 2 } },
              xaxis: {
                color: theme.palette.text.primary,
                exponentformat: "E",
                gridcolor: theme.palette.divider,
                showgrid: showGrid,
                tickangle: 45,
                title: { font: { size: 12 }, text: wrappedLabel.x }
              },
              yaxis: {
                color: theme.palette.text.primary,
                exponentformat: "E",
                gridcolor: theme.palette.divider,
                showgrid: showGrid,
                tickangle: -45,
                title: { font: { size: 12 }, text: wrappedLabel.y }
              },
              zaxis: {
                color: theme.palette.text.primary,
                exponentformat: "E",
                gridcolor: theme.palette.divider,
                showgrid: showGrid,
                title: { font: { size: 12 }, text: wrappedLabel.z }
              }
            }
          }}
          style={{ flexGrow: 1, height: "100%", width: "100%" }}
          useResizeHandler={true}
          config={config}
        />
      </Box>
    </ConditionalDialog>
  );
};

export default SurfacePlot;
