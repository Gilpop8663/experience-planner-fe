import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Skeleton from "./Skeleton";

export default function ExperienceRegistrationLoading() {
  return (
    <div>
      <Card className="w-full max-w-3xl mx-auto mt-28">
        <CardHeader>
          <CardTitle>사용자 정보</CardTitle>
        </CardHeader>
        <CardContent>
          {/* 왼쪽에서 오른쪽으로 이동하는 색상 스켈레톤 로딩 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-48 h-6" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-48 h-6" />
            </div>
            <Skeleton className="w-36 h-10" />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center p-8">
        <Card className="w-full max-w-screen-2xl">
          <div className="flex justify-evenly">
            <div className="flex flex-col items-center">
              <CardHeader>
                <CardTitle>총 협찬 비용</CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="w-40 h-8" />
              </CardContent>
            </div>
            <div className="flex flex-col items-center">
              <CardHeader>
                <CardTitle>총 소비한 비용</CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="w-40 h-8" />
              </CardContent>
            </div>
          </div>
          <CardHeader>
            <CardTitle>종료된 캠페인</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full h-40" />
          </CardContent>
        </Card>
      </div>

      <Card className="w-full max-w-3xl mx-auto py-8 mb-28">
        <CardHeader>
          <CardTitle>회원 탈퇴</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-36 h-10" />
        </CardContent>
      </Card>
    </div>
  );
}
