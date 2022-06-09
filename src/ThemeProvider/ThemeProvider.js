import {
  ThemeProvider as MuiThemeProvider,
  createTheme
} from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

// custom material-ui theme
const LightTheme = createTheme({
  overrides: {
    MuiAccordionSummary: {
      root: {
        "&$expanded": { marginBottom: -20 }
      }
    },
    MuiIconButton: { root: { color: "#9e9e9e" } },
    MuiTableRow: {
      root: {
        "&$selected": {
          backgroundColor: "rgba(0, 95, 168, 0.08)"
        }
      }
    },
    MuiToggleButton: {
      root: {
        "&$selected": {
          "&:hover": {
            backgroundColor: "rgba(0, 95, 168, 0.15)"
          },
          backgroundColor: "rgba(0, 95, 168, 0.08)"
        },
        "&:hover": {
          backgroundColor: "rgba(0, 95, 168, 0.15)"
        },
        "border-color": "rgb(196, 196, 196)"
      }
    },
    MuiTooltip: {
      tooltip: {
        fontSize: "14px",
        fontWeight: "normal"
      }
    }
  },
  palette: {
    action: {
      selected: "rgba(0, 95, 168, 0.08)"
    },
    primary: { main: "#003063" },
    secondary: { main: "#005FA8" }
  }
});

// custom theme for dark mode
const DarkTheme = createTheme({
  overrides: {
    MuiAccordionSummary: {
      root: {
        "&$expanded": { marginBottom: -20 }
      }
    },
    MuiIconButton: { root: { color: "#9e9e9e" } },
    MuiTableRow: {
      root: {
        "&$selected": {
          backgroundColor: "rgba(0, 95, 168, 0.08)"
        }
      }
    },
    MuiToggleButton: {
      root: {
        "&$selected": {
          "&:hover": {
            backgroundColor: "rgba(0, 95, 168, 0.15)"
          },
          backgroundColor: "rgba(0, 95, 168, 0.08)"
        },
        "&:hover": {
          backgroundColor: "rgba(0, 95, 168, 0.15)"
        },
        "border-color": "rgb(196, 196, 196)"
      }
    },
    MuiTooltip: {
      tooltip: {
        fontSize: "14px",
        fontWeight: "normal"
      }
    }
  },
  palette: {
    action: {
      selected: "rgba(0, 95, 168, 0.08)"
    },
    primary: { main: "#ced5db" },
    secondary: { main: "#8bacc4" }
  }
});

/**
 * IPG Material-ui theme provider
 */
export default function ThemeProvider({ children, mode }) {
  return (
    <MuiThemeProvider theme={mode === "light" ? LightTheme : DarkTheme}>
      {children}
    </MuiThemeProvider>
  );
}

// prop types
ThemeProvider.propTypes = {
  children: PropTypes.node
};
