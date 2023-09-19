import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  useTheme
} from "@mui/material";

import { DialogTitle } from "../DialogTitle";
import { LinePlotProps } from "./LinePlot.types";
import Plotly from "react-plotly.js";
import React from "react";

const LinePlot = ({
  title = "",
  xdata = [],
  ydata = [],
  xlabel = "",
  ylabel = "",
  markers = false,
  showTitle = false
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

  return (
    <ConditionalDialog
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
        {showTitle ? (
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
              marker: { color: theme.palette.primary.main, size: 8 },
              mode: markers ? "lines+markers" : "lines",
              type: "scatter",
              x: xdata,
              y: ydata
            }
          ]}
          layout={{
            autosize: true,
            margin: {
              b: 35,
              l: 60,
              r: 10,
              t: 30
            },
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            xaxis: {
              color: theme.palette.mode === "light" ? "" : "white",
              gridcolor:
                theme.palette.mode === "light" ? "" : theme.palette.grey["500"],
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
                theme.palette.mode === "light" ? "" : theme.palette.grey["500"],
              ticksuffix: " ",
              title: {
                font: {
                  family: "Montserrat",
                  size: 12
                },
                text: ylabel || ""
              }
            }
          }}
          style={{ flexGrow: 1, height: "100%", minHeight: 0, width: "100%" }}
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
