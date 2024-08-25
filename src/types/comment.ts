export interface Comment {
  id: number;
  nickname: string;
  content: string;
  createdAt: string;
  likes: number;
  dislikes: number;
  updatedAt: string;
  replies: Reply[];
}

export interface Reply {
  id: number;
  nickname: string;
  content: string;
  createdAt: string;
  likes: number;
  dislikes: number;
  updatedAt: string;
}
