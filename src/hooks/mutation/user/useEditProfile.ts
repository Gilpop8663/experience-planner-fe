import { EDIT_PROFILE } from "@/gql/mutation/user";
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
    const result = await editProfile({
      variables: { input },
    });

    return result;
  };

  return { handleEditProfile, data, error };
};
