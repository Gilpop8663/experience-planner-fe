import { useState } from "react";
import Tabs from "../Tabs/Tabs";
import TabContent from "../Tabs/TabContent";
import Skeleton from "./Skeleton";
import { useParams } from "react-router-dom";

export default function RegisterLoading() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(id ? 1 : 0);
  const tabs = ["링크로 추가", "직접 입력"];
  return (
    <>
      <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      <TabContent activeTab={activeTab} index={0}>
        <form>
          <div className="mt-4">
            <label
              htmlFor="siteUrl"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              체험단 링크
            </label>

            <Skeleton className="w-full h-12" />
          </div>
          <div className="flex justify-center mt-4">
            <Skeleton className="w-full h-8" />
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              링크로 등록하기 튜토리얼
            </h3>
            <ol className="list-decimal list-inside space-y-2">
              <li className="text-gray-700">
                선정된 체험단 링크로 이동해주세요.
              </li>
              <li className="text-gray-700">
                선정된 체험단 링크를 복사 붙여넣기를 해줍니다.
              </li>
              <li className="text-gray-700">
                현재는 미블, 레뷰, 리뷰노트만 가능합니다.
              </li>
              <li className="text-gray-700">
                체험단 링크로 등록 시 약간의 시간이 걸릴 수 있습니다.
              </li>
              <div className="mt-2 p-3 bg-white border border-gray-300 rounded-md">
                <code className="block text-blue-600">
                  다른 체험단이나 기능을 원하신다면 디스코드나 블로그에 댓글로
                  달아주세요!
                </code>
              </div>
            </ol>
          </div>
        </form>
      </TabContent>
      <TabContent activeTab={activeTab} index={1}>
        <form>
          <div className="mt-4">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              제목 (필수)
            </label>
            <Skeleton className="w-full h-12" />
          </div>
          <div className="my-4">
            <label
              htmlFor="platformName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              사이트명 (레뷰, 인스타, 미블 등)
            </label>
            <Skeleton className="w-full h-12" />
          </div>
          <div className="mb-4">
            <label
              htmlFor="reviewDeadline"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              리뷰 마감날짜 (필수)
            </label>
            <Skeleton className="w-full h-12" />
          </div>
          {/* 추가 정보 */}
          <div className="mb-4">
            <label
              htmlFor="serviceAmount"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              협찬비
            </label>
            <Skeleton className="w-full h-12" />
          </div>
          <div className="mb-4">
            <label
              htmlFor="extraAmount"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              추가로 사용한 비용
            </label>
            <Skeleton className="w-full h-12" />
          </div>
          <div className="mb-4">
            <label
              htmlFor="reservationDate"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              방문 날짜
            </label>
            <Skeleton className="w-full h-12" />
          </div>
          <div className="mb-4">
            <label
              htmlFor="serviceDetails"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              상품 제공 내역
            </label>
            <Skeleton className="w-full h-60" />
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              위치
            </label>
            <Skeleton className="w-full h-12" />
          </div>
          <div className="mb-4">
            <label
              htmlFor="detailedViewLink"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              자세히 보기 링크
            </label>
            <Skeleton className="w-full h-12" />
          </div>
          <div className="flex justify-center mt-4">
            <Skeleton className="w-full h-12" />
          </div>
        </form>
      </TabContent>
    </>
  );
}
