import { CHECK_PASSWORD } from "@/gql/mutation/user";
import { useMutation } from "@apollo/client";

interface Result {
  checkPassword: {
    ok: boolean;
    error: null | string;
  };
}

interface Props {
  password: string;
}

export const useCheckPassword = () => {
  const [checkPassword, { data, error }] = useMutation<Result>(CHECK_PASSWORD);

  const handleCheckPassword = async (input: Props) => {
    const result = await checkPassword({
      variables: { input },
    });

    return result;
  };

  return { handleCheckPassword, data, error };
};
