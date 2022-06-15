/* eslint-disable no-undef */
import {
  ThemeProvider as MuiThemeProvider,
  createTheme
} from "@mui/material/styles";
import React, { useEffect } from "react";

import PropTypes from "prop-types";
import ThemeContext from "./ThemeContext";

// custom material-ui theme for light mode
const lightTheme = createTheme({
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
  palette: {
    mode: "dark"
  }
});

/**
 * IPG Material-ui theme provider
 */
export default function ThemeProvider({ children }) {
  // theme state
  const [theme, setTheme] = React.useState("light");

  useEffect(() => {
    // get theme mode from local storage or set default to light
    const storedThemeMode = localStorage.getItem("theme");
    if (storedThemeMode) {
      setTheme(storedThemeMode);
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }, []);

  console.log(theme);

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
