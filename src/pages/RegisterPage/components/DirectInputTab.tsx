import { Button } from "@/components/ui/button";
import { useDirectInputRegister } from "@/hooks/pages/register/useDirectInputRegister";

export default function DirectInputTab() {
  const {
    directLoading,
    error,
    formData,
    handleChange,
    handleKeyUp,
    handleSubmit,
    reservationDateWeekday,
    reviewDeadlineWeekday,
  } = useDirectInputRegister();

  return (
    <form onSubmit={handleSubmit}>
      {/* 기본 정보 */}
      <div className="mt-4">
        <label
          htmlFor="title"
          className="block mb-2 font-medium text-gray-700 text-xs sm:text-xs sm:text-sm md:text-base md:text-base"
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
          maxLength={30}
          minLength={2}
          autoFocus
          required
        />
      </div>
      <div className="my-4">
        <label
          htmlFor="platformName"
          className="block mb-2 text-xs sm:text-sm md:text-base font-medium text-gray-700"
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
          className="block mb-2 text-xs sm:text-sm md:text-base font-medium text-gray-700"
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
          className="block mb-2 text-xs sm:text-sm md:text-base font-medium text-gray-700"
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
          className="block mb-2 text-xs sm:text-sm md:text-base font-medium text-gray-700"
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
          className="block mb-2 text-xs sm:text-sm md:text-base font-medium text-gray-700"
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
          className="block mb-2 text-xs sm:text-sm md:text-base font-medium text-gray-700"
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
          className="block mb-2 text-xs sm:text-sm md:text-base font-medium text-gray-700"
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
          className="block mb-2 text-xs sm:text-sm md:text-base font-medium text-gray-700"
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
          className="w-full text-xs sm:text-sm md:text-base p-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500"
        >
          등록하기
        </Button>
      </div>
      <div className="mt-4 text-red-500">{error}</div>
    </form>
  );
}
