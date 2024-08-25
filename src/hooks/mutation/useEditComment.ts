import { ApolloError, useMutation, useReactiveVar } from "@apollo/client";
import { EDIT_COMMENT } from "../../gql/mutation";
import { GET_COMMENT_BY_ID } from "../../gql/query";
import { GetCommentsByVideoId } from "../query/useCommentById";
import { sortOrderVar } from "../../contexts/sortingType";
import { useGetVideoId } from "../useGetVideoId";
import { UseFormInputResult, useFormInput } from "../useInput";
import useOpen from "../useOpen";
import { FormEvent } from "react";
import { CONTENT_MAX_LENGTH } from "../../validation/constants";

interface EditCommentResult {
  editComment: {
    ok: boolean;
    error: null | string;
  };
}

interface UseEditCommentProps {
  commentId: number;
  initialCommentValue: string;
}

export interface UseEditCommentResult {
  handleEditComment: (event: FormEvent, password: string) => Promise<void>;
  data: EditCommentResult | undefined | null;
  error: ApolloError | undefined;
  content: UseFormInputResult;
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useEditComment = ({
  commentId,
  initialCommentValue,
}: UseEditCommentProps): UseEditCommentResult => {
  const { isOpen, open, close } = useOpen();
  const { videoId } = useGetVideoId();
  const content = useFormInput({
    initialValue: initialCommentValue,
    maxLength: CONTENT_MAX_LENGTH,
  });
  const [editComment, { data, error }] =
    useMutation<EditCommentResult>(EDIT_COMMENT);

  const sortingType = useReactiveVar(sortOrderVar);

  const handleEditComment = async (event: FormEvent, password: string) => {
    event.preventDefault();

    const input = { password, content: content.value };

    await editComment({
      variables: { input, commentId },

      update: (cache, { data }) => {
        if (!data?.editComment.ok) return;

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
              updatedAt: new Date().toISOString(),
              content: content.value,
            };
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

  return { handleEditComment, data, error, content, open, isOpen, close };
};
