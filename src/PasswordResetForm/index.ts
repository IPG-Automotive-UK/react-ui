import PasswordResetForm from "./PasswordResetForm.js";

export type PasswordResetFormProps = {
  loading?: boolean;
  onSubmit: (
    data: {
      email: string;
    },
    event: React.FormEvent<HTMLFormElement>
  ) => void;
};

export default PasswordResetForm as React.FC<PasswordResetFormProps>;
