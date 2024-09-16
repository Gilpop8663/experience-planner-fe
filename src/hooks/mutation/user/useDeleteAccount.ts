import { DELETE_ACCOUNT } from "@/gql/mutation/user";
import { useMutation } from "@apollo/client";
import { ACCESS_TOKEN } from "@/constants/localStorage";
import { ROUTES } from "@/router/routes";
import { useNavigate } from "react-router-dom";
import { showPromiseToast } from "@/lib/toast";

interface Result {
  deleteAccount: {
    ok: boolean;
    error: null | string;
  };
}

interface Props {
  userId: number;
}

export const useDeleteAccount = () => {
  const navigate = useNavigate();
  const [deleteAccount, { data, error }] = useMutation<Result>(DELETE_ACCOUNT);

  const handleDeleteAccount = async (input: Props) => {
    const result = deleteAccount({
      variables: { input },
    });

    localStorage.removeItem(ACCESS_TOKEN);

    navigate(ROUTES.LANDING);

    showPromiseToast(result, {
      success: "계정 삭제에 성공했습니다! 🎉",
      error: "계정 삭제에 실패했습니다 😢",
      pending: "계정 삭제중입니다 ⏳",
    });

    return result;
  };

  return { handleDeleteAccount, data, error };
};
