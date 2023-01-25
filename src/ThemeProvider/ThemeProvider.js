/* eslint-disable no-undef */
import {
  ThemeProvider as MuiThemeProvider,
  createTheme
} from "@mui/material/styles";
import React, { useEffect } from "react";

import PropTypes from "prop-types";
import ThemeContext from "./ThemeContext";
import darkScrollbar from "@mui/material/darkScrollbar";
import { grey } from "@mui/material/colors";

// custom material-ui theme for light mode
const lightTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: themeParam => ({
        body: {
          ...darkScrollbar(
            themeParam.palette.mode === "light"
              ? {
                  active: grey[400],
                  thumb: grey[400],
                  track: grey[200]
                }
              : undefined
          )
        }
      })
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(144, 202, 249, 0.08)"
        }
      }
    }
  },
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
const darkTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: themeParam => ({
        body: themeParam.palette.mode === "dark" ? darkScrollbar() : null
      })
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.08)"
        }
      }
    }
  },
  palette: {
    mode: "dark"
  }
});

/**
 * IPG Material-ui theme provider and hook.
 */
export default function ThemeProvider({
  children,
  theme: controlledTheme = "light"
}) {
  // theme state
  const [theme, setTheme] = React.useState(controlledTheme);

  // on first render get theme from local storage or set default to light if not set
  useEffect(() => {
    const storedThemeMode = localStorage.getItem("theme");
    if (storedThemeMode) {
      setTheme(storedThemeMode);
    } else {
      setTheme(controlledTheme);
      localStorage.setItem("theme", controlledTheme);
    }
  }, [controlledTheme]);

  useEffect(() => {
    if (theme !== controlledTheme) {
      setTheme(controlledTheme);
    }
  }, [controlledTheme, theme]);

  // on theme change update local storage
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // define context value
  const value = [theme, setTheme];

  // wrap mui theme provider and children in theme context
  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

// prop types
ThemeProvider.propTypes = {
  children: PropTypes.node
};
