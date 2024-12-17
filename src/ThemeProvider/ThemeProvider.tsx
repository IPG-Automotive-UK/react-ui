/* eslint-disable no-undef */

import type {} from "@mui/x-data-grid/themeAugmentation";
import type {} from "@mui/material/themeCssVarsAugmentation";

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
  // allow configuration using `createTheme`
  // eslint-disable-next-line no-unused-vars
  interface ThemeOptions {
    layout?: {
      content?: {
        maxWidth?: number;
      };
    };
    colorSchemes?: {
      dark?: ThemeOptions;
      light?: ThemeOptions;
    };
  }
  // eslint-disable-next-line no-unused-vars
  interface Theme {
    layout: {
      content: {
        maxWidth: number;
      };
    };
    colorSchemes?: {
      dark?: ThemeOptions;
      light?: ThemeOptions;
    };
  }
}

// Define default components
const defaultComponents = {
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        "&$expanded": {
          marginBottom: -20
        }
      }
    }
  },
  MuiChip: {
    styleOverrides: {
      root: {
        fontFamily: "Montserrat, Arial, sans-serif"
      }
    }
  },
  MuiDataGrid: {
    styleOverrides: {
      footerContainer: {
        backgroundColor: `var(--ipg-palette-common-background)`
      },
      main: {
        backgroundColor: `var(--ipg-palette-common-background)`
      },
      root: {
        "& .MuiDataGrid-cell:focus, .MuiDataGrid-cell:focus-within, .MuiDataGrid-columnHeader:focus, .MuiDataGrid-columnHeader:focus-within":
          {
            outline: "none"
          }
      }
    }
  },
  MuiFormControl: {
    styleOverrides: {
      root: {
        "& .MuiFormLabel-root, .MuiFormHelperText-root ": {
          color: "var(--ipg-palette-text-secondary)"
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
        fontFamily: "Montserrat, Arial, sans-serif",
        fontSize: "12px",
        fontWeight: 400
      }
    }
  }
};

// Define the main theme
const mainTheme: ThemeOptions = {
  colorSchemes: {
    dark: {
      components: {
        ...defaultComponents,
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
              "--ipg-palette-AppBar-darkBg": "#87a5d2"
            }
          }
        },
        MuiAutocomplete: {
          styleOverrides: {
            clearIndicator: {
              color: "#ffffff"
            },
            popupIndicator: {
              color: "#ffffff"
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
        ...defaultComponents,
        MuiCssBaseline: {
          styleOverrides: {
            body: darkScrollbar({
              active: `var(--ipg-palette-grey-400)`,
              thumb: `var(--ipg-palette-grey-400)`,
              track: `var(--ipg-palette-grey-200)`
            })
          }
        },
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
              }
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
      color: `var(--ipg-palette-text-primary)`,
      fontFamily: "Montserrat, Arial, sans-serif"
    }
  }
};

// create the main theme with color schemes
const mainThemeWithColorSchemes = createTheme({
  cssVariables: {
    colorSchemeSelector: "data",
    cssVarPrefix: "ipg"
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
    <MuiThemeProvider theme={mainThemeWithColorSchemes} defaultMode="light">
      <ControlledThemeWrapper theme={controlledTheme}>
        {children}
      </ControlledThemeWrapper>
    </MuiThemeProvider>
  );
}

/**
 * ControlledThemeWrapper Component
 *
 * This component is used to enforce a specific theme mode (`light` or `dark`)
 * for its child components based on the `controlledTheme` prop. It synchronizes
 * the theme mode with the provided value and ensures the children use the correct
 * theme. The wrapper relies on MuI's `useColorScheme` hook for theme mode management.
 *
 * @param props.children - The child components to render inside the wrapper.
 * @param props.theme - The desired theme mode (`light` or `dark`) to enforce.
 *
 * @returns The wrapped children with the enforced theme mode.
 */
function ControlledThemeWrapper({
  children,
  theme: controlledTheme
}: ThemeProviderProps) {
  // use hook from MUI to get and set the theme mode
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
