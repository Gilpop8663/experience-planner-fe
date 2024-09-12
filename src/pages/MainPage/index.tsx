import { Suspense, useState } from "react";
import Layout from "@/components/Layout";
import CampaignListSortedByDeadlineFetcher from "@/fetchers/CampaignListSortedByDeadlineFetcher";
import RegisterButton from "./components/RegisterButton/RegisterButton";
import ErrorBoundary from "@/components/ErrorBoundary";
import CampaignListByCalendarFetcher from "@/fetchers/CampaignListByCalendarFetcher";

type ViewMode = "cards" | "calendar";

export default function MainPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("cards");

  const handleViewChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 absolute top-0 left-0 w-full -z-10" />
      <div className="">
        <div className="container px-4 py-8 mx-auto">
          <div className="mb-6">
            <button
              onClick={() => handleViewChange("calendar")}
              className={`px-4 py-2 font-semibold rounded-lg ${viewMode === "calendar" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"} hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500`}
            >
              달력형 보기
            </button>
            <button
              onClick={() => handleViewChange("cards")}
              className={`px-4 py-2 ml-4 font-semibold rounded-lg ${viewMode === "cards" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"} hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500`}
            >
              카드형 보기
            </button>
          </div>

          {viewMode === "calendar" ? (
            <div className="p-4 bg-white rounded-lg shadow-md">
              <Suspense fallback={"로딩중..."}>
                <CampaignListByCalendarFetcher />
              </Suspense>
            </div>
          ) : (
            <div className="">
              <ErrorBoundary fallback={<span>에러</span>}>
                <Suspense fallback={<span>로딩중...</span>}>
                  <CampaignListSortedByDeadlineFetcher />
                </Suspense>
              </ErrorBoundary>
            </div>
          )}
        </div>
        <div className="flex justify-center pb-[77px]">
          <RegisterButton />
        </div>
      </div>
    </Layout>
  );
}
