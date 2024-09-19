import TabContent from "@/components/Tabs/TabContent";
import Tabs from "@/components/Tabs/Tabs";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/hooks/pages/register/useRegister";

export default function RegisterFetcher() {
  const {
    activeTab,
    handleSiteUrlSubmit,
    setActiveTab,
    error,
    formData,
    handleChange,
    handleSubmit,
    directLoading,
    siteUrlLoading,
    handleKeyUp,
    reservationDateWeekday,
    reviewDeadlineWeekday,
  } = useRegister();

  const tabs = ["링크로 추가", "직접 입력"];

  return (
    <>
      <Tabs tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      <TabContent activeTab={activeTab} index={0}>
        <form onSubmit={handleSiteUrlSubmit}>
          <div className="mt-4">
            <label
              htmlFor="siteUrl"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              체험단 링크
            </label>
            <input
              type="siteUrl"
              id="siteUrl"
              name="siteUrl"
              value={formData.siteUrl}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://www.example.com/experience"
              autoFocus
              autoComplete="off"
              required
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              disabled={siteUrlLoading}
              className="w-full p-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 disabled:cursor-not-allowed"
            >
              등록하기
            </Button>
          </div>
          <div className="mt-4 text-red-500">{error}</div>
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
                <span className="block text-blue-600">
                  다른 체험단이나 기능이 필요하시면 디스코드나 블로그에 댓글을
                  남겨주세요!
                </span>
                <div className="flex justify-around my-2">
                  <a
                    href="https://blog.naver.com/investment-story/223588068176"
                    target="_blank"
                    className="mt-2 inline-block p-2 bg-orange-500 text-white rounded-md hover:bg-orange-400 transition"
                  >
                    블로그 방문하기
                  </a>
                  <a
                    href="https://discord.gg/mdUhEKBku3"
                    target="_blank"
                    className="mt-2 inline-block p-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition"
                  >
                    디스코드 방문하기
                  </a>
                </div>
              </div>
            </ol>
          </div>
        </form>
      </TabContent>
      <TabContent activeTab={activeTab} index={1}>
        <form onSubmit={handleSubmit}>
          {/* 기본 정보 */}
          <div className="mt-4">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              제목 (필수)
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="체험 제목을 입력하세요"
              autoComplete="off"
              autoFocus
              required
            />
          </div>
          <div className="my-4">
            <label
              htmlFor="platformName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              사이트명 (레뷰, 인스타, 미블 등)
            </label>
            <input
              type="text"
              id="platformName"
              name="platformName"
              value={formData.platformName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="사이트명을 입력하세요"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="reviewDeadline"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              리뷰 마감날짜 (필수)
            </label>
            <input
              type="date"
              id="reviewDeadline"
              name="reviewDeadline"
              value={formData.reviewDeadline}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {reviewDeadlineWeekday && (
              <p className="mt-2 text-gray-600 font-semibold space-x-1">
                <span>선택하신 날짜의 요일:</span>
                <span className="text-blue-600">{reviewDeadlineWeekday}</span>
              </p>
            )}
          </div>
          {/* 추가 정보 */}
          <div className="mb-4">
            <label
              htmlFor="serviceAmount"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              협찬비
            </label>
            <input
              type="number"
              id="serviceAmount"
              name="serviceAmount"
              inputMode="numeric"
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              value={formData.serviceAmount}
              min={0}
              max={1000000000}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="협찬비를 입력하세요"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="extraAmount"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              추가로 사용한 비용
            </label>
            <input
              type="number"
              id="extraAmount"
              name="extraAmount"
              inputMode="numeric"
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              value={formData.extraAmount}
              min={0}
              max={1000000000}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="추가로 사용한 비용을 입력하세요"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="reservationDate"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              방문 날짜
            </label>
            <input
              type="datetime-local"
              id="reservationDate"
              name="reservationDate"
              value={formData.reservationDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="방문 날짜를 입력하세요"
            />
            {reservationDateWeekday && (
              <p className="mt-2 text-gray-600 font-semibold space-x-1">
                <span>선택하신 날짜의 요일:</span>
                <span className="text-blue-600">{reservationDateWeekday}</span>
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="serviceDetails"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              상품 제공 내역
            </label>
            <textarea
              id="serviceDetails"
              name="serviceDetails"
              value={formData.serviceDetails}
              onChange={handleChange}
              rows={20}
              autoComplete="off"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="상품 제공 내역을 입력하세요"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              위치
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              autoComplete="off"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="위치를 입력하세요"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="detailedViewLink"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              자세히 보기 링크
            </label>
            <input
              type="url"
              id="detailedViewLink"
              name="detailedViewLink"
              value={formData.detailedViewLink}
              onChange={handleChange}
              autoComplete="off"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="자세히 보기 링크를 입력하세요"
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button
              type="submit"
              disabled={directLoading}
              className="w-full p-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
            >
              등록하기
            </Button>
          </div>
          <div className="mt-4 text-red-500">{error}</div>
        </form>
      </TabContent>
    </>
  );
}
