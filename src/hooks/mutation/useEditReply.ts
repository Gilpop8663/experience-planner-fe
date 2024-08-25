import { ApolloError, useMutation, useReactiveVar } from "@apollo/client";
import { EDIT_REPLY } from "../../gql/mutation";
import { GET_COMMENT_BY_ID } from "../../gql/query";
import { GetCommentsByVideoId } from "../query/useCommentById";
import { sortOrderVar } from "../../contexts/sortingType";
import { useGetVideoId } from "../useGetVideoId";
import { UseFormInputResult, useFormInput } from "../useInput";
import useOpen from "../useOpen";
import { FormEvent } from "react";
import { CONTENT_MAX_LENGTH } from "../../validation/constants";

interface EditReplyResult {
  editReply: {
    ok: boolean;
    error: null | string;
  };
}

interface UseEditReplyProps {
  commentId: number;
  replyId: number;
  initialCommentValue: string;
}

export interface UseEditReplyResult {
  handelEditReply: (event: FormEvent, password: string) => Promise<void>;
  data: EditReplyResult | undefined | null;
  error: ApolloError | undefined;
  content: UseFormInputResult;
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useEditReply = ({
  commentId,
  replyId,
  initialCommentValue,
}: UseEditReplyProps): UseEditReplyResult => {
  const { isOpen, open, close } = useOpen();
  const { videoId } = useGetVideoId();
  const content = useFormInput({
    initialValue: initialCommentValue,
    maxLength: CONTENT_MAX_LENGTH,
  });
  const [editReply, { data, error }] = useMutation<EditReplyResult>(EDIT_REPLY);

  const sortingType = useReactiveVar(sortOrderVar);

  const handelEditReply = async (event: FormEvent, password: string) => {
    event.preventDefault();

    const input = { password, content: content.value };

    await editReply({
      variables: {
        input: input,
        replyId,
      },

      update: (cache, { data }) => {
        if (!data?.editReply.ok) return;

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
                updatedAt: new Date().toISOString(),
                content: content.value,
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

        close();
      },
    });
  };

  return { handelEditReply, data, error, content, open, isOpen, close };
};
