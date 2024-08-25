import { useMutation, useReactiveVar } from "@apollo/client";
import { LIKE_REPLY } from "../../gql/mutation";
import { useGetVideoId } from "../useGetVideoId";
import { GET_COMMENT_BY_ID } from "../../gql/query";
import { GetCommentsByVideoId } from "../query/useCommentById";
import { sortOrderVar } from "../../contexts/sortingType";
import { useState } from "react";

interface LikeReplyResult {
  likeReply: {
    ok: boolean;
    error: null | string;
  };
}

interface UseLikeReplyProps {
  commentId: number;
  replyId: number;
}

export const useLikeReply = ({ commentId, replyId }: UseLikeReplyProps) => {
  const { videoId } = useGetVideoId();
  const [likeReply, { data, error }] = useMutation<LikeReplyResult>(LIKE_REPLY);
  const [liked, setLiked] = useState(
    JSON.parse(localStorage.getItem(`liked-reply-${replyId}`) || "false")
  );

  const sortingType = useReactiveVar(sortOrderVar);

  const handleLikeReply = async () => {
    const isIncrement = !liked;

    await likeReply({
      variables: { replyId, isIncrement },
      update: (cache, { data }) => {
        if (!data?.likeReply.ok) return;

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
                likes: isIncrement ? replyItem.likes + 1 : replyItem.likes - 1,
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
      localStorage.setItem(`liked-reply-${replyId}`, JSON.stringify(true));
      setLiked(true);
    } else {
      localStorage.removeItem(`liked-reply-${replyId}`);
      setLiked(false);
    }
  };

  return { handleLikeReply, data, error, liked };
};
