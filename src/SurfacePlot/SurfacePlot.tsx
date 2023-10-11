import { Box, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";

import FullScreenDialog from "../FullScreenDialog";
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
  markers = false,
  showTitle = false
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
    <FullScreenDialog
      condition={isFullscreen}
      onClose={handleClose}
      dialogTitle={title}
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
              mode: markers ? "lines+markers" : "lines",
              type: "surface",
              x: xdata,
              y: ydata,
              z: zdata
            }
          ]}
          layout={{
            autosize: true,
            height: isFullscreen ? 320 : 450,
            margin: {
              pad: 0,
              t: 5
            },
            paper_bgcolor: "rgba(0,0,0,0)",
            scene: {
              xaxis: {
                color: theme.palette.mode === "light" ? "" : "white",
                gridcolor:
                  theme.palette.mode === "light"
                    ? ""
                    : theme.palette.grey["500"],
                showgrid: false,
                title: {
                  font: {
                    family: "Montserrat",
                    size: 12
                  },
                  text: xlabel || ""
                }
              },
              yaxis: {
                color: theme.palette.mode === "light" ? "" : "white",
                gridcolor:
                  theme.palette.mode === "light"
                    ? ""
                    : theme.palette.grey["500"],
                title: {
                  font: {
                    family: "Montserrat",
                    size: 12
                  },
                  text: ylabel || ""
                }
              },
              zaxis: {
                color: theme.palette.mode === "light" ? "" : "white",
                gridcolor:
                  theme.palette.mode === "light"
                    ? ""
                    : theme.palette.grey["500"],
                title: {
                  font: {
                    family: "Montserrat",
                    size: 12
                  },
                  text: zlabel || ""
                }
              }
            }
          }}
          style={{ flexGrow: 1, height: "100%", minHeight: 0, width: "100%" }}
          useResizeHandler={true}
          config={config}
        />
      </Box>
    </FullScreenDialog>
  );
};

export default SurfacePlot;
