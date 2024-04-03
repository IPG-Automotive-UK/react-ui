/* eslint-disable no-undef */

import type {} from "@mui/x-data-grid/themeAugmentation";

import {
  ThemeProvider as MuiThemeProvider,
  ThemeOptions,
  createTheme
} from "@mui/material/styles";
import React, { useEffect } from "react";

import PropTypes from "prop-types";
import ThemeContext from "./ThemeContext";
import { ThemeProviderProps } from "./ThemeProvider.types";
import darkScrollbar from "@mui/material/darkScrollbar";
import { grey } from "@mui/material/colors";

// extend the theme to include custom properties
// https://mui.com/material-ui/customization/theming/#custom-variables
declare module "@mui/material/styles" {
  // eslint-disable-next-line no-unused-vars
  interface Theme {
    layout: {
      content: {
        maxWidth: number;
      };
    };
  }
  // allow configuration using `createTheme`
  // eslint-disable-next-line no-unused-vars
  interface ThemeOptions {
    layout?: {
      content?: {
        maxWidth?: number;
      };
    };
  }
}

// theme defaults regardless of color mode. these are provided as an object that can be merged during color mode theme creation
const defaultTheme: ThemeOptions = {
  components: {
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          "&$expanded": {
            marginBottom: -20
          }
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "14px",
          fontWeight: "normal"
        }
      }
    }
  },
  layout: {
    content: {
      maxWidth: 1152
    }
  },
  typography: {
    fontFamily: "Montserrat"
  }
};

// custom material-ui theme for light mode
const lightTheme = createTheme(
  {
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
      MuiDataGrid: {
        styleOverrides: {
          root: {
            background: "#fff"
          },
          columnHeader: {
            background: "#fff"
          },
          scrollbarFiller: {
            backgroundColor: "#fff"
          }
        }
      },
      MuiIconButton: { styleOverrides: { root: { color: "#9e9e9e" } } },
      MuiStepper: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(144, 202, 249, 0.08)"
          }
        }
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&$selected": {
              backgroundColor: "rgba(0, 95, 168, 0.08)"
            }
          }
        }
      },
      MuiToggleButton: {
        styleOverrides: {
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
        }
      }
    },
    palette: {
      action: {
        selected: "rgba(0, 95, 168, 0.08)"
      },
      background: {
        default: "rgb(250, 250, 250)"
      },
      primary: { main: "#003063" },
      secondary: { main: "#005FA8" }
    },
    typography: {
      allVariants: {
        fontFamily: "Montserrat"
      }
    }
  },
  defaultTheme
);

// custom theme for dark mode
const darkTheme = createTheme(
  {
    components: {
      MuiAlertTitle: {
        styleOverrides: {
          root: {
            color: "inherit"
          }
        }
      },
      MuiCssBaseline: {
        styleOverrides: themeParam => ({
          body: themeParam.palette.mode === "dark" ? darkScrollbar() : null
        })
      },

      MuiDataGrid: {
        styleOverrides: {
          root: {
            background: "#121212"
          },
          columnHeader: {
            background: "#121212"
          },
          scrollbarFiller: {
            backgroundColor: "#121212"
          }
        }
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
      background: {
        default: "#121212"
      },
      mode: "dark",
      primary: { main: "#87A5D2" }
    },
    typography: {
      allVariants: {
        color: "#fff",
        fontFamily: "Montserrat"
      }
    }
  },
  defaultTheme
);

/**
 * IPG Material-ui theme provider and hook.
 */
export default function ThemeProvider({
  children,
  theme: controlledTheme
}: ThemeProviderProps) {
  // theme state
  const [theme, setTheme] = React.useState("light");

  // effect to set the theme on mount
  useEffect(() => {
    // theme preference is decided in the following order:
    // 1. controlled theme prop
    // 2. local storage
    // 3. default to light
    const storedThemeMode = localStorage.getItem("theme");
    if (controlledTheme !== undefined) {
      setTheme(controlledTheme);
    } else if (storedThemeMode !== null) {
      setTheme(storedThemeMode);
    } else {
      setTheme("light");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // effect to update theme when controlled theme prop changes
  useEffect(() => {
    if (controlledTheme && theme !== controlledTheme) {
      setTheme(controlledTheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledTheme]);

  // effect to update local storage when theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // define context value
  const value = [theme, setTheme] as const;

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
