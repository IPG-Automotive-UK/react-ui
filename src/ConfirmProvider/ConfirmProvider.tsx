import {
  ConfirmOptions,
  ConfirmProvider as MuiConfirmProvider,
  useConfirm
} from "material-ui-confirm";

import type { ConfirmProviderProps } from "./ConfirmProvider.types";
import React from "react";
import { Theme } from "@mui/material/styles";

// component to wrap the app with to provide the confirm dialog
export function ConfirmProvider({ children }: ConfirmProviderProps) {
  const confirmDialogStyle: ConfirmOptions = {
    cancellationButtonProps: {
      sx: {
        color: (theme: Theme) =>
          theme.palette.mode === "light" ? "" : "#87a5d2"
      }
    },
    confirmationButtonProps: {
      sx: {
        bgcolor: (theme: Theme) =>
          theme.palette.mode === "light" ? "" : "#87a5d2"
      },
      variant: "contained"
    },
    dialogActionsProps: {
      sx: {
        ">:not(:first-of-type)": {
          ml: 3
        },
        p: 2
      }
    },
    dialogProps: {
      PaperProps: {
        // change background colour of dialog
        sx: {
          bgcolor: (theme: Theme) =>
            theme.palette.mode === "light" ? "" : "#383838",
          color: (theme: Theme) =>
            theme.palette.mode === "light" ? "" : "#fff"
        }
      },
      maxWidth: "xs",
      sx: {
        p: 3
      }
    },
    titleProps: {
      sx: {
        color: (theme: any) =>
          theme.palette.mode === "light" ? "#000" : "#fff",
        mb: 2
      }
    }
  };
  const defaultOptions: ConfirmOptions = {
    ...confirmDialogStyle,
    allowClose: true,
    buttonOrder: ["cancel", "confirm"],
    cancellationText: "No",
    confirmationText: "Yes",
    description: "Would you like to continue?",
    hideCancelButton: false,
    title: "Dialog Title"
  };
  return (
    <MuiConfirmProvider defaultOptions={defaultOptions}>
      {children}
    </MuiConfirmProvider>
  );
}

export { useConfirm };
