import { useCallback, useContext, useEffect, useMemo } from "react";

import ConfirmContext from "./ConfirmContext";
import { ConfirmationDialogOptions } from "./ConfirmProvider.types"; // Ensure this type exists in your types file

let idCounter = 0;

// generate a unique id for each confirmation dialog
const useConfirmId = (): string => {
  const id = useMemo(() => {
    return idCounter++;
  }, []);

  return `confirm-${id}`;
};

// define the type for the confirm function options
interface UseConfirm {
  (options: Partial<ConfirmationDialogOptions>): Promise<void>;
}

const useConfirm = (): UseConfirm => {
  const parentId = useConfirmId();
  const { confirmBase, closeOnParentUnmount } = useContext(ConfirmContext);

  // confirm function uses the context's confirmBase
  const confirm = useCallback(
    (options: Partial<ConfirmationDialogOptions>) => {
      return confirmBase(parentId, options);
    },
    [parentId, confirmBase]
  );

  // clean up by calling closeOnParentUnmount when component unmounts
  useEffect(() => {
    return () => {
      closeOnParentUnmount(parentId);
    };
  }, [parentId, closeOnParentUnmount]);

  return confirm;
};

export default useConfirm;
