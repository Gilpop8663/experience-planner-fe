import { useParams } from "react-router-dom";

export const useGetVideoId = () => {
  const { id } = useParams();

  const videoId = Number(id);

  return { videoId };
};
