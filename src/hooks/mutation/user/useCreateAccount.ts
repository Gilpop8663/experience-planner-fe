import { CREATE_ACCOUNT } from "@/gql/mutation/user";
import { useMutation } from "@apollo/client";

interface Result {
  createAccount: {
    ok: boolean;
    error: null | string;
  };
}

interface Props {
  email: string;
  password: string;
  nickname: string;
}

export const useCreateAccount = () => {
  const [createAccount, { data, error }] = useMutation<Result>(CREATE_ACCOUNT);

  const handleCreateAccount = async (input: Props) => {
    const result = await createAccount({
      variables: { input },
    });

    return result;
  };

  return { handleCreateAccount, data, error };
};
