import { useHealthCheck } from "../hooks/query/useHealthCheck";

export default function HealthCheckFetcher() {
  const { data } = useHealthCheck();

  return (
    <div>
      <span>현재 서버 상태: </span>
      <span>{data.healthCheck.ok ? "좋음" : "나쁨"}</span>
    </div>
  );
}
