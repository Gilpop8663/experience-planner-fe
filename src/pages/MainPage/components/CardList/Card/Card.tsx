import EllipsisVertical from "@/components/icons/EllipsisVertical";
import { useEditCampaign } from "@/hooks/mutation/campaign/useEditCampaign";
import useOpen from "@/hooks/useOpen";
import { Campaign } from "@/types/campaign";
import { cls, formatDateTime, formatDate, convertToKST } from "@/utils";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

export default function Card(campaign: Campaign) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const {
    title,
    reservationDate,
    serviceDetails,
    location,
    detailedViewLink,
    reviewDeadline,
  } = campaign;

  const [formData, setFormData] = useState({
    reservationDate: convertToKST(reservationDate || ""),
  });

  const [error, setError] = useState("");

  const { handleEditCampaign } = useEditCampaign();

  const { close, isOpen, toggleOpen } = useOpen();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleReservationReset = async () => {
    if (!reservationDate) {
      setError("");
      close();
      return;
    }

    const result = await handleEditCampaign({
      title: campaign.title,
      reviewDeadline: campaign.reviewDeadline,
      campaignId: campaign.id,
      reservationDate: new Date(0).toISOString(),
    });

    if (!result.data?.editCampaign.ok) {
      setError("방문 날짜 선택에 실패했습니다.");
      return;
    }

    close();
  };

  const handleReservationDateSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const result = await handleEditCampaign({
      title: campaign.title,
      reviewDeadline: campaign.reviewDeadline,
      reservationDate: formData.reservationDate,
      campaignId: campaign.id,
    });

    if (!result.data?.editCampaign.ok) {
      setError("방문 날짜 선택에 실패했습니다.");
      return;
    }

    setError("");
    close();
  };

  const handleActionClick = () => {
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen]);

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
                <button
                  className="text-center w-full border-b py-0.5 hover:bg-black/5"
                  type="button"
                >
                  체험 정보 수정
                </button>
                <button
                  className="text-center w-full py-0.5 hover:bg-black/5"
                  type="button"
                >
                  체험 정보 삭제
                </button>
              </div>
            )}
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
              <span className="font-light">{serviceDetails}</span>
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
