/* eslint-disable no-undef */

import type {} from "@mui/x-data-grid/themeAugmentation";
import type {} from "@mui/material/themeCssVarsAugmentation";

import {
  ThemeProvider as MuiThemeProvider,
  Theme,
  ThemeOptions,
  alpha,
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

// primary main light
const primaryLightMain = "#003063";

// primary main dark
const primaryDarkMain = "#87A5D2";

// secondary main dark
const secondaryDarkMain = "#005FA8";

// palette default background light
const paletteDefaultBackgroundLight = "#fafafa";

// 0.08 % of the primary light main
const primaryLightColor08 = alpha(primaryLightMain, 0.08);

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
  MuiAvatar: {
    styleOverrides: {
      root: {
        fontFamily: "Montserrat, Arial, sans-serif"
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
      footerContainer: ({ theme }: { theme: Theme }) => ({
        backgroundColor: theme.palette.background.paper
      }),
      main: ({ theme }: { theme: Theme }) => ({
        backgroundColor: theme.palette.background.paper
      }),
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
      root: ({ theme }: { theme: Theme }) => ({
        "& .MuiFormLabel-root, .MuiFormHelperText-root ": {
          color: theme.palette.text.secondary
        }
      })
    }
  },
  MuiFormLabel: {
    styleOverrides: {
      asterisk: ({ theme }: { theme: Theme }) => ({
        color: theme.palette.error.main
      })
    }
  },
  MuiStepIcon: {
    styleOverrides: {
      text: {
        fontFamily: "Montserrat, Arial, sans-serif"
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
            root: ({ theme }) => ({
              "--ipg-palette-AppBar-darkBg": theme.palette.primary.main
            })
          }
        },
        MuiAutocomplete: {
          styleOverrides: {
            clearIndicator: ({ theme }) => ({
              color: theme.palette.common.white
            }),
            popupIndicator: ({ theme }) => ({
              color: theme.palette.common.white
            })
          }
        },
        MuiCssBaseline: {
          styleOverrides: {
            body: darkScrollbar()
          }
        },
        MuiStepper: {
          styleOverrides: {
            root: ({ theme }) => ({
              backgroundColor: alpha(theme.palette.primary.main, 0.08)
            })
          }
        }
      },
      palette: {
        primary: { main: primaryDarkMain }
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
            root: ({ theme }) => ({
              backgroundColor: alpha(theme.palette.primary.main, 0.08)
            })
          }
        },
        MuiTableRow: {
          styleOverrides: {
            root: ({ theme }) => ({
              "&$selected": {
                backgroundColor: alpha(theme.palette.primary.main, 0.08)
              }
            })
          }
        }
      },
      palette: {
        action: {
          selected: primaryLightColor08
        },
        background: {
          default: paletteDefaultBackgroundLight
        },
        primary: { main: primaryLightMain },
        secondary: { main: secondaryDarkMain }
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
