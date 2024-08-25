export interface Video {
  id: number;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  dislikes: number;
  comments: {
    id: number;
    content: string;
    nickname: string;
  }[];
}
