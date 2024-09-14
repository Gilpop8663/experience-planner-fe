import { DELETE_ACCOUNT } from "@/gql/mutation/user";
import { useMutation } from "@apollo/client";
import { ACCESS_TOKEN } from "@/constants/localStorage";
import { ROUTES } from "@/router/routes";
import { useNavigate } from "react-router-dom";

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
    const result = await deleteAccount({
      variables: { input },
    });

    localStorage.removeItem(ACCESS_TOKEN);

    navigate(ROUTES.LANDING);

    return result;
  };

  return { handleDeleteAccount, data, error };
};
