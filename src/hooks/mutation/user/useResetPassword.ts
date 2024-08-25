import { RESET_PASSWORD } from "@/gql/mutation/user";
import { useMutation } from "@apollo/client";

interface Result {
  resetPassword: {
    ok: boolean;
    error: null | string;
  };
}

interface Props {
  newPassword: string;
  code: string;
}

export const useResetPassword = () => {
  const [resetPassword, { data, error }] = useMutation<Result>(RESET_PASSWORD);

  const handleResetPassword = async (input: Props) => {
    const result = await resetPassword({
      variables: { input },
    });

    return result;
  };

  return { handleResetPassword, data, error };
};
