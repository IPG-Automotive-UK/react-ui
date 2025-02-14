import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  useTheme
} from "@mui/material";
import {
  ConditionalDialogProps,
  ConfigProps,
  LinePlotProps
} from "./LinePlot.types";
import React, { useEffect, useRef, useState } from "react";

import DialogTitle from "../DialogTitle";
import Plotly from "react-plotly.js";

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

  // ref to get the size of the plot div for axis labels wrapping and resizing plot on window resize event listener
  const plotRef = useRef<HTMLDivElement>(null);

  // state to keep track of the size of the plot div
  const [axisSize, setAxisSize] = useState({ height: 300, width: 400 });

  // state to keep track of whether the plot is in fullscreen mode
  const [isFullscreen, setIsFullscreen] = useState(false);

  // effect to update the size of the plot div on window resize
  useEffect(() => {
    const updateSize = () => {
      // if plotRef is not set, return early to avoid errors
      if (!plotRef.current) return;
      // get the bounding box of the plot div and set the axis size state
      const boundingBox = plotRef.current.getBoundingClientRect();
      setAxisSize({ height: boundingBox.height, width: boundingBox.width });
    };
    // add event listener for window resize event and call updateSize on mount
    updateSize();
    window.addEventListener("resize", updateSize);
    // cleanup event listener on unmount and resize
    return () => window.removeEventListener("resize", updateSize);
  });

  // helper function to get the maximum number of characters that can fit in the axis label
  const getMaxChars = (axisLength: number) => Math.floor(axisLength / 7);

  // helper function to wrap text in axis labels
  const wrapText = (text: string, maxCharsPerLine: number) => {
    // if text is less than or equal to the max characters per line, return text
    if (text.length <= maxCharsPerLine) return text;
    // split text into words
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    // loop through words and add them to lines
    words.forEach(word => {
      if ((currentLine + " " + word).trim().length > maxCharsPerLine) {
        lines.push(currentLine.trim());
        currentLine = word;
      } else {
        currentLine += " " + word;
      }
    });

    lines.push(currentLine.trim());
    return lines.join("<br>");
  };

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
        ref={plotRef}
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
              line: { color: theme.palette.primary.main, width: 2 },
              marker: { color: theme.palette.primary.dark, size: 7 },
              mode: showMarkers ? "lines+markers" : "lines",
              type: "scatter",
              x: xdata,
              y: ydata
            }
          ]}
          layout={{
            autosize: true,
            font: { family: "Montserrat, sans-serif" },
            margin: { b: 60, l: 100, r: 10, t: 30 },
            paper_bgcolor: "transparent",
            plot_bgcolor: "transparent",
            xaxis: {
              color: theme.palette.text.primary,
              showgrid: showGrid,
              title: {
                font: { size: 12 },
                standoff: 20,
                text: wrapText(xlabel, getMaxChars(axisSize.width))
              }
            },
            yaxis: {
              color: theme.palette.text.primary,
              showgrid: showGrid,
              title: {
                font: { size: 12 },
                standoff: 40,
                text: wrapText(ylabel, getMaxChars(axisSize.height))
              }
            }
          }}
          useResizeHandler={true}
          style={{ flexGrow: 1, height: "100%", width: "100%" }}
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

/**
 * Returns children in a fullscreen dialog if condition is true, otherwise just returns children
 */
const ConditionalDialog = ({
  condition,
  onClose,
  children,
  dialogTitle
}: ConditionalDialogProps) => {
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
};
