import { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";

export default function HealthCheckPage() {
  return (
    <div>
      <ErrorBoundary fallback={<span>데이터 불러오기 실패</span>}>
        <Suspense fallback={<span>로딩중...</span>}></Suspense>
      </ErrorBoundary>
    </div>
  );
}
