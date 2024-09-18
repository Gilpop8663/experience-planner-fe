import { ACCESS_TOKEN } from "@/constants/localStorage";
import { LOGOUT } from "@/gql/mutation/user";
import { showPromiseToast } from "@/lib/toast";
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
  const [logout, { data, error }] = useMutation<Result>(LOGOUT);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = logout({
      async onCompleted() {
        localStorage.removeItem(ACCESS_TOKEN);
        await client.resetStore();

        navigate(ROUTES.LANDING);
      },
    });

    showPromiseToast(
      result.then((res) => {
        if (!res.data?.logout.ok) {
          throw new Error(
            res.data?.logout.error || "로그아웃에 실패했습니다! 😢",
          );
        }
        return res;
      }),
      {
        success: "로그아웃에 성공했습니다! 🎉",
        error: "로그아웃에 실패했습니다 😢",
        pending: "로그아웃 중입니다 ⏳",
      },
    );

    return result;
  };

  return { handleLogout, data, error };
};
