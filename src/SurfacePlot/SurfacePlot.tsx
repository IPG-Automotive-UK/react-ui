import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

import ConditionalDialog from "../ConditionalDialog";
import Plotly from "react-plotly.js";
import { SurfacePlotProps } from "./SurfacePlot.types";
import { getConfig } from "../utils/plotlyConfig";

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

  // state to keep track of whether the plot is in fullscreen mode
  const [isFullscreen, setIsFullscreen] = useState(false);

  // state to keep track of the wrapped axis labels for the plot
  const [wrappedXLabel, setWrappedXLabel] = useState(xlabel);
  const [wrappedYLabel, setWrappedYLabel] = useState(ylabel);
  const [wrappedZLabel, setWrappedZLabel] = useState(zlabel);

  // helper function to wrap text in axis labels
  const wrapText = (text: string, maxLength: number) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    const matches = text.match(new RegExp(`.{1,${maxLength}}`, "g"));
    return matches ? matches.join("<br>") : text;
  };

  // effect to wrap axis labels when the axis labels change
  useEffect(() => {
    const maxWidth = Math.max(window.innerWidth * 0.1, 50);
    const maxLabelLength = Math.floor(maxWidth / 6);
    setWrappedXLabel(wrapText(xlabel, maxLabelLength));
    setWrappedYLabel(wrapText(ylabel, maxLabelLength));
    setWrappedZLabel(wrapText(zlabel, maxLabelLength));
  }, [xlabel, ylabel, zlabel]);

  // event handler to open the plot in fullscreen mode
  const handleClickFullscreen = () => setIsFullscreen(true);
  // event handler to close the plot in fullscreen mode
  const handleClose = () => setIsFullscreen(false);
  // get the plotly config based on the fullscreen state
  const config = getConfig({ handleClickFullscreen, isFullscreen });
  // check if the title is not empty
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
                  weight: 100
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
                gridcolor: theme.palette.divider,
                showgrid: showGrid,
                tickangle: 45,
                title: { font: { size: 12 }, text: wrappedXLabel }
              },
              yaxis: {
                color: theme.palette.text.primary,
                gridcolor: theme.palette.divider,
                showgrid: showGrid,
                tickangle: -45,
                title: { font: { size: 12 }, text: wrappedYLabel }
              },
              zaxis: {
                color: theme.palette.text.primary,
                gridcolor: theme.palette.divider,
                showgrid: showGrid,
                title: { font: { size: 12 }, text: wrappedZLabel }
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
