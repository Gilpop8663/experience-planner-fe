import { CHECK_EMAIL } from "@/gql/mutation/user";
import { useMutation } from "@apollo/client";

interface Result {
  checkEmail: {
    ok: boolean;
    error: null | string;
  };
}

interface Props {
  email: string;
}

export const useCheckEmail = () => {
  const [checkEmail, { data, error }] = useMutation<Result>(CHECK_EMAIL);

  const handleCheckEmail = async (input: Props) => {
    const result = await checkEmail({
      variables: { input },
    });

    return result;
  };

  return { handleCheckEmail, data, error };
};
