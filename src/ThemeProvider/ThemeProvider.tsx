/* eslint-disable no-undef */

import type {} from "@mui/x-data-grid/themeAugmentation";
import type {} from "@mui/material/themeCssVarsAugmentation";

import { MuiTheme, ThemeProviderProps } from "./ThemeProvider.types";
import {
  ThemeProvider as MuiThemeProvider,
  ThemeOptions,
  alpha,
  createTheme,
  useColorScheme
} from "@mui/material/styles";
import React, { useEffect } from "react";

import PropTypes from "prop-types";
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
const primaryLightMain = "#3D5A75";

// primary main dark
const primaryDarkMain = "#5E8AB4";

// primary light light
const primaryLightLight = "#637B90";

// primary light dark
const primaryLightDark = "#2A3E51";

// primary dark light
const primaryDarkLight = "#7EA1C3";

// primary dark dark
const primaryDarkDark = "#41607D";

// secondary main light and secondary main dark
const secondaryColorMain = "#FFAF2C";

// secondary light light and secondary light dark
const secondaryColorLight = "#FFBF56";

// secondary dark light and secondary dark dark
const secondaryColorDark = "#B27A1E";

// palette default background light
const paletteDefaultBackgroundLight = "#FAFAFA";

// palette default background dark
const paletteDefaultBackgroundDark = "#121B24";

// palette default background paper light
const paletteDefaultBackgroundPaperLight = "#FFFFFF";

// palette default background paper dark
const paletteDefaultBackgroundPaperDark = "#182533";

// palette tooltip color light mode or dark mode
const paletteTooltipColor = "#3C4F67";

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
  MuiBadge: {
    styleOverrides: {
      badge: {
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
      footerContainer: ({ theme }: MuiTheme) => ({
        backgroundColor: theme.palette.background.paper
      }),
      main: ({ theme }: MuiTheme) => ({
        backgroundColor: theme.palette.background.paper
      }),
      root: ({ theme }: MuiTheme) => ({
        "& .MuiDataGrid-cell:focus, .MuiDataGrid-cell:focus-within, .MuiDataGrid-columnHeader:focus, .MuiDataGrid-columnHeader:focus-within":
          {
            outline: "none"
          },
        "& .MuiDataGrid-container--top [role='row'], & .MuiDataGrid-container--bottom [role='row']":
          {
            backgroundColor: theme.palette.background.paper
          }
      })
    }
  },
  MuiFormLabel: {
    styleOverrides: {
      asterisk: ({ theme }: MuiTheme) => ({
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
        background: paletteTooltipColor,
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
              "--Paper-overlay": "none !important",
              backgroundColor: paletteDefaultBackgroundPaperDark
            }
          }
        },
        MuiButton: {
          styleOverrides: {
            root: ({ theme }) => ({
              "&.MuiButton-containedPrimary": {
                "&.Mui-disabled": {
                  color: `${theme.palette.text.disabled} !important`
                },
                color: theme.palette.background.default
              }
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
        },
        MuiTableCell: {
          styleOverrides: {
            root: ({ theme }) => ({
              "&.MuiTableCell-head": {
                backgroundColor: paletteDefaultBackgroundPaperDark
              }
            })
          }
        }
      },
      palette: {
        background: {
          default: paletteDefaultBackgroundDark,
          paper: paletteDefaultBackgroundPaperDark
        },
        primary: {
          dark: primaryDarkDark,
          light: primaryDarkLight,
          main: primaryDarkMain
        },
        secondary: {
          dark: secondaryColorDark,
          light: secondaryColorLight,
          main: secondaryColorMain
        }
      }
    },
    light: {
      components: {
        ...defaultComponents,
        MuiAppBar: {
          styleOverrides: {
            root: {
              "--Paper-overlay": "none !important",
              backgroundColor: paletteDefaultBackgroundPaperLight
            }
          }
        },
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
          default: paletteDefaultBackgroundLight,
          paper: paletteDefaultBackgroundPaperLight
        },
        primary: {
          dark: primaryLightDark,
          light: primaryLightLight,
          main: primaryLightMain
        },
        secondary: {
          dark: secondaryColorDark,
          light: secondaryColorLight,
          main: secondaryColorMain
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
      fontFamily: "Montserrat, Arial, sans-serif"
    }
  }
};

// create the main theme with color schemes
export const theme = createTheme({
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
    <MuiThemeProvider theme={theme}>
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
