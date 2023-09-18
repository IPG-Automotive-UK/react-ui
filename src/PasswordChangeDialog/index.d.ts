import type { DialogProps } from "@mui/material";

export type PasswordChangeDialogProps = {
  errorMessage?: string;
  onClose: DialogProps["onClose"];
  onSubmit: (
    data: {
      currentPassword: string;
      newPassword: string;
      newPasswordRepeat: string;
    },
    event: React.FormEvent<HTMLFormElement>
  ) => null;
  open: boolean;
  status: "init" | "loading" | "success" | "error";
  successMessage?: string;
};

declare const PasswordChangeDialog: React.FC<PasswordChangeDialogProps>;

export default PasswordChangeDialog;
