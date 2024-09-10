import EllipsisVertical from "@/components/icons/EllipsisVertical";
import { Campaign } from "@/types/campaign";
import { cls } from "@/utils";
import { useState } from "react";

export default function Card(campaign: Campaign) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    title,
    reservationDate,
    serviceDetails,
    location,
    detailedViewLink,
    reviewDeadline,
  } = campaign;

  const handleActionClick = () => {
    setIsModalOpen((prev) => !prev);
  };

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
        <div className="flex flex-col gap-7 mt-7 font-semibold">
          <span className="text-lg">
            리뷰마감일: {reviewDeadline?.toString()}
          </span>
          <span className="text-lg">장소 : {location}</span>
          <span className="text-lg">제공 : {serviceDetails}</span>
          <a
            target="_blank"
            href={detailedViewLink}
            className="text-lg cursor-pointer hover:bg-black/10 w-fit"
          >
            사이트 바로가기
          </a>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-lg">일정 예약</span>
        <span className="text-sm">{reservationDate?.toString()}</span>
      </div>
      {/* <span className="font-inter font-bold text-white text-[160px] absolute right-6 bottom-6">
        {reservationDate ? "O" : "X"}
      </span> */}
    </div>
  );
}
