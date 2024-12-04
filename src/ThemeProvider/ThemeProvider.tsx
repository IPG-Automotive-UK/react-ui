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

// theme defaults regardless of color mode. these are provided as an object that can be merged during color mode theme creation
// const defaultTheme: ThemeOptions = {
//   components: {
//     MuiAccordionSummary: {
//       styleOverrides: {
//         root: {
//           "&$expanded": {
//             marginBottom: -20
//           }
//         }
//       }
//     },
//     MuiDataGrid: {
//       styleOverrides: {
//         root: {
//           "& .MuiDataGrid-cell:focus, .MuiDataGrid-cell:focus-within, .MuiDataGrid-columnHeader:focus, .MuiDataGrid-columnHeader:focus-within":
//             {
//               outline: "none"
//             }
//         }
//       }
//     },
//     MuiFormLabel: {
//       styleOverrides: {
//         asterisk: {
//           color: "#d32f2f"
//         }
//       }
//     },
//     MuiTooltip: {
//       styleOverrides: {
//         tooltip: {
//           fontSize: "12px",
//           fontWeight: "normal"
//         }
//       }
//     }
//   },
//   layout: {
//     content: {
//       maxWidth: 1152
//     }
//   },
//   mixins: {
//     toolbar: {
//       minHeight: 64
//     }
//   },
//   typography: {
//     fontFamily: "Montserrat"
//   }
// };

// // custom material-ui theme for light mode
// const lightTheme = createTheme(
//   {
//     components: {
//       MuiCssBaseline: {
//         styleOverrides: themeParam => ({
//           body: {
//             ...darkScrollbar(
//               themeParam.palette.mode === "light"
//                 ? {
//                     active: grey[400],
//                     thumb: grey[400],
//                     track: grey[200]
//                   }
//                 : undefined
//             )
//           }
//         })
//       },
//       MuiDataGrid: {
//         styleOverrides: {
//           footerContainer: {
//             backgroundColor: "#fff"
//           },
//           main: {
//             backgroundColor: "#fff"
//           }
//         }
//       },
//       MuiIconButton: { styleOverrides: { root: { color: "#9e9e9e" } } },
//       MuiStepper: {
//         styleOverrides: {
//           root: {
//             backgroundColor: "rgba(144, 202, 249, 0.08)"
//           }
//         }
//       },
//       MuiTableRow: {
//         styleOverrides: {
//           root: {
//             "&$selected": {
//               backgroundColor: "rgba(0, 95, 168, 0.08)"
//             }
//           }
//         }
//       },
//       MuiToggleButton: {
//         styleOverrides: {
//           root: {
//             "&$selected": {
//               "&:hover": {
//                 backgroundColor: "rgba(0, 95, 168, 0.15)"
//               },
//               backgroundColor: "rgba(0, 95, 168, 0.08)"
//             },
//             "&:hover": {
//               backgroundColor: "rgba(0, 95, 168, 0.15)"
//             },
//             borderColor: "rgb(196, 196, 196)"
//           }
//         }
//       }
//     },
//     // cssVariables: true,
//     mixins: {
//       MuiDataGrid: {
//         containerBackground: "#fff",
//         pinnedBackground: "#fff"
//       }
//     },
//     palette: {
//       action: {
//         selected: "rgba(0, 95, 168, 0.08)"
//       },
//       background: {
//         default: "rgb(250, 250, 250)"
//       },
//       primary: { main: "#003063" },
//       secondary: { main: "#005FA8" }
//     },
//     typography: {
//       allVariants: {
//         fontFamily: "Montserrat"
//       }
//     }
//   },
//   defaultTheme
// );

// // custom theme for dark mode
// const darkTheme = createTheme(
//   {
//     // colorSchemes: { dark: true },
//     components: {
//       MuiAlertTitle: {
//         styleOverrides: {
//           root: {
//             color: "inherit"
//           }
//         }
//       },
//       MuiCssBaseline: {
//         styleOverrides: themeParam => ({
//           body: themeParam.palette.mode === "dark" ? darkScrollbar() : null
//         })
//       },
//       MuiDataGrid: {
//         styleOverrides: {
//           footerContainer: {
//             backgroundColor: "#000"
//           },
//           main: {
//             backgroundColor: "#000"
//           }
//         }
//       },
//       MuiStepper: {
//         styleOverrides: {
//           root: {
//             backgroundColor: "rgba(255, 255, 255, 0.08)"
//           }
//         }
//       }
//     },
//     // cssVariables: true,
//     mixins: {
//       MuiDataGrid: {
//         containerBackground: "#000",
//         pinnedBackground: "#000"
//       }
//     },
//     palette: {
//       background: {
//         default: "#121212"
//       },
//       mode: "dark",
//       primary: { main: "#87A5D2" }
//     },
//     typography: {
//       allVariants: {
//         color: "#fff",
//         fontFamily: "Montserrat"
//       }
//     }
//   },
//   defaultTheme
// );

const mainTheme: ThemeOptions = {
  colorSchemes: {
    dark: {
      components: {
        MuiCssBaseline: {
          styleOverrides: theme => ({
            body: darkScrollbar()
          })
        },
        MuiDataGrid: {
          styleOverrides: {
            footerContainer: {
              backgroundColor: "#000"
            },
            main: {
              backgroundColor: "#000"
            }
          }
        }
      },
      mixins: {
        toolbar: {
          minHeight: 64
        }
      },
      palette: {
        background: { default: "#121212" },
        mode: "dark",
        primary: { main: "#87A5D2" }
      },
      typography: {
        allVariants: {
          color: "#fff",
          fontFamily: "Montserrat"
        },
        fontFamily: "Montserrat"
      }
    },
    light: {
      components: {
        MuiCssBaseline: {
          styleOverrides: theme => ({
            body: darkScrollbar({
              active: grey[400],
              thumb: grey[400],
              track: grey[200]
            })
          })
        },
        MuiDataGrid: {
          styleOverrides: {
            footerContainer: {
              backgroundColor: "#fff"
            },
            main: {
              backgroundColor: "#fff"
            }
          }
        },
        MuiToggleButton: {
          styleOverrides: {
            root: {
              borderColor: "rgb(196, 196, 196)",
              "&:hover": {
                backgroundColor: "rgba(0, 95, 168, 0.15)"
              },
              "&$selected": {
                backgroundColor: "rgba(0, 95, 168, 0.08)",
                "&:hover": {
                  backgroundColor: "rgba(0, 95, 168, 0.15)"
                }
              }
            }
          }
        }
      },
      mixins: {
        toolbar: {
          minHeight: 64
        }
      },
      palette: {
        action: {
          selected: "rgba(0, 95, 168, 0.08)"
        },
        background: { default: "rgb(250, 250, 250)" },
        mode: "light",
        primary: { main: "#003063" },
        secondary: { main: "#005FA8" }
      },
      typography: {
        allVariants: {
          fontFamily: "Montserrat"
        },
        fontFamily: "Montserrat"
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
  }
};

const mainThemeWithColorSchemes = createTheme({
  // cssVariables: true,
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

function ChildWrapper({
  children,
  theme: controlledTheme
}: ThemeProviderProps) {
  const { mode, setMode } = useColorScheme();
  useEffect(() => {
    if (controlledTheme && mode !== controlledTheme) {
      setMode(controlledTheme);
    }
  }, [controlledTheme]);
  return children;
}

// prop types
ThemeProvider.propTypes = {
  children: PropTypes.node
};
