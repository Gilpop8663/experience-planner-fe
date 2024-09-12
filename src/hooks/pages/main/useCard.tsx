import { useEditCampaign } from "@/hooks/mutation/campaign/useEditCampaign";
import useOpen from "@/hooks/useOpen";
import { Campaign } from "@/types/campaign";
import { convertToKST } from "@/utils";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

export const useCard = (campaign: Campaign) => {
  const { title, reservationDate, reviewDeadline } = campaign;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

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
      title,
      reviewDeadline,
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
  };
};
