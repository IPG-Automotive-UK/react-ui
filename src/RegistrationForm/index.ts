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

declare const RegistrationForm: React.FC<RegistrationFormProps>;

export default RegistrationForm;
