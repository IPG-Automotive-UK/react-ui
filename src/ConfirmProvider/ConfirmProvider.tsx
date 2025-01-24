import {
  ConfirmProviderProps,
  ConfirmState,
  ConfirmationDialogOptions
} from "./ConfirmProvider.types";
import React, { Fragment, useCallback, useState } from "react";

import ConfirmContext from "./ConfirmContext";
import ConfirmationDialog from "./ConfirmationDialog";

// define default props
const DEFAULT_OPTIONS: ConfirmationDialogOptions = {
  cancellationText: "Cancel",
  confirmationText: "Ok",
  content: null,
  description: "Test Description",
  title: "Are you sure?"
};

const buildOptions = (
  defaultOptions: Partial<ConfirmationDialogOptions>,
  options: Partial<ConfirmationDialogOptions>
) => {
  const confirmationButtonProps = {
    ...(defaultOptions.confirmationButtonProps ||
      DEFAULT_OPTIONS.confirmationButtonProps),
    ...(options.confirmationButtonProps || {})
  };

  return {
    ...DEFAULT_OPTIONS,
    ...defaultOptions,
    ...options,
    confirmationButtonProps
  };
};

let confirmGlobal: (
  options: Partial<ConfirmationDialogOptions>
) => Promise<void>;

const ConfirmProvider: React.FC<ConfirmProviderProps> = ({
  children,
  defaultOptions = {
    cancellationText: "No",
    confirmationButtonProps: {
      variant: "contained"
    },
    confirmationText: "Yes",
    description: "Would you like to continue?",

    title: "Dialog Title"
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
