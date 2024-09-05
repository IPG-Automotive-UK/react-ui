import { ConfirmationDialogOptions } from "./ConfirmProvider.types";
import { createContext } from "react";

interface ConfirmContextProps {
  confirmBase: (
    parentId: string,
    options?: Partial<ConfirmationDialogOptions>
  ) => Promise<void>;
  closeOnParentUnmount: (parentId: string) => void;
}

// create context with default value

const ConfirmContext = createContext<ConfirmContextProps>({
  closeOnParentUnmount() {},
  confirmBase() {
    throw new Error("Missing ConfirmProvider");
  }
});

export default ConfirmContext;
