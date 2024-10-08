import { useCompleteReviewAndEndCampaign } from "@/hooks/mutation/campaign/useCompleteReviewAndEndCampaign";
import { useDeleteCampaign } from "@/hooks/mutation/campaign/useDeleteCampaign";
import { useEditCampaign } from "@/hooks/mutation/campaign/useEditCampaign";
import useOpen from "@/hooks/useOpen";
import { ROUTES } from "@/router/routes";
import { Campaign } from "@/types/campaign";
import { convertToLocalTime } from "@/utils";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useCard = (campaign: Campaign) => {
  const { id } = useParams();
  const { reservationDate } = campaign;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    reservationDate: convertToLocalTime(reservationDate || ""),
  });
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const { handleEditCampaign } = useEditCampaign();
  const { handleDeleteCampaign } = useDeleteCampaign();
  const { handleCompleteReviewAndEndCampaign } =
    useCompleteReviewAndEndCampaign();

  const { close, isOpen, toggleOpen } = useOpen();
  const deleteModal = useOpen();

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

    const utcReservationDate = new Date(formData.reservationDate).toISOString(); // 사용자가 입력한 날짜를 UTC로 변환

    const result = await handleEditCampaign({
      reservationDate: utcReservationDate,
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

  const handleDeleteModalOpen = () => {
    deleteModal.open();
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    await handleDeleteCampaign({ campaignId: campaign.id });
    deleteModal.close();

    if (id) {
      navigate(ROUTES.HOME);
    }
  };

  const handleCompleteReview = () => {
    handleCompleteReviewAndEndCampaign({ campaignId: campaign.id });
  };

  useEffect(() => {
    if (isOpen && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen]);

  useEffect(() => {
    setFormData({
      reservationDate: convertToLocalTime(reservationDate || ""),
    });
  }, [reservationDate]);

  return {
    isModalOpen,
    handleActionClick,
    toggleOpen,
    isOpen,
    formRef,
    handleReservationDateSubmit,
    formData,
    handleChange,
    handleReservationReset,
    error,
    deleteModal,
    handleDeleteModalOpen,
    handleDelete,
    handleCompleteReview,
    close,
  };
};
