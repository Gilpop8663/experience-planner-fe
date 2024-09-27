import { AMOUNT } from "@/constants";
import { useCreateCampaignDirectly } from "@/hooks/mutation/campaign/useCreateCampaignDirectly";
import { useEditCampaign } from "@/hooks/mutation/campaign/useEditCampaign";
import { useGetCampaignDetail } from "@/hooks/query/campaign/useGetCampaignDetail";
import { useMyProfile } from "@/hooks/query/user/useMyProfile";
import { ROUTES } from "@/router/routes";
import {
  convertToLocalTime,
  formatInputDate,
  getEndOfDay,
  getKoreanWeekday,
} from "@/utils";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useDirectInputRegister = () => {
  const { user } = useMyProfile();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetCampaignDetail({ campaignId: id ? Number(id) : 0 });
  const [formData, setFormData] = useState({
    title: "",
    platformName: "",
    reviewDeadline: "",
    serviceAmount: 0,
    reservationDate: "",
    serviceDetails: "",
    location: "",
    detailedViewLink: "",
    extraAmount: 0,
  });
  const [error, setError] = useState("");
  const { handleCreateCampaignDirectly, loading: directLoading } =
    useCreateCampaignDirectly();
  const { handleEditCampaign, loading: editLoading } = useEditCampaign();

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const element = event.currentTarget;
    const regex = /[^0-9]/g; // 숫자가 아닌 모든 문자

    // 숫자가 아닌 문자를 제거
    element.value = element.value.replace(regex, "");
  };

  const validate = () => {
    if (formData.serviceAmount < 0 || formData.extraAmount < 0) {
      setError("금액은 0원 이상 입력해야 합니다.");
      return false;
    }

    if (formData.title.length < 2 || formData.title.length > 30) {
      setError("제목은 2글자 이상 30글자 이하로 입력해야 합니다.");
      return false;
    }

    return true;
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    if (name === "serviceAmount" || name === "extraAmount") {
      const check = /[a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
      const inputValue = event.nativeEvent as InputEvent;

      if (inputValue.data && check.test(inputValue.data)) {
        return null;
      }
    }

    const getValue = () => {
      event.currentTarget.setCustomValidity("");
      if (name === "serviceAmount" || name === "extraAmount") {
        if (Number(value) < AMOUNT.MIN) {
          event.currentTarget.setCustomValidity(
            `${AMOUNT.MIN}원 이상만 입력 가능합니다.`,
          );
          event.currentTarget.reportValidity();
          return;
        }

        if (Number(value) > AMOUNT.MAX) {
          event.currentTarget.setCustomValidity(
            `${AMOUNT.MAX.toLocaleString("ko")}원 이하만 입력 가능합니다.`,
          );
          event.currentTarget.reportValidity();
          return;
        }

        return Number(value);
      }

      return value;
    };

    setError("");
    setFormData({ ...formData, [name]: getValue() });
  };

  const successRoute = () => {
    if (window.history.state.idx > 1) {
      navigate(-1);
      return;
    }

    navigate(ROUTES.MAIN);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      reservationDate,
      detailedViewLink,
      extraAmount,
      location,
      serviceDetails,
      reviewDeadline,
      platformName,
      serviceAmount,
      title,
    } = formData;

    if (!validate()) {
      return;
    }

    if (directLoading || editLoading) return;

    const utcReservationDate = reservationDate
      ? new Date(reservationDate).toISOString() // 사용자가 입력한 날짜를 UTC로 변환
      : new Date(0).toISOString();

    const endOfReviewTime = getEndOfDay(new Date(reviewDeadline));

    const utcReviewDeadline = new Date(endOfReviewTime).toISOString(); // 사용자가 입력한 날짜를 UTC로 변환

    if (data.getCampaignDetail.ok) {
      const result = await handleEditCampaign({
        campaignId: Number(id),
        title,
        extraAmount,
        serviceAmount,
        location,
        platformName,
        reservationDate: utcReservationDate,
        reviewDeadline: utcReviewDeadline,
        serviceDetails,
        detailedViewLink,
      });

      if (!result.data?.editCampaign.ok) {
        setError(
          result.data?.editCampaign.error || "체험단 수정에 실패했습니다.",
        );
        return;
      }

      successRoute();
      return;
    }

    const result = await handleCreateCampaignDirectly({
      title,
      extraAmount,
      location,
      platformName,
      reservationDate: utcReservationDate,
      reviewDeadline: utcReviewDeadline,
      serviceAmount,
      serviceDetails,
      userId: user.id,
      detailedViewLink,
    });

    if (!result.data?.createCampaignDirectly.ok) {
      setError(
        result.data?.createCampaignDirectly.error ||
          "체험단 등록에 실패했습니다.",
      );
      return;
    }

    navigate(ROUTES.MAIN);
  };

  useEffect(() => {
    const campaign = data.getCampaignDetail.data;

    if (!data.getCampaignDetail.ok) {
      navigate(ROUTES.REGISTER);
      return;
    }

    setFormData({
      title: campaign.title ?? "",
      platformName: campaign.platformName ?? "",
      reviewDeadline: formatInputDate(campaign.reviewDeadline || ""),
      reservationDate: convertToLocalTime(campaign.reservationDate || ""),
      serviceAmount: campaign.serviceAmount ?? 0,
      serviceDetails: campaign.serviceDetails ?? "",
      location: campaign.location ?? "",
      detailedViewLink: campaign.detailedViewLink ?? "",
      extraAmount: campaign.extraAmount ?? 0,
    });
  }, [data, navigate]);

  return {
    formData: {
      ...formData,
      serviceAmount: formData.serviceAmount === 0 ? "" : formData.serviceAmount,
      extraAmount: formData.extraAmount === 0 ? "" : formData.extraAmount,
    },
    handleChange,
    error,
    handleSubmit,
    directLoading: directLoading || editLoading,
    handleKeyUp,
    reviewDeadlineWeekday: getKoreanWeekday(formData.reviewDeadline),
    reservationDateWeekday: getKoreanWeekday(formData.reservationDate),
  };
};
