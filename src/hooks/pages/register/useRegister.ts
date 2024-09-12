import { useCreateCampaignDirectly } from "@/hooks/mutation/campaign/useCreateCampaignDirectly";
import { useCreateCampaignFromLink } from "@/hooks/mutation/campaign/useCreateCampaignFromLink";
import { useEditCampaign } from "@/hooks/mutation/campaign/useEditCampaign";
import { useGetCampaignDetail } from "@/hooks/query/campaign/useGetCampaignDetail";
import { useMyProfile } from "@/hooks/query/user/useMyProfile";
import { ROUTES } from "@/router/routes";
import { convertToKST, formatDate } from "@/utils";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useRegister = () => {
  const { user } = useMyProfile();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetCampaignDetail({ campaignId: id ? Number(id) : 0 });

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    platformName: "",
    reviewDeadline: "",
    serviceAmount: 0,
    reservationDate: "",
    serviceDetails: "",
    location: "",
    detailedViewLink: "",
    siteUrl: "",
    extraAmount: 0,
  });

  const [activeTab, setActiveTab] = useState(0);

  const { handleCreateCampaignFromLink } = useCreateCampaignFromLink();
  const { handleCreateCampaignDirectly } = useCreateCampaignDirectly();
  const { handleEditCampaign } = useEditCampaign();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    const getValue = () => {
      if (name === "serviceAmount" || name === "extraAmount") {
        return Number(value);
      }

      return value;
    };

    setError("");
    setFormData({ ...formData, [name]: getValue() });
  };

  const handleSiteUrlSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (data.getCampaignDetail.ok) {
      setError("직접 입력하여 수정하는 것만 가능합니다.");
      return;
    }

    const result = await handleCreateCampaignFromLink({
      detailedViewLink: formData.siteUrl,
      userId: user.id,
    });

    if (!result.data?.createCampaignFromLink.ok) {
      setError("체험단 등록에 실패했습니다. 올바른 URL을 입력해주세요.");
      return;
    }

    navigate(ROUTES.HOME);
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

    if (data.getCampaignDetail.ok) {
      const result = await handleEditCampaign({
        campaignId: Number(id),
        title,
        extraAmount,
        serviceAmount,
        location,
        platformName,
        reservationDate,
        reviewDeadline,
        serviceDetails,
        detailedViewLink,
      });

      if (!result.data?.editCampaign.ok) {
        setError(
          result.data?.editCampaign.error || "체험단 수정에 실패했습니다.",
        );
        return;
      }

      navigate(ROUTES.HOME);

      return;
    }

    const result = await handleCreateCampaignDirectly({
      title,
      extraAmount,
      location,
      platformName,
      reservationDate,
      reviewDeadline,
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

    navigate(ROUTES.HOME);
  };

  useEffect(() => {
    const campaign = data.getCampaignDetail.data;

    if (campaign) {
      setActiveTab(1);
      setFormData({
        title: campaign.title ?? "",
        platformName: campaign.platformName ?? "",
        reviewDeadline: formatDate(campaign.reviewDeadline || ""),
        reservationDate: convertToKST(campaign.reservationDate || ""),
        serviceAmount: campaign.serviceAmount ?? 0,
        serviceDetails: campaign.serviceDetails ?? "",
        location: campaign.location ?? "",
        detailedViewLink: campaign.detailedViewLink ?? "",
        siteUrl: "",
        extraAmount: campaign.extraAmount ?? 0,
      });
    }
  }, [data]);

  return {
    activeTab,
    setActiveTab,
    handleSiteUrlSubmit,
    formData,
    handleChange,
    error,
    handleSubmit,
  };
};
