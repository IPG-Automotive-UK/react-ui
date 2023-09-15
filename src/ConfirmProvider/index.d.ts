import { useConfirm } from "material-ui-confirm";

export type ConfirmProviderProps = {
  children: React.ReactNode;
};

declare const ConfirmProvider: React.FC<ConfirmProviderProps>;

export { ConfirmProvider, useConfirm };
