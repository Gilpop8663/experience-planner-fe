import ErrorBoundary from "@/components/ErrorBoundary";
import Layout from "@/components/Layout";
import RegisterFetcher from "@/fetchers/RegisterFetcher";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 py-12">
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
            체험 등록
          </h2>
          <ErrorBoundary fallback={<span>에러</span>}>
            <Suspense fallback={<span>로딩중...</span>}>
              <RegisterFetcher />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </Layout>
  );
}
