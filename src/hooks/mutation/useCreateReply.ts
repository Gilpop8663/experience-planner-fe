import { ApolloError, useMutation, useReactiveVar } from "@apollo/client";
import { CREATE_REPLY } from "../../gql/mutation";
import { GET_COMMENT_BY_ID } from "../../gql/query";
import { UseFormInputResult, useFormInput } from "../useInput";
import { FormEvent } from "react";
import { GetCommentsByVideoId } from "../query/useCommentById";
import { Reply } from "../../types/comment";
import { sortOrderVar } from "../../contexts/sortingType";
import { useGetVideoId } from "../useGetVideoId";
import useOpen from "../useOpen";
import {
  CONTENT_MAX_LENGTH,
  NICKNAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "../../validation/constants";

interface CreateReplyResult {
  createReply: {
    ok: boolean;
    error: null | string;
    replyId: number;
  };
}

export interface UseCreateReplyResult {
  handleCreateReply: (event: FormEvent) => Promise<void>;
  data: CreateReplyResult | undefined | null;
  error: ApolloError | undefined;
  content: UseFormInputResult;
  nickname: UseFormInputResult;
  password: UseFormInputResult;
  isOpen: boolean;
  toggleOpen: () => void;
  handleCloseClick: () => void;
}

export const useCreateReply = (commentId: number): UseCreateReplyResult => {
  const { isOpen, toggleOpen, close } = useOpen();
  const { videoId } = useGetVideoId();
  const content = useFormInput({
    maxLength: CONTENT_MAX_LENGTH,
  });
  const nickname = useFormInput({
    initialValue: localStorage.getItem("nickname") || "",
    maxLength: NICKNAME_MAX_LENGTH,
  });
  const password = useFormInput({
    initialValue: localStorage.getItem("password") || "",
    maxLength: PASSWORD_MAX_LENGTH,
  });
  const sortingType = useReactiveVar(sortOrderVar);

  const [createReply, { data, error }] =
    useMutation<CreateReplyResult>(CREATE_REPLY);

  const handleCreateReply = async (event: FormEvent) => {
    event.preventDefault();

    const input = {
      content: content.value,
      nickname: nickname.value,
      password: password.value,
    };

    await createReply({
      variables: { input, commentId },

      update: (cache, { data }) => {
        if (!data?.createReply.ok) return;

        const existingComments: GetCommentsByVideoId | null = cache.readQuery({
          query: GET_COMMENT_BY_ID,
          variables: { videoId, sortingType },
        });

        if (!existingComments) return;

        const newReply: Reply = {
          id: data.createReply.replyId, // This should be a unique identifier for the new comment
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          nickname: nickname.value,
          content: content.value,
          likes: 0,
          dislikes: 0,
        };

        const newCommentList = existingComments.getCommentsByVideoId.map(
          (item) => {
            if (item.id === commentId) {
              const newReplies = [...item.replies, newReply];
              return { ...item, replies: newReplies };
            }

            return item;
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

    localStorage.setItem("nickname", nickname.value);
    localStorage.setItem("password", password.value);

    content.resetInputValue();
    close();
  };

  const handleCloseClick = () => {
    content.resetInputValue();
    close();
  };

  return {
    handleCreateReply,
    handleCloseClick,
    data,
    error,
    content,
    nickname,
    password,
    isOpen,
    toggleOpen,
  };
};
