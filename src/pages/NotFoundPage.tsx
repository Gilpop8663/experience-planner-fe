import { ROUTES } from "@/router/routes";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-lg text-gray-700">페이지를 찾을 수 없습니다.</p>
      <Link to={ROUTES.MAIN} className="mt-6 text-blue-500 hover:underline">
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFoundPage;
