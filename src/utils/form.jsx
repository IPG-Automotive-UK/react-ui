import { useForm } from "react-hook-form";

// wrapper for react-hook-form to make it easier to use with material-ui which requires inputRef rather than ref
function useMaterialForm(props) {
  const { register, ...rest } = useForm(props);
  return {
    register: (...args) => {
      const { ref, ...restRegister } = register(...args);
      return { inputRef: ref, ...restRegister };
    },
    ...rest
  };
}

export { useMaterialForm };
