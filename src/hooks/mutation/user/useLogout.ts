import { ACCESS_TOKEN } from "@/constants/localStorage";
import { LOGOUT } from "@/gql/mutation/user";
import { client } from "@/main";
import { ROUTES } from "@/router/routes";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

interface Result {
  logout: {
    ok: boolean;
    error: null | string;
  };
}

export const useLogout = () => {
  const navigate = useNavigate();
  const [logout, { data, error }] = useMutation<Result>(LOGOUT);

  const handleLogout = async () => {
    const result = await logout();
    localStorage.removeItem(ACCESS_TOKEN);

    // 아폴로 캐시 초기화
    await client.resetStore();

    navigate(ROUTES.LANDING);

    return result;
  };

  return { handleLogout, data, error };
};
