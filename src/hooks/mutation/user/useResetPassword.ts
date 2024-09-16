import { RESET_PASSWORD } from "@/gql/mutation/user";
import { showPromiseToast } from "@/lib/toast";
import { useMutation } from "@apollo/client";

interface Result {
  resetPassword: {
    ok: boolean;
    error: null | string;
  };
}

interface Props {
  newPassword: string;
  code: string;
}

export const useResetPassword = () => {
  const [resetPassword, { data, error }] = useMutation<Result>(RESET_PASSWORD);

  const handleResetPassword = async (input: Props) => {
    const result = resetPassword({
      variables: { input },
    });

    showPromiseToast(result, {
      success: "비밀번호 수정에 성공했습니다! 🎉",
      error: "비밀번호 수정에 실패했습니다 😢",
      pending: "비밀번호 수정중입니다 ⏳",
    });

    return result;
  };

  return { handleResetPassword, data, error };
};
