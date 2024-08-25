import CommentDetail from "../components/comments/CommentDetail";

import { useCommentById } from "../hooks/query/useCommentById";

export default function CommentFetcher() {
  const { data } = useCommentById();

  return <CommentDetail commentData={data} />;
}
