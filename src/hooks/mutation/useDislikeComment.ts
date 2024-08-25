import { useMutation, useReactiveVar } from "@apollo/client";
import { DISLIKE_COMMENT } from "../../gql/mutation";
import { useGetVideoId } from "../useGetVideoId";
import { GET_COMMENT_BY_ID } from "../../gql/query";
import { GetCommentsByVideoId } from "../query/useCommentById";
import { sortOrderVar } from "../../contexts/sortingType";
import { useState } from "react";

interface DislikeCommentResult {
  dislikeComment: {
    ok: boolean;
    error: null | string;
  };
}

export const useDislikeComment = (commentId: number) => {
  const { videoId } = useGetVideoId();
  const [dislikeComment, { data, error }] =
    useMutation<DislikeCommentResult>(DISLIKE_COMMENT);
  const [disliked, setDisliked] = useState(
    JSON.parse(localStorage.getItem(`disliked-comment-${commentId}`) || "false")
  );

  const sortingType = useReactiveVar(sortOrderVar);

  const handleDislikeComment = async () => {
    const isIncrement = !disliked;

    await dislikeComment({
      variables: { commentId, isIncrement },
      update: (cache, { data }) => {
        if (!data?.dislikeComment.ok) return;

        const existingComments: GetCommentsByVideoId | null = cache.readQuery({
          query: GET_COMMENT_BY_ID,
          variables: { videoId, sortingType },
        });

        if (!existingComments) return;

        const newCommentList = existingComments.getCommentsByVideoId.map(
          (item) => {
            if (item.id !== commentId) return item;

            return {
              ...item,
              dislikes: isIncrement ? item.dislikes + 1 : item.dislikes - 1,
            };
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

    if (isIncrement) {
      localStorage.setItem(
        `disliked-comment-${commentId}`,
        JSON.stringify(true)
      );
      setDisliked(true);
    } else {
      localStorage.removeItem(`disliked-comment-${commentId}`);
      setDisliked(false);
    }
  };

  return { handleDislikeComment, data, error, disliked };
};
