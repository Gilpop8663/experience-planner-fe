import { ROUTES } from "@/router/routes";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ErrorFallbackProps {
  error: Error | null;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(ROUTES.HOME); // 홈으로 이동
  };

  const resetErrorBoundary = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 gap-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        에러가 발생했습니다!
      </h1>
      <p className="text-gray-700 mb-4">
        문제가 발생하여 페이지를 표시할 수 없습니다.
      </p>
      <pre className="bg-gray-200 p-4 rounded mb-4">
        {error?.message ? error.message : "예상치 못한 문제가 발생했습니다."}
      </pre>
      <div className="space-x-12">
        <button
          onClick={handleGoHome}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          홈으로 이동
        </button>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
