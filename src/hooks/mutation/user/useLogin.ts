import { LOGIN } from "@/gql/mutation/user";
import {
  GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
  GET_EXPIRED_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
} from "@/gql/query/campaign";
import { ME } from "@/gql/query/user";
import { showToast } from "@/lib/toast";
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
  rememberMe: boolean;
}

export const useLogin = () => {
  const [login, { data, error, loading }] = useMutation<Result>(LOGIN);

  const handleLogin = async (input: Props) => {
    const result = await login({
      variables: { input },
      refetchQueries: [
        { query: GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE },
        { query: GET_EXPIRED_CAMPAIGN_LIST_SORTED_BY_DEADLINE },
        { query: ME },
      ],
    });

    if (result.data?.login.ok) {
      showToast("로그인에 성공했습니다! 🎉");
    }

    if (!result.data?.login.ok) {
      showToast("로그인에 실패했습니다! 😢", "error");
    }

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

  return { handleLogin, data, error, loading, prefetchMyProfile };
};
