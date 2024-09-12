import { useCreateCampaignDirectly } from "@/hooks/mutation/campaign/useCreateCampaignDirectly";
import { useCreateCampaignFromLink } from "@/hooks/mutation/campaign/useCreateCampaignFromLink";
import { useMyProfile } from "@/hooks/query/user/useMyProfile";
import { ROUTES } from "@/router/routes";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const { user } = useMyProfile();
  const navigate = useNavigate();

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

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setError("");
    setFormData({ ...formData, [name]: value });
  };

  const handleSiteUrlSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
