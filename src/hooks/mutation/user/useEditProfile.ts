import { EDIT_PROFILE } from "@/gql/mutation/user";
import { showPromiseToast } from "@/lib/toast";
import { useMutation } from "@apollo/client";

interface Result {
  editProfile: {
    ok: boolean;
    error: null | string;
  };
}

interface Props {
  nickname: string;
  password: string;
}

export const useEditProfile = () => {
  const [editProfile, { data, error }] = useMutation<Result>(EDIT_PROFILE);

  const handleEditProfile = async (input: Props) => {
    const result = editProfile({
      variables: { input },
    });

    showPromiseToast(result, {
      success: "비밀번호 수정에 성공했습니다! 🎉",
      error: "비밀번호 수정에 실패했습니다 😢",
      pending: "비밀번호 수정중입니다 ⏳",
    });

    return result;
  };

  return { handleEditProfile, data, error };
};
