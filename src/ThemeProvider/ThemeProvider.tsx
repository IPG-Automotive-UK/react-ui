import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  useColorScheme
} from "@mui/material/styles";
import React, { useEffect } from "react";

import { ThemeProviderProps } from "./ThemeProvider.types";
import { darkScrollbar } from "@mui/material";

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
// const paletteTooltipColor = "#3C4F67";

// // datagrid dark mode border color
// const dataGridDarkBorderColor = "#343F4B";

export const theme = createTheme({
  colorSchemes: {
    dark: {
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
      palette: {
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
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.MuiButton-containedPrimary": {
            "&.Mui-disabled": {
              color: `${theme.vars.palette.text.disabled} !important`
            },
            color: theme.vars.palette.background.default
          }
        })
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          ...darkScrollbar()
        },
        "html[data-color-scheme='light'] body": darkScrollbar({
          active: "red",
          thumb: "blue",
          track: "green"
        })
      }
    }
  },
  cssVariables: {
    colorSchemeSelector: "data",
    cssVarPrefix: "ipg"
  }
});

export default function ThemeProvider({
  children,
  theme: controlledTheme
}: ThemeProviderProps) {
  // wrap mui theme provider and children in theme context
  return (
    <MuiThemeProvider theme={theme} defaultMode="light">
      <ControlledThemeWrapper theme={controlledTheme}>
        {children}
      </ControlledThemeWrapper>
    </MuiThemeProvider>
  );
}

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

    if (controlledTheme) {
      document.documentElement.setAttribute(
        "data-color-scheme",
        controlledTheme
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledTheme]);

  return children;
}
