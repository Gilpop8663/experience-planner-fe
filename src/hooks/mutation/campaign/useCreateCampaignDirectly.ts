import { useMutation } from "@apollo/client";
import { CREATE_CAMPAIGN_DIRECTLY } from "@/gql/mutation/campaign";

interface Result {
  createCampaignDirectly: {
    ok: boolean;
    error: null | string;
    campaignId: number | null;
  };
}

interface Props {
  title: string;
  platformName: string;
  reviewDeadline: string;
  serviceDetails: string;
  location: string;
  detailedViewLink?: string;
  serviceAmount: number;
  userId: number;
  extraAmount: number;
  reservationDate: string;
}

export const useCreateCampaignDirectly = () => {
  const [createCampaignDirectly, { data, error }] = useMutation<Result>(
    CREATE_CAMPAIGN_DIRECTLY,
  );

  const handleCreateCampaignDirectly = async (input: Props) => {
    const result = await createCampaignDirectly({
      variables: { input },
    });

    return result;
  };

  return { handleCreateCampaignDirectly, data, error };
};
