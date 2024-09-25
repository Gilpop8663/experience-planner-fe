import { Button } from "@/components/Button";
import EllipsisVertical from "@/components/icons/EllipsisVertical";
import DeleteCardModal from "@/components/modal/DeleteCardModal";
import { useCard } from "@/hooks/pages/main/useCard";
import { useGetCampaignDetail } from "@/hooks/query/campaign/useGetCampaignDetail";
import { ROUTES } from "@/router/routes";
import { formatDate, formatDateTime } from "@/utils";
import {
  MapPin,
  Calendar,
  DollarSign,
  Package,
  Link as LinkIcon,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function CampaignDetailFetcher() {
  const { id } = useParams();
  const { data } = useGetCampaignDetail({ campaignId: Number(id) });
  const campaign = data.getCampaignDetail.data;
  const nearByCampaign = data.getCampaignDetail.nearByCampaign;
  const navigate = useNavigate();
  const {
    isOpen,
    formRef,
    formData,
    handleChange,
    handleReservationReset,
    handleCompleteReview,
    error,
    handleActionClick,
    deleteModal,
    isModalOpen,
    handleDelete,
    handleDeleteModalOpen,
    handleReservationDateSubmit,
    toggleOpen,
    close,
  } = useCard(campaign);

  const handleBackRoute = () => {
    if (window.history.state.idx > 1) {
      navigate(-1);
      return;
    }

    navigate(ROUTES.MAIN);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-32 border">
      <button
        className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        onClick={handleBackRoute}
      >
        <ArrowLeft className="mr-2" size={20} />
        뒤로 가기
      </button>

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6">{campaign.title}</h1>
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
            title={campaign.title}
            isOpen={deleteModal.isOpen}
            onClose={deleteModal.close}
            onConfirm={handleDelete}
          />
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-4">
          <p className="flex items-center">
            <MapPin className="mr-2" size={20} />
            {campaign.location}
          </p>
          <p className="flex items-center">
            <Calendar className="mr-2" size={20} />
            <span>리뷰 마감일:</span>
            <span>{formatDate(campaign.reviewDeadline)}</span>
          </p>
          <p className="flex items-center">
            <DollarSign className="mr-2" size={20} />
            협찬 비용: {campaign.serviceAmount}
          </p>
          <p className="flex items-center">
            <DollarSign className="mr-2" size={20} />
            추가로 사용한 비용: {campaign.extraAmount}
          </p>
          <p className="flex items-center">
            <Package className="mr-2" size={20} />
            제공: {campaign.serviceDetails}
          </p>
        </div>
        <div className="space-y-4">
          <p className="font-semibold">사이트: {campaign.platformName}</p>
          <a
            href={campaign.detailedViewLink}
            className="text-blue-500 hover:underline flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkIcon className="mr-2" size={20} />
            자세히 보기
          </a>

          <div className="flex flex-col mt-4  font-inter">
            <span
              onClick={toggleOpen}
              className="text-lg font-bold hover:bg-black/10 cursor-pointer w-fit"
            >
              방문 날짜 선택하기
            </span>

            <span className="text-sm">
              {formatDateTime(campaign.reservationDate)}
            </span>

            {!campaign.isReviewCompleted && (
              <Button
                type="button"
                className="mt-4"
                onClick={handleCompleteReview}
              >
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
      </div>
      <div className="border-t pt-6">
        <h2 className="text-2xl font-bold mb-4">근처의 다른 체험</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nearByCampaign.length > 0 &&
            nearByCampaign.map((exp) => (
              <div key={exp.id} className="border p-4 rounded-lg">
                <h3 className="font-semibold mb-2">{exp.title}</h3>
                <p className="text-sm text-gray-600">{exp.location}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
