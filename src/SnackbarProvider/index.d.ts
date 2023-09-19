import { Context } from "react";

export type SnackbarProviderProps = {
  children: React.ReactNode;
};

declare const SnackbarProvider: React.FC<SnackbarProviderProps>;

declare function useSnackbar<T>(context: Context<T> | null): T;

export { SnackbarProvider, useSnackbar };
