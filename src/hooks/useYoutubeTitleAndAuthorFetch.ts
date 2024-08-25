import { useEffect, useState } from "react";
import { getYoutubeTitleAndAuthor } from "../utils/youtube";

export const useYoutubeTitleAndAuthorFetch = (videoUrl: string) => {
  const [data, setData] = useState<{ title: string; author: string } | null>(
    null
  );

  useEffect(() => {
    getYoutubeTitleAndAuthor(videoUrl).then((data) => setData(data));
  });

  return { data };
};
