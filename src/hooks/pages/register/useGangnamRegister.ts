import { useCreateGangnamCampaign } from "@/hooks/mutation/campaign/useCreateGangnamCampaign";
import { useMyProfile } from "@/hooks/query/user/useMyProfile";
import { useFormInput } from "@/hooks/useInput";
import { ROUTES } from "@/router/routes";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useGangnamRegister = () => {
  const { id } = useParams();
  const { user } = useMyProfile();
  const navigate = useNavigate();
  const siteContent = useFormInput();
  const [error, setError] = useState("");
  const { handleCreateGangnamCampaign, loading } = useCreateGangnamCampaign();

  const handleSiteContentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;

    if (id) {
      setError("직접 입력하여 수정할 수 없습니다.");
      return;
    }

    const result = await handleCreateGangnamCampaign({
      siteContent: siteContent.value,
      userId: user.id,
    });

    if (!result.data?.createGangnamCampaign.ok) {
      setError("강남맛집 본문으로 캠페인 생성에 실패했습니다.");
      return;
    }

    navigate(ROUTES.HOME);
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setError("");
    siteContent.onChange(event);
  };

  return {
    handleSiteContentSubmit,
    siteContent: {
      ...siteContent,
      onChange: handleChange,
    },
    loading,
    error,
  };
};
