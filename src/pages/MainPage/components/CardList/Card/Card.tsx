import { Button } from "@/components/Button";
import EllipsisVertical from "@/components/icons/EllipsisVertical";
import DeleteCardModal from "@/components/modal/DeleteCardModal";
import { useCard } from "@/hooks/pages/main/useCard";
import { ROUTES } from "@/router/routes";
import { Campaign } from "@/types/campaign";
import { cls, formatDate, formatDateTime } from "@/utils";
import { Link } from "react-router-dom";

export default function Card(campaign: Campaign) {
  const {
    id,
    title,
    reservationDate,
    serviceDetails,
    location,
    detailedViewLink,
    reviewDeadline,
    isReviewCompleted,
    extraAmount,
    serviceAmount,
  } = campaign;

  const {
    formData,
    formRef,
    handleActionClick,
    handleReservationDateSubmit,
    isModalOpen,
    isOpen,
    toggleOpen,
    error,
    handleChange,
    handleReservationReset,
    deleteModal,
    handleDeleteModalOpen,
    handleDelete,
    handleCompleteReview,
    close,
  } = useCard(campaign);

  return (
    <div
      className={cls(
        reservationDate ? "bg-[#B6E790]" : "bg-[#FFB0B0]",
        "w-[330px] h-[510px] rounded-sm shadow-lg py-11 px-7 flex flex-col justify-between relative overflow-scroll",
      )}
    >
      <div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-2xl">{title}</span>
          <span className="cursor-pointer relative" onClick={handleActionClick}>
            <div className="rounded-full hover:bg-black/10 p-0.5">
              <EllipsisVertical />
            </div>
            {isModalOpen && (
              <div className="bg-white border absolute w-16 justify-center rounded-sm text-sm right-6 -top-1">
                <Link to={`${ROUTES.REGISTER}/edit/${id}`}>
                  <button
                    className="text-center w-full border-b py-0.5 hover:bg-black/5"
                    type="button"
                  >
                    수정
                  </button>
                </Link>
                <button
                  onClick={handleDeleteModalOpen}
                  className="text-center w-full py-0.5 hover:bg-black/5"
                  type="button"
                >
                  삭제
                </button>
              </div>
            )}
            <DeleteCardModal
              title={title}
              isOpen={deleteModal.isOpen}
              onClose={deleteModal.close}
              onConfirm={handleDelete}
            />
          </span>
        </div>
        <div className="flex flex-col gap-7 mt-7 font-inter">
          <span className="text-lg">
            <span className="font-bold">리뷰마감일</span>
            <div className="font-light mt-2">{formatDate(reviewDeadline)}</div>
          </span>
          {location && (
            <span className="text-lg">
              <span className="font-bold">장소: </span>
              <span className="font-light">{location}</span>
            </span>
          )}
          {serviceDetails && (
            <span className="text-lg">
              <span className="font-bold">제공: </span>
              <span className="font-light break-words">{serviceDetails}</span>
            </span>
          )}
          {serviceAmount ? (
            <span className="text-lg">
              <span className="font-bold">협찬받은 비용: </span>
              <span className="font-light break-words">
                {serviceAmount.toLocaleString()}원
              </span>
            </span>
          ) : (
            ""
          )}
          {extraAmount ? (
            <span className="text-lg">
              <span className="font-bold">추가로 사용한 비용: </span>
              <span className="font-light break-words">
                {extraAmount.toLocaleString()}원
              </span>
            </span>
          ) : (
            ""
          )}
          {detailedViewLink && (
            <a
              target="_blank"
              href={detailedViewLink}
              className="text-lg cursor-pointer font-bold hover:bg-black/10 w-fit"
            >
              사이트 바로가기
            </a>
          )}
        </div>
      </div>
      <div className="flex flex-col mt-4  font-inter">
        <span
          onClick={toggleOpen}
          className="text-lg font-bold hover:bg-black/10 cursor-pointer w-fit"
        >
          방문 날짜 선택하기
        </span>

        <span className="text-sm">{formatDateTime(reservationDate)}</span>

        {!isReviewCompleted && (
          <Button type="button" className="mt-4" onClick={handleCompleteReview}>
            리뷰 완료 및 종료
          </Button>
        )}

        {isOpen && (
          <form
            ref={formRef}
            onSubmit={handleReservationDateSubmit}
            className="bg-white p-4 rounded-md mt-4"
          >
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="reservationDate"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                방문 날짜
              </label>
              <button
                onClick={close}
                type="button"
                className="text-bold"
                title="닫기"
              >
                X
              </button>
            </div>
            <input
              type="datetime-local"
              id="reservationDate"
              name="reservationDate"
              value={formData.reservationDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full p-3 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 mt-4"
            >
              저장하기
            </button>
            <button
              onClick={handleReservationReset}
              type="button"
              className="w-full p-3 font-bold text-white bg-orange-600 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-blue-500 mt-4"
            >
              날짜 초기화
            </button>
            <div className="mt-4 text-red-500">{error}</div>
          </form>
        )}
      </div>
    </div>
  );
}
