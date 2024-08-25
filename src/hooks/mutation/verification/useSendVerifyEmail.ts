import { SEND_VERIFY_EMAIL } from "@/gql/mutation/verification";
import { useMutation } from "@apollo/client";

interface Result {
  verifyEmail: {
    ok: boolean;
    error: null | string;
  };
}

interface Props {
  email: string;
}

export const useSendVerifyEmail = () => {
  const [sendVerifyEmail, { data, error }] =
    useMutation<Result>(SEND_VERIFY_EMAIL);

  const handleSendVerifyEmail = async (input: Props) => {
    const result = await sendVerifyEmail({
      variables: { input },
    });

    return result;
  };

  return { handleSendVerifyEmail, data, error };
};
