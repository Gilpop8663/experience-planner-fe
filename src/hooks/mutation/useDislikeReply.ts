import { useMutation, useReactiveVar } from "@apollo/client";
import { DISLIKE_REPLY } from "../../gql/mutation";
import { useGetVideoId } from "../useGetVideoId";
import { GET_COMMENT_BY_ID } from "../../gql/query";
import { GetCommentsByVideoId } from "../query/useCommentById";
import { sortOrderVar } from "../../contexts/sortingType";
import { useState } from "react";

interface DislikeReplyResult {
  dislikeReply: {
    ok: boolean;
    error: null | string;
  };
}

interface UseDislikeReplyProps {
  commentId: number;
  replyId: number;
}

export const useDislikeReply = ({
  commentId,
  replyId,
}: UseDislikeReplyProps) => {
  const { videoId } = useGetVideoId();
  const [dislikeReply, { data, error }] =
    useMutation<DislikeReplyResult>(DISLIKE_REPLY);
  const [disliked, setDisliked] = useState(
    JSON.parse(localStorage.getItem(`disliked-reply-${replyId}`) || "false")
  );

  const sortingType = useReactiveVar(sortOrderVar);

  const handleDislikeReply = async () => {
    const isIncrement = !disliked;

    await dislikeReply({
      variables: { replyId, isIncrement },
      update: (cache, { data }) => {
        if (!data?.dislikeReply.ok) return;

        const existingComments: GetCommentsByVideoId | null = cache.readQuery({
          query: GET_COMMENT_BY_ID,
          variables: { videoId, sortingType },
        });

        if (!existingComments) return;

        const newCommentList = existingComments.getCommentsByVideoId.map(
          (item) => {
            if (item.id !== commentId) return item;

            const newReplyList = item.replies.map((replyItem) => {
              if (replyItem.id !== replyId) return replyItem;

              return {
                ...replyItem,
                dislikes: isIncrement
                  ? replyItem.dislikes + 1
                  : replyItem.dislikes - 1,
              };
            });

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

    if (isIncrement) {
      localStorage.setItem(`disliked-reply-${replyId}`, JSON.stringify(true));
      setDisliked(true);
    } else {
      localStorage.removeItem(`disliked-reply-${replyId}`);
      setDisliked(false);
    }
  };

  return { handleDislikeReply, data, error, disliked };
};
