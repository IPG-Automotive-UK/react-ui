import { Box, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";

import ConditionalDialog from "../ConditionalDialog";
import Plotly from "react-plotly.js";
import { SurfacePlotProps } from "./SurfacePlot.types";
import { getConfig } from "../utils/plotlyConfig";

// The `SurfacePlot` component renders a 3D surface plot using Plotly.
const SurfacePlot = ({
  xdata = [],
  ydata = [],
  zdata = [],
  xlabel = "",
  ylabel = "",
  zlabel = "",
  title = "",
  showTitle = false,
  minHeight = 400,
  labelFontSize,
  showGrid = true,
  exponentFormat
}: SurfacePlotProps) => {
  // theme hook
  const theme = useTheme();

  // state for fullscreen
  const [isFullscreen, setIsFullscreen] = useState(false);

  // callback for fullscreen button
  const handleClickFullscreen = () => {
    setIsFullscreen(true);
  };

  // callback for closing fullscreen
  const handleClose = () => {
    setIsFullscreen(false);
  };

  // get config for plotly
  const config = getConfig({ handleClickFullscreen, isFullscreen });

  return (
    <ConditionalDialog
      condition={isFullscreen}
      onClose={handleClose}
      title={title}
    >
      <Box
        display="flex"
        flexDirection="column"
        overflow="hidden"
        height="100%"
        width="100%"
      >
        {!isFullscreen && showTitle ? (
          <Typography
            align="center"
            style={{ padding: "0 16px", wordWrap: "break-word" }}
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
                  family: "Montserrat",
                  size: 12
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
            margin: {
              b: 5,
              l: 5,
              r: 5,
              t: 20
            },
            paper_bgcolor: "rgba(0,0,0,0)",
            scene: {
              camera: { eye: { x: 2 } },
              xaxis: {
                color: theme.palette.mode === "light" ? "" : "white",
                exponentformat: exponentFormat,
                gridcolor:
                  theme.palette.mode === "light"
                    ? ""
                    : theme.palette.grey["500"],
                showgrid: showGrid,
                title: {
                  font: {
                    family: "Montserrat",
                    size: labelFontSize || undefined
                  },
                  text: xlabel || ""
                }
              },
              yaxis: {
                color: theme.palette.mode === "light" ? "" : "white",
                exponentformat: exponentFormat,
                gridcolor:
                  theme.palette.mode === "light"
                    ? ""
                    : theme.palette.grey["500"],
                title: {
                  font: {
                    family: "Montserrat",
                    size: labelFontSize || undefined
                  },
                  text: ylabel || ""
                }
              },
              zaxis: {
                color: theme.palette.mode === "light" ? "" : "white",
                exponentformat: exponentFormat,
                gridcolor:
                  theme.palette.mode === "light"
                    ? ""
                    : theme.palette.grey["500"],
                title: {
                  font: {
                    family: "Montserrat",
                    size: labelFontSize || undefined
                  },
                  text: zlabel || ""
                }
              }
            }
          }}
          style={{
            flexGrow: 1,
            fontFamily: "Montserrat",
            height: "100%",
            minHeight,
            width: "100%"
          }}
          useResizeHandler={true}
          config={config}
        />
      </Box>
    </ConditionalDialog>
  );
};

export default SurfacePlot;
