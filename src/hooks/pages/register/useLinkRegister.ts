import { useCreateCampaignFromLink } from "@/hooks/mutation/campaign/useCreateCampaignFromLink";
import { useMyProfile } from "@/hooks/query/user/useMyProfile";
import { useFormInput } from "@/hooks/useInput";
import { ROUTES } from "@/router/routes";
import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useLinkRegister = () => {
  const { user } = useMyProfile();
  const navigate = useNavigate();
  const { id } = useParams();
  const siteUrl = useFormInput({ initialValue: "" });
  const [error, setError] = useState("");
  const { handleCreateCampaignFromLink, loading } = useCreateCampaignFromLink();

  const handleSiteUrlSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;

    if (id) {
      setError("직접 입력하여 수정할 수 없습니다.");
      return;
    }

    const result = await handleCreateCampaignFromLink({
      detailedViewLink: siteUrl.value,
      userId: user.id,
    });

    if (!result.data?.createCampaignFromLink.ok) {
      setError(
        result.data?.createCampaignFromLink.error ||
          "체험단 등록에 실패했습니다. 올바른 URL을 입력해주세요.",
      );
      return;
    }

    navigate(ROUTES.HOME);
  };

  return { handleSiteUrlSubmit, loading, error, siteUrl };
};
