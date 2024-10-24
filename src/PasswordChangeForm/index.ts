import PasswordChangeForm from "./PasswordChangeForm.js";

export type PasswordChangeFormProps = {
  loading?: boolean;
  onSubmit: (
    data: {
      password: string;
      passwordRepeat: string;
    },
    event: React.FormEvent<HTMLFormElement>
  ) => void;
};

export default PasswordChangeForm as React.FC<PasswordChangeFormProps>;
