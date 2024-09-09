import { ConfirmContextProps } from "./ConfirmProvider.types";
import { createContext } from "react";

// create context with default value
const ConfirmContext = createContext<ConfirmContextProps>({
  closeOnParentUnmount() {},
  confirmBase() {
    throw new Error("Missing ConfirmProvider");
  }
});

export default ConfirmContext;
