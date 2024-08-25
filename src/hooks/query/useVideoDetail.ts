import { useSuspenseQuery } from "@apollo/client";
import { Video } from "../../types/video";
import { GET_VIDEO_DETAIL } from "../../gql/query";
import { useGetVideoId } from "../useGetVideoId";

export interface GetVideoDetailByIdResponse {
  getVideoDetailById: Video;
}

export const useVideoDetail = () => {
  const { videoId } = useGetVideoId();
  const { data } = useSuspenseQuery<GetVideoDetailByIdResponse>(
    GET_VIDEO_DETAIL,
    { variables: { videoId }, fetchPolicy: "cache-and-network" }
  );

  return { data: data.getVideoDetailById };
};
