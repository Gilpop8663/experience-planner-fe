import { FORGOT_PASSWORD } from "@/gql/mutation/user";
import { showToast } from "@/lib/toast";
import { useMutation } from "@apollo/client";

interface Result {
  forgotPassword: {
    ok: boolean;
    error: null | string;
  };
}

interface Props {
  email: string;
}

export const useForgotPassword = () => {
  const [forgotPassword, { data, error }] =
    useMutation<Result>(FORGOT_PASSWORD);

  const handleForgotPassword = async (input: Props) => {
    const result = await forgotPassword({
      variables: { input },
    });

    if (result.data?.forgotPassword.ok) {
      showToast("비밀번호 재설정 링크가 이메일로 전송되었습니다.");
    }

    return result;
  };

  return { handleForgotPassword, data, error };
};
