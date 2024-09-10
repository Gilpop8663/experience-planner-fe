import { ACCESS_TOKEN } from "@/constants/localStorage";
import { LOGOUT } from "@/gql/mutation/user";
import { client } from "@/main";
import { useMutation } from "@apollo/client";

interface Result {
  logout: {
    ok: boolean;
    error: null | string;
  };
}

export const useLogout = () => {
  const [logout, { data, error }] = useMutation<Result>(LOGOUT);

  const handleLogout = async () => {
    const result = await logout();
    localStorage.removeItem(ACCESS_TOKEN);

    // 아폴로 캐시 초기화
    await client.resetStore();

    return result;
  };

  return { handleLogout, data, error };
};
