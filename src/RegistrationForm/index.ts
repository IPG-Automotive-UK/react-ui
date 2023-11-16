import RegistrationForm from "./RegistrationForm";

export type RegistrationFormProps = {
  loading?: boolean;
  onRegister?: (
    data: {
      firstName: string;
      lastName: string;
      email: string;
      team: string;
      password: string;
      passwordRepeat: string;
    },
    event: React.FormEvent<HTMLFormElement>
  ) => void;
  teams: string[];
};

export default RegistrationForm as React.FC<RegistrationFormProps>;
