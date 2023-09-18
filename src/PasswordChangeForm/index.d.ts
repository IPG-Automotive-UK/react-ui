export type PasswordChangeFormProps = {
  loading?: boolean;
  onSubmit: (
    data: {
      password: string;
      passwordRepear: string;
    },
    event: React.FormEvent<HTMLFormElement>
  ) => null;
};

declare const PasswordChangeForm: React.FC<PasswordChangeFormProps>;

export default PasswordChangeForm;
