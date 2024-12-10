/* eslint-disable no-undef */

import type {} from "@mui/x-data-grid/themeAugmentation";

import {
  ThemeProvider as MuiThemeProvider,
  ThemeOptions,
  createTheme,
  useColorScheme
} from "@mui/material/styles";
import React, { useEffect } from "react";

import PropTypes from "prop-types";
import { ThemeProviderProps } from "./ThemeProvider.types";
import darkScrollbar from "@mui/material/darkScrollbar";

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
  interface Theme {
    colorSchemes: {
      light: ThemeOptions;
      dark: ThemeOptions;
    };
  }
  interface ThemeOptions {
    colorSchemes?: {
      light?: ThemeOptions;
      dark?: ThemeOptions;
    };
  }
}

// Define the main theme
const mainTheme: ThemeOptions = {
  colorSchemes: {
    dark: {
      components: {
        MuiAlertTitle: {
          styleOverrides: {
            root: {
              color: "inherit"
            }
          }
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              "--ipg-rui-palette-AppBar-darkBg": "#87a5d2"
            }
          }
        },
        MuiCssBaseline: {
          styleOverrides: {
            body: darkScrollbar()
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
        primary: { main: "#87A5D2" }
      }
    },
    light: {
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: darkScrollbar({
              active: `var(--ipg-rui-palette-grey-400)`,
              thumb: `var(--ipg-rui-palette-grey-400)`,
              track: `var(--ipg-rui-palette-grey-200)`
            })
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
              borderColor: "rgb(196, 196, 196)"
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
      }
    }
  },
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
    MuiDataGrid: {
      styleOverrides: {
        footerContainer: {
          backgroundColor: `var(--ipg-rui-palette-common-background)`
        },
        main: {
          backgroundColor: `var(--ipg-rui-palette-common-background)`
        },
        root: {
          "& .MuiDataGrid-cell:focus, .MuiDataGrid-cell:focus-within, .MuiDataGrid-columnHeader:focus, .MuiDataGrid-columnHeader:focus-within":
            {
              outline: "none"
            }
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#d32f2f"
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "12px",
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
  mixins: {
    toolbar: {
      minHeight: 64
    }
  },
  typography: {
    allVariants: {
      color: `var(--ipg-rui-palette-text-primary)`
    },
    fontFamily: "Montserrat"
  }
};

// create the main theme with color schemes
const mainThemeWithColorSchemes = createTheme({
  cssVariables: {
    colorSchemeSelector: "data",
    cssVarPrefix: "ipg-rui"
  },
  ...mainTheme
});

/**
 * IPG Material-ui theme provider and hook.
 */
export default function ThemeProvider({
  children,
  theme: controlledTheme
}: ThemeProviderProps) {
  // wrap mui theme provider and children in theme context
  return (
    <MuiThemeProvider theme={mainThemeWithColorSchemes}>
      <ChildWrapper theme={controlledTheme}>{children}</ChildWrapper>
    </MuiThemeProvider>
  );
}

/**
 * Child wrapper to handle controlled theme changes
 */
function ChildWrapper({
  children,
  theme: controlledTheme
}: ThemeProviderProps) {
  // get the current theme mode
  const { mode, setMode } = useColorScheme();

  // update the theme mode when the controlled theme changes
  useEffect(() => {
    if (controlledTheme && mode !== controlledTheme) {
      setMode(controlledTheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledTheme]);
  return children;
}

// prop types
ThemeProvider.propTypes = {
  children: PropTypes.node
};
