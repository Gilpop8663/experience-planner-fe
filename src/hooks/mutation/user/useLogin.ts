import { LOGIN } from "@/gql/mutation/user";
import { ME } from "@/gql/query/user";
import { client } from "@/main";
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

  const prefetchMyProfile = async () => {
    try {
      const { data } = await client.query({
        query: ME,
        fetchPolicy: "cache-first",
      });

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return { handleLogin, data, error, prefetchMyProfile };
};
