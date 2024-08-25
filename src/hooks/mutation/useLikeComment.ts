import { useMutation, useReactiveVar } from "@apollo/client";
import { LIKE_COMMENT } from "../../gql/mutation";
import { useGetVideoId } from "../useGetVideoId";
import { GET_COMMENT_BY_ID } from "../../gql/query";
import { GetCommentsByVideoId } from "../query/useCommentById";
import { sortOrderVar } from "../../contexts/sortingType";
import { useState } from "react";

interface LikeCommentResult {
  likeComment: {
    ok: boolean;
    error: null | string;
  };
}

export const useLikeComment = (commentId: number) => {
  const { videoId } = useGetVideoId();
  const [likeComment, { data, error }] =
    useMutation<LikeCommentResult>(LIKE_COMMENT);
  const [liked, setLiked] = useState(
    JSON.parse(localStorage.getItem(`liked-comment-${commentId}`) || "false")
  );

  const sortingType = useReactiveVar(sortOrderVar);

  const handleLikeComment = async () => {
    const isIncrement = !liked;

    await likeComment({
      variables: { commentId, isIncrement },
      update: (cache, { data }) => {
        if (!data?.likeComment.ok) return;

        const existingComments: GetCommentsByVideoId | null = cache.readQuery({
          query: GET_COMMENT_BY_ID,
          variables: { videoId, sortingType },
        });

        if (!existingComments) return;

        const newCommentList = existingComments.getCommentsByVideoId.map(
          (item) => {
            if (item.id !== commentId) return item;

            if (isIncrement) {
              return { ...item, likes: item.likes + 1 };
            } else {
              return { ...item, likes: item.likes - 1 };
            }
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
      localStorage.setItem(`liked-comment-${commentId}`, JSON.stringify(true));
      setLiked(true);
    } else {
      localStorage.removeItem(`liked-comment-${commentId}`);
      setLiked(false);
    }
  };

  return { liked, handleLikeComment, data, error };
};
