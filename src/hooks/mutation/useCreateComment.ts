import { ApolloError, useMutation, useReactiveVar } from "@apollo/client";
import { CREATE_COMMENT } from "../../gql/mutation";
import { GET_COMMENT_BY_ID } from "../../gql/query";
import { UseFormInputResult, useFormInput } from "../useInput";
import { FormEvent } from "react";
import { GetCommentsByVideoId } from "../query/useCommentById";
import { Comment } from "../../types/comment";
import { sortOrderVar } from "../../contexts/sortingType";
import { useGetVideoId } from "../useGetVideoId";
import {
  CONTENT_MAX_LENGTH,
  NICKNAME_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "../../validation/constants";

interface CreateCommentResult {
  createComment: {
    ok: boolean;
    error: null | string;
    commentId: number;
  };
}

export interface UseCreateCommentResult {
  handleCreateComment: (event: FormEvent) => Promise<void>;
  data: CreateCommentResult | undefined | null;
  error: ApolloError | undefined;
  content: UseFormInputResult;
  nickname: UseFormInputResult;
  password: UseFormInputResult;
  handleCloseClick: () => void;
}

export const useCreateComment = (): UseCreateCommentResult => {
  const { videoId } = useGetVideoId();
  const content = useFormInput({ maxLength: CONTENT_MAX_LENGTH });
  const nickname = useFormInput({
    initialValue: localStorage.getItem("nickname") || "",
    maxLength: NICKNAME_MAX_LENGTH,
  });
  const password = useFormInput({
    initialValue: localStorage.getItem("password") || "",
    maxLength: PASSWORD_MAX_LENGTH,
  });
  const sortingType = useReactiveVar(sortOrderVar);

  const [createComment, { data, error }] =
    useMutation<CreateCommentResult>(CREATE_COMMENT);

  const handleCreateComment = async (event: FormEvent) => {
    event.preventDefault();

    const input = {
      content: content.value,
      nickname: nickname.value,
      password: password.value,
    };

    await createComment({
      variables: { input, videoId },

      update: (cache, { data }) => {
        if (!data?.createComment.ok) return;

        const existingComments: GetCommentsByVideoId | null = cache.readQuery({
          query: GET_COMMENT_BY_ID,
          variables: { videoId, sortingType },
        });

        if (!existingComments) return;

        const newComment: Comment = {
          id: data.createComment.commentId, // This should be a unique identifier for the new comment
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          nickname: nickname.value,
          content: content.value,
          likes: 0,
          dislikes: 0,
          replies: [],
        };

        cache.updateQuery(
          { query: GET_COMMENT_BY_ID, variables: { videoId, sortingType } },
          () => ({
            getCommentsByVideoId: [
              newComment,
              ...existingComments.getCommentsByVideoId,
            ],
          })
        );
      },
    });

    localStorage.setItem("nickname", nickname.value);
    localStorage.setItem("password", password.value);

    content.resetInputValue();
  };

  const handleCloseClick = () => {
    content.resetInputValue();
  };

  return {
    handleCreateComment,
    data,
    error,
    content,
    nickname,
    password,
    handleCloseClick,
  };
};
