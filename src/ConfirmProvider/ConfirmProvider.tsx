import {
  ConfirmProviderProps,
  ConfirmationDialogOptions
} from "./ConfirmProvider.types";
import React, { Fragment, useCallback, useState } from "react";

import ConfirmContext from "./ConfirmContext";
import ConfirmationDialog from "./ConfirmationDialog";
import { Theme } from "@mui/material/styles";

interface ConfirmState {
  parentId: string;
  resolve: (value?: unknown) => void;
  reject: () => void;
}

// define default props
const DEFAULT_OPTIONS: ConfirmationDialogOptions = {
  allowClose: true,
  buttonOrder: ["cancel", "confirm"],
  cancellationButtonProps: {},
  cancellationText: "Cancel",
  confirmationButtonProps: {},
  confirmationKeyword: "",
  confirmationKeywordTextFieldProps: {},
  confirmationText: "Ok",
  content: null,
  contentProps: {},
  description: "Test Description",
  dialogActionsProps: {},
  dialogProps: {},
  hideCancelButton: false,
  title: "Are you sure?",
  titleProps: {}
};

const buildOptions = (
  defaultOptions: Partial<ConfirmationDialogOptions>,
  options: Partial<ConfirmationDialogOptions>
) => {
  const dialogProps = {
    ...(defaultOptions.dialogProps || DEFAULT_OPTIONS.dialogProps),
    ...(options.dialogProps || {}),
    open: true
  };
  const dialogActionsProps = {
    ...(defaultOptions.dialogActionsProps ||
      DEFAULT_OPTIONS.dialogActionsProps),
    ...(options.dialogActionsProps || {})
  };
  const confirmationButtonProps = {
    ...(defaultOptions.confirmationButtonProps ||
      DEFAULT_OPTIONS.confirmationButtonProps),
    ...(options.confirmationButtonProps || {})
  };
  const cancellationButtonProps = {
    ...(defaultOptions.cancellationButtonProps ||
      DEFAULT_OPTIONS.cancellationButtonProps),
    ...(options.cancellationButtonProps || {})
  };
  const titleProps = {
    ...(defaultOptions.titleProps || DEFAULT_OPTIONS.titleProps),
    ...(options.titleProps || {})
  };
  const contentProps = {
    ...(defaultOptions.contentProps || DEFAULT_OPTIONS.contentProps),
    ...(options.contentProps || {})
  };
  const confirmationKeywordTextFieldProps = {
    ...(defaultOptions.confirmationKeywordTextFieldProps ||
      DEFAULT_OPTIONS.confirmationKeywordTextFieldProps),
    ...(options.confirmationKeywordTextFieldProps || {})
  };
  return {
    ...DEFAULT_OPTIONS,
    ...defaultOptions,
    ...options,
    cancellationButtonProps,
    confirmationButtonProps,
    confirmationKeywordTextFieldProps,
    contentProps,
    dialogActionsProps,
    dialogProps,
    titleProps
  };
};

let confirmGlobal: (
  options: Partial<ConfirmationDialogOptions>
) => Promise<void>;

const ConfirmProvider: React.FC<ConfirmProviderProps> = ({
  children,
  defaultOptions = {
    allowClose: true,
    buttonOrder: ["cancel", "confirm"],
    cancellationText: "No",
    confirmationButtonProps: {
      sx: {
        bgcolor: (theme: Theme) =>
          theme.palette.mode === "light" ? "" : "#87a5d2"
      },
      variant: "contained"
    },
    confirmationText: "Yes",
    description: "Would you like to continue?",
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
    hideCancelButton: false,
    title: "Dialog Title",
    titleProps: {
      sx: {
        color: (theme: any) =>
          theme.palette.mode === "light" ? "#000" : "#fff"
      }
    }
  }
}) => {
  // state that we clear on close (to avoid dangling references to resolve and
  // reject). If this is null, the dialog is closed.
  const [state, setState] = useState<ConfirmState | null>(null);
  // options for rendering the dialog, which aren't reset on close so that we
  // keep rendering the same modal during close animation
  const [options, setOptions] = useState({});
  const [key, setKey] = useState(0);

  const confirmBase = useCallback(
    (
      parentId: string,
      options: Partial<ConfirmationDialogOptions> = {}
    ): Promise<void> => {
      return new Promise<void>((resolve, reject) => {
        setKey(key => key + 1);
        setOptions(options);
        setState({ parentId, reject, resolve: () => resolve() }); // Ensure resolve is void
      });
    },
    []
  );

  const closeOnParentUnmount = useCallback((parentId: string) => {
    setState(state => {
      if (state && state.parentId === parentId) {
        return null;
      } else {
        return state;
      }
    });
  }, []);

  const handleClose = useCallback(() => {
    setState(null);
  }, []);

  const handleCancel = useCallback(() => {
    setState(state => {
      state && state.reject();
      return null;
    });
  }, []);

  const handleConfirm = useCallback(() => {
    setState(state => {
      state && state.resolve();
      return null;
    });
  }, []);

  confirmGlobal = useCallback(
    (options?: Partial<ConfirmationDialogOptions>) => {
      return confirmBase("global", options);
    },
    [confirmBase]
  );

  return (
    <Fragment>
      <ConfirmContext.Provider value={{ closeOnParentUnmount, confirmBase }}>
        {children}
      </ConfirmContext.Provider>
      <ConfirmationDialog
        key={key}
        open={state !== null}
        options={buildOptions(defaultOptions, options)}
        onClose={handleClose}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </Fragment>
  );
};
export default ConfirmProvider;
export { confirmGlobal as confirm };
