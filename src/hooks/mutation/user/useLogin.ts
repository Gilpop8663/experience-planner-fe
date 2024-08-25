import { LOGIN } from "@/gql/mutation/user";
import { useMutation } from "@apollo/client";

interface Result {
  login: {
    ok: boolean;
    error: null | string;
    token?: string;
  };
}

interface Props {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [login, { data, error }] = useMutation<Result>(LOGIN);

  const handleLogin = async (input: Props) => {
    const result = await login({
      variables: { input },
    });

    return result;
  };

  return { handleLogin, data, error };
};
