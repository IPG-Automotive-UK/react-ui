export type PasswordResetFormProps = {
  loading?: boolean;
  onSubmit: (
    data: {
      email: string;
    },
    event: React.FormEvent<HTMLFormElement>
  ) => null;
};

declare const PasswordResetForm: React.FC<PasswordResetFormProps>;

export default PasswordResetForm;
