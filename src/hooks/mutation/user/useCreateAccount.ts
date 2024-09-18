import { CREATE_ACCOUNT } from "@/gql/mutation/user";
import { showPromiseToast } from "@/lib/toast";
import { useMutation } from "@apollo/client";

interface Result {
  createAccount: {
    ok: boolean;
    error: null | string;
  };
}

interface Props {
  email: string;
  password: string;
}

export const useCreateAccount = () => {
  const [createAccount, { data, error }] = useMutation<Result>(CREATE_ACCOUNT);

  const handleCreateAccount = async (input: Props) => {
    const result = createAccount({
      variables: { input },
    });

    showPromiseToast(
      result.then((res) => {
        if (!res.data?.createAccount.ok) {
          throw new Error(
            res.data?.createAccount.error || "계정 생성에 실패했습니다 😢",
          );
        }
        return res;
      }),
      {
        success: "계정 생성에 성공했습니다! 🎉",
        error: "계정 생성에 실패했습니다 😢",
        pending: "계정 생성중입니다 ⏳",
      },
    );

    return result;
  };

  return { handleCreateAccount, data, error };
};
