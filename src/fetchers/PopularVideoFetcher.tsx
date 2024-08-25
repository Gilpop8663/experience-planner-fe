import { usePopularVideo } from "../hooks/query/usePopularVideo";
import PopularVideoList from "../components/videos/PopularVideoList";

export default function PopularVideoFetcher() {
  const { data } = usePopularVideo();

  return <PopularVideoList videoData={data} />;
}
