import LoginForm from "./LoginForm";

export type LoginFormProps = {
  loading?: boolean;
  onLogin?: (
    data: { email: string; password: string },
    event: React.SyntheticEvent
  ) => void;
};

export default LoginForm as React.FC<LoginFormProps>;
