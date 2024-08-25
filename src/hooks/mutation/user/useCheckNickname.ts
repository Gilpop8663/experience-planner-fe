import { CHECK_NICKNAME } from "@/gql/mutation/user";
import { useMutation } from "@apollo/client";

interface Result {
  checkNickname: {
    ok: boolean;
    error: null | string;
  };
}

interface Props {
  nickname: string;
}

export const useCheckNickname = () => {
  const [checkNickname, { data, error }] = useMutation<Result>(CHECK_NICKNAME);

  const handleCheckNickname = async (input: Props) => {
    const result = await checkNickname({
      variables: { input },
    });

    return result;
  };

  return { handleCheckNickname, data, error };
};
