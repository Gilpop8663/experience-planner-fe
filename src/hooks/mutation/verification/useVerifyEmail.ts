import { VERIFY_EMAIL } from "@/gql/mutation/verification";
import { useMutation } from "@apollo/client";

interface Result {
  verifyEmail: {
    ok: boolean;
    error: null | string;
  };
}

interface Props {
  email: string;
  code: string;
}

export const useVerifyEmail = () => {
  const [VerifyEmail, { data, error }] = useMutation<Result>(VERIFY_EMAIL);

  const handleVerifyEmail = async (input: Props) => {
    const result = await VerifyEmail({
      variables: { input },
    });

    return result;
  };

  return { handleVerifyEmail, data, error };
};
