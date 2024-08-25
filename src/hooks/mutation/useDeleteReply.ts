import { useMutation, useReactiveVar } from "@apollo/client";
import { DELETE_REPLY } from "../../gql/mutation";
import { GET_COMMENT_BY_ID } from "../../gql/query";
import { GetCommentsByVideoId } from "../query/useCommentById";
import { sortOrderVar } from "../../contexts/sortingType";
import { useGetVideoId } from "../useGetVideoId";

interface DeleteReplyResult {
  deleteReply: {
    ok: boolean;
    error: null | string;
  };
}

interface UseDeleteReplyProps {
  commentId: number;
  replyId: number;
}

export const useDeleteReply = ({ commentId, replyId }: UseDeleteReplyProps) => {
  const { videoId } = useGetVideoId();
  const [deleteReply, { data, error }] =
    useMutation<DeleteReplyResult>(DELETE_REPLY);

  const sortingType = useReactiveVar(sortOrderVar);

  const handleDeleteReply = async (password: string) => {
    const result = await deleteReply({
      variables: { input: { password }, replyId },

      update: (cache, { data }) => {
        if (!data?.deleteReply.ok) return;

        const existingComments: GetCommentsByVideoId | null = cache.readQuery({
          query: GET_COMMENT_BY_ID,
          variables: { videoId, sortingType },
        });

        if (!existingComments) return;

        const newCommentList = existingComments.getCommentsByVideoId.map(
          (item) => {
            if (item.id !== commentId) return item;

            const newReplyList = item.replies.filter(
              (replyItem) => replyItem.id !== replyId
            );

            return { ...item, replies: newReplyList };
          }
        );

        cache.updateQuery(
          { query: GET_COMMENT_BY_ID, variables: { videoId, sortingType } },
          () => ({
            getCommentsByVideoId: newCommentList,
          })
        );
      },
    });

    return result;
  };

  return { handleDeleteReply, data, error };
};
