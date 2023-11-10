export type LoginFormProps = {
  loading?: boolean;
  onLogin?: (
    data: { email: string; password: string },
    event: React.SyntheticEvent
  ) => void;
};

declare const LoginForm: React.FC<LoginFormProps>;

export default LoginForm;
