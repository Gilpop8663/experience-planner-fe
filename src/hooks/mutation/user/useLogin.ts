import { LOGIN } from "@/gql/mutation/user";
import {
  GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
  GET_EXPIRED_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
} from "@/gql/query/campaign";
import { ME } from "@/gql/query/user";
import { showPromiseToast } from "@/lib/toast";
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
    const result = login({
      variables: { input },
      refetchQueries: [
        { query: GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE },
        { query: GET_EXPIRED_CAMPAIGN_LIST_SORTED_BY_DEADLINE },
        { query: ME },
      ],
    });

    showPromiseToast(
      result.then((res) => {
        if (!res.data?.login.ok) {
          throw new Error(res.data?.login.error || "로그인에 실패했습니다! 😢");
        }
        return res;
      }),
      {
        success: "로그인에 성공했습니다! 🎉",
        error: "로그인에 실패했습니다! 😢",
        pending: "로그인 중입니다 ⏳",
      },
    );

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
