import { FORGOT_PASSWORD } from "@/gql/mutation/user";
import { useMutation } from "@apollo/client";

interface Result {
  forgotPassword: {
    ok: boolean;
    error: null | string;
  };
}

interface Props {
  email: string;
}

export const useForgotPassword = () => {
  const [forgotPassword, { data, error }] =
    useMutation<Result>(FORGOT_PASSWORD);

  const handleForgotPassword = async (input: Props) => {
    const result = await forgotPassword({
      variables: { input },
    });

    return result;
  };

  return { handleForgotPassword, data, error };
};
