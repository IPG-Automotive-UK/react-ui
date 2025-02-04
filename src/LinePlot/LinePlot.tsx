import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  useTheme
} from "@mui/material";

import DialogTitle from "../DialogTitle";
import { LinePlotProps } from "./LinePlot.types";
import Plotly from "react-plotly.js";
import React from "react";

const LinePlot = ({
  fullscreenTitle = "",
  title = "",
  xdata = [],
  ydata = [],
  xlabel = "",
  ylabel = "",
  showMarkers = true,
  showGrid = true
}: LinePlotProps) => {
  // theme hook
  const theme = useTheme();

  // state for fullscreen
  const [isFullscreen, setIsFullscreen] = React.useState(false);

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

  // determine whether to show plot title
  const showTitle = title !== "";

  return (
    <ConditionalDialog
      condition={isFullscreen}
      onClose={handleClose}
      dialogTitle={fullscreenTitle}
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
            style={{ padding: "0 16px", wordWrap: "break-word" }}
          >
            {title || ""}
          </Typography>
        ) : null}
        <Plotly
          data={[
            {
              line: {
                color: theme.palette.primary.main,
                width: 2
              },
              marker: { color: theme.palette.primary.dark, size: 7 },
              mode: showMarkers ? "lines+markers" : "lines",
              type: "scatter",
              x: xdata,
              y: ydata
            }
          ]}
          layout={{
            autosize: true,
            font: {
              family: "Montserrat, sans-serif"
            },
            margin: { b: 35, l: 80, r: 10, t: 30 },
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",
            xaxis: {
              color: theme.palette.text.primary,
              exponentformat: "E",
              gridcolor: theme.palette.divider,
              showgrid: showGrid,
              title: {
                font: {
                  size: 12
                },
                text: xlabel || ""
              }
            },
            yaxis: {
              color: theme.palette.text.primary,
              exponentformat: "E",
              gridcolor: theme.palette.divider,
              showgrid: showGrid,
              ticksuffix: " ",
              title: {
                font: {
                  size: 12
                },
                text: ylabel || ""
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

export default LinePlot;

// svg path for fullscreen icon in plotly menu bar
const fullscreenIcon = {
  height: 1792,
  path: "M256 1408h1280v-768h-1280v768zm1536-1120v1216q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1472q66 0 113 47t47 113z",
  width: 1792
};

type ConfigProps = {
  isFullscreen: boolean;
  handleClickFullscreen: () => void;
};

/**
 * Returns a plotly config function with provided callback for clicking fullscreen
 */
const getConfig = ({ isFullscreen, handleClickFullscreen }: ConfigProps) => {
  return {
    displaylogo: false, // never display plotly logo
    modeBarButtonsToAdd: !isFullscreen // if we are not in full screen, show a button to launch to fullscreen
      ? [
          {
            click: handleClickFullscreen,
            direction: "up",
            icon: fullscreenIcon,
            name: "Fullscreen",
            title: "Fullscreen"
          }
        ]
      : []
  };
};

type ConditionalDialogProps = {
  condition: boolean;
  onClose: () => void;
  children: React.ReactNode;
  dialogTitle?: string;
};

/**
 * Returns children in a fullscreen dialog if condition is true, otherwise just returns children
 */
function ConditionalDialog({
  condition,
  onClose,
  children,
  dialogTitle
}: ConditionalDialogProps) {
  if (condition) {
    return (
      <Dialog maxWidth="xl" fullWidth open>
        <DialogTitle onClose={onClose}>
          <Box sx={dialogTitle ? {} : { p: 2 }}>{dialogTitle}</Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box style={{ height: "calc(100vh - 168px)" }}>{children}</Box>
        </DialogContent>
      </Dialog>
    );
  } else {
    return children;
  }
}
