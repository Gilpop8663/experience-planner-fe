export const getYoutubeThumbnailImage = (videoUrl: string) => {
  /**
   * 고해상도 썸네일(1280x720, 1920x1080) : maxresdefault.jpg
   * 중간 해상도 썸네일(640x480) : sddefault.jpg
   * 고품질 썸네일(480x360) : hqdefault.jpg
   * 중간품질 썸네일(320x180) : mqdefault.jpg
   * 보통품질 썸네일(120x90) : default.jpg
   * 표준형 썸네일(640x480) : sddefault.jpg
   * 출처: https://blog.naver.com/PostView.naver?blogId=lambmino&logNo=221807910175&parentCategoryNo=&categoryNo=&viewDate=&isShowPopularPosts=false&from=postView
   */
  return `https://i.ytimg.com/vi/${videoUrl}/default.jpg`;
};

interface NoembedResponse {
  author_name: string;
  author_url: string;
  height: number;
  html: string;
  provider_name: string;
  provider_url: string;
  thumbnail_height: number;
  thumbnail_url: string;
  thumbnail_width: number;
  title: string;
  type: string;
  url: string;
  version: string;
  width: number;
}

export const getYoutubeTitleAndAuthor = async (videoUrl: string) => {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoUrl}`;
  const embedUrl = "https://noembed.com/embed?url=";

  const fetchUrl = embedUrl + youtubeUrl;

  const response = await fetch(fetchUrl);

  const data: NoembedResponse = await response.json();

  return { title: data.title, author: data.author_name };
};
