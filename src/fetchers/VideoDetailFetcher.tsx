import VideoDetail from "../components/videos/VideoDetail";
import { useVideoDetail } from "../hooks/query/useVideoDetail";

export default function VideoDetailFetcher() {
  const { data } = useVideoDetail();

  return <VideoDetail videoData={data} />;
}
