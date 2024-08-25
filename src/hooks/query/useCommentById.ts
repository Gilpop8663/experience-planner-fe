import {
  useApolloClient,
  useReactiveVar,
  useSuspenseQuery,
} from "@apollo/client";
import { Comment } from "../../types/comment";
import { GET_COMMENT_BY_ID } from "../../gql/query";
import { sortOrderVar } from "../../contexts/sortingType";
import { useGetVideoId } from "../useGetVideoId";
import { useEffect } from "react";

export interface GetCommentsByVideoId {
  getCommentsByVideoId: Comment[];
}

export type SortingType = "popular" | "newest";

export const useCommentById = () => {
  const { videoId } = useGetVideoId();
  const client = useApolloClient();

  const sortingType = useReactiveVar(sortOrderVar);
  const { data } = useSuspenseQuery<GetCommentsByVideoId>(GET_COMMENT_BY_ID, {
    variables: { videoId, sortingType },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    const resetCacheAndRefetch = async () => {
      try {
        await client.refetchQueries({
          include: [GET_COMMENT_BY_ID],
        });
      } catch (error) {
        console.error("Error resetting cache and refetching:", error);
      }
    };

    resetCacheAndRefetch();
  }, [sortingType, client]);

  return {
    data: data.getCommentsByVideoId,
    sortingOption: sortingType,
  };
};
