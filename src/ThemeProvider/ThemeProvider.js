import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// custom material-ui theme
const theme = createMuiTheme({
  palette: {
    primary: { main: "#005FA8" },
    secondary: { main: "#003063" },
    action: {
      selected: "rgba(0, 95, 168, 0.08)"
    }
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "14px",
        fontWeight: "normal"
      }
    },
    MuiToggleButton: {
      root: {
        "&$selected": {
          backgroundColor: "rgba(0, 95, 168, 0.08)",
          "&:hover": {
            backgroundColor: "rgba(0, 95, 168, 0.06)"
          }
        },
        "&:hover": {
          backgroundColor: "rgba(0, 95, 168, 0.04)"
        }
      }
    },
    MuiTableRow: {
      root: {
        "&$selected": {
          backgroundColor: "rgba(0, 95, 168, 0.08)"
        }
      }
    }
  }
});

/**
 * IPG Material-ui theme provider
 */
export default function ThemeProvider({ children }) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

// prop types
ThemeProvider.propTypes = {
  children: PropTypes.node
};
