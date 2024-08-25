import { useMutation } from "@apollo/client";
import { CHECK_COMMENT_PASSWORD } from "../../gql/mutation";

interface CheckCommentPasswordResult {
  checkCommentPassword: {
    ok: boolean;
    error: null | string;
  };
}

interface UseCheckCommentPasswordProps {
  commentId: number;
  editInputOpen: () => void;
}

export const useCheckCommentPassword = ({
  commentId,
  editInputOpen,
}: UseCheckCommentPasswordProps) => {
  const [checkCommentPassword, { data, error }] =
    useMutation<CheckCommentPasswordResult>(CHECK_COMMENT_PASSWORD);

  const handleCheckCommentPassword = async (password: string) => {
    const result = await checkCommentPassword({
      variables: { password, commentId },
      update: (__, { data }) => {
        if (!data?.checkCommentPassword.ok) return;

        editInputOpen();
      },
    });

    return result;
  };

  return { handleCheckCommentPassword, data, error };
};
