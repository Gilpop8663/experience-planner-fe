import { useMutation } from "@apollo/client";
import { DISLIKE_VIDEO } from "../../gql/mutation";
import { useGetVideoId } from "../useGetVideoId";
import { GetVideoDetailByIdResponse } from "../query/useVideoDetail";
import { GET_VIDEO_DETAIL } from "../../gql/query";
import { useState } from "react";

interface DislikeVideoResult {
  dislikeVideo: {
    ok: boolean;
    error: null | string;
  };
}

export const useDislikeVideo = () => {
  const { videoId } = useGetVideoId();
  const [dislikeVideo, { data, error }] =
    useMutation<DislikeVideoResult>(DISLIKE_VIDEO);
  const [disliked, setDisliked] = useState(
    JSON.parse(localStorage.getItem(`disliked-video-${videoId}`) || "false")
  );

  const handleDislikeVideo = async () => {
    const isIncrement = !disliked;

    await dislikeVideo({
      variables: { videoId, isIncrement },
      update: (cache, { data }) => {
        if (!data?.dislikeVideo.ok) return;

        const existingVideo: GetVideoDetailByIdResponse | null =
          cache.readQuery({
            query: GET_VIDEO_DETAIL,
            variables: { videoId },
          });

        if (!existingVideo) return;

        const video = existingVideo.getVideoDetailById;

        const newVideo = {
          ...video,
          dislikes: isIncrement ? video.dislikes + 1 : video.dislikes - 1,
        };

        cache.updateQuery(
          { query: GET_VIDEO_DETAIL, variables: { videoId } },
          () => ({
            getVideoDetailById: newVideo,
          })
        );
      },
    });

    if (isIncrement) {
      localStorage.setItem(`disliked-video-${videoId}`, JSON.stringify(true));
      setDisliked(true);
    } else {
      localStorage.removeItem(`disliked-video-${videoId}`);
      setDisliked(false);
    }
  };

  return { handleDislikeVideo, data, error, disliked };
};
