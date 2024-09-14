import EllipsisVertical from "@/components/icons/EllipsisVertical";
import DeleteCardModal from "@/components/modal/DeleteCardModal";
import { useCard } from "@/hooks/pages/main/useCard";
import { ROUTES } from "@/router/routes";
import { Campaign } from "@/types/campaign";
import { cls, formatDateTime, formatDate } from "@/utils";
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
              <div className="bg-white border absolute w-32 justify-center rounded-sm text-xs right-6 -top-1">
                <Link to={`${ROUTES.REGISTER}/edit/${id}`}>
                  <button
                    className="text-center w-full border-b py-0.5 hover:bg-black/5"
                    type="button"
                  >
                    체험 정보 수정
                  </button>
                </Link>
                <button
                  onClick={handleDeleteModalOpen}
                  className="text-center w-full py-0.5 hover:bg-black/5"
                  type="button"
                >
                  체험 정보 삭제
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
            <span className="font-bold">리뷰마감일: </span>
            <span className="font-light">{formatDate(reviewDeadline)}</span>
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
              선택하기
            </button>
            <button
              onClick={handleReservationReset}
              type="button"
              className="w-full p-3 font-bold text-white bg-orange-600 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-blue-500 mt-4"
            >
              초기화
            </button>
            <div className="mt-4 text-red-500">{error}</div>
          </form>
        )}
      </div>
    </div>
  );
}
