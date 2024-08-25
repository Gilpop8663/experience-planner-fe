import { useMutation } from "@apollo/client";
import { LIKE_VIDEO } from "../../gql/mutation";
import { useGetVideoId } from "../useGetVideoId";
import { GetVideoDetailByIdResponse } from "../query/useVideoDetail";
import { GET_VIDEO_DETAIL } from "../../gql/query";
import { useState } from "react";

interface LikeVideoResult {
  likeVideo: {
    ok: boolean;
    error: null | string;
  };
}

export const useLikeVideo = () => {
  const { videoId } = useGetVideoId();
  const [likeVideo, { data, error }] = useMutation<LikeVideoResult>(LIKE_VIDEO);
  const [liked, setLiked] = useState(
    JSON.parse(localStorage.getItem(`liked-video-${videoId}`) || "false")
  );

  const handleLikeVideo = async () => {
    const isIncrement = !liked;

    await likeVideo({
      variables: { videoId, isIncrement },
      update: (cache, { data }) => {
        if (!data?.likeVideo.ok) return;

        const existingVideo: GetVideoDetailByIdResponse | null =
          cache.readQuery({
            query: GET_VIDEO_DETAIL,
            variables: { videoId },
          });

        if (!existingVideo) return;

        const video = existingVideo.getVideoDetailById;

        const newVideo = {
          ...video,
          likes: isIncrement ? video.likes + 1 : video.likes - 1,
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
      localStorage.setItem(`liked-video-${videoId}`, JSON.stringify(true));
      setLiked(true);
    } else {
      localStorage.removeItem(`liked-video-${videoId}`);
      setLiked(false);
    }
  };

  return { handleLikeVideo, data, error, liked };
};
