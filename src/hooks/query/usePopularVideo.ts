import { useSuspenseQuery } from "@apollo/client";
import { Video } from "../../types/video";
import { GET_ALL_VIDEOS } from "../../gql/query";

interface GetAllVideoResponse {
  getAllVideos: Video[];
}

export const usePopularVideo = () => {
  const { data } = useSuspenseQuery<GetAllVideoResponse>(GET_ALL_VIDEOS, {
    fetchPolicy: "no-cache",
  });

  return { data: data.getAllVideos };
};
