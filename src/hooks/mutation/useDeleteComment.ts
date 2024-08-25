import { useMutation, useReactiveVar } from "@apollo/client";
import { DELETE_COMMENT } from "../../gql/mutation";
import { GET_COMMENT_BY_ID } from "../../gql/query";
import { GetCommentsByVideoId } from "../query/useCommentById";
import { sortOrderVar } from "../../contexts/sortingType";
import { useGetVideoId } from "../useGetVideoId";

interface DeleteCommentResult {
  deleteComment: {
    ok: boolean;
    error: null | string;
  };
}

export const useDeleteComment = (commentId: number) => {
  const { videoId } = useGetVideoId();
  const [deleteComment, { data, error }] =
    useMutation<DeleteCommentResult>(DELETE_COMMENT);

  const sortingType = useReactiveVar(sortOrderVar);

  const handleDeleteComment = async (password: string) => {
    const result = await deleteComment({
      variables: { input: { password }, commentId },

      update: (cache, { data }) => {
        if (!data?.deleteComment.ok) return;

        const existingComments: GetCommentsByVideoId | null = cache.readQuery({
          query: GET_COMMENT_BY_ID,
          variables: { videoId, sortingType },
        });

        if (!existingComments) return;

        const newCommentList = existingComments.getCommentsByVideoId.filter(
          (item) => item.id !== commentId
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

  return { handleDeleteComment, data, error };
};
