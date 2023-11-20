import type { DialogProps } from "@mui/material";
import PasswordChangeDialog from "./PasswordChangeDialog";

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
  ) => void;
  open: boolean;
  status: "init" | "loading" | "success" | "error";
  successMessage?: string;
};

export default PasswordChangeDialog as React.FC<PasswordChangeDialogProps>;
