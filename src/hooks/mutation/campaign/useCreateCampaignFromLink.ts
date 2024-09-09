import { useMutation } from "@apollo/client";
import { CREATE_CAMPAIGN_FROM_LINK } from "@/gql/mutation/campaign";

interface Result {
  createCampaignFromLink: {
    ok: boolean;
    error: null | string;
    campaignId: number | null;
  };
}

interface Props {
  detailedViewLink: string;
  userId: number;
}

export const useCreateCampaignFromLink = () => {
  const [createCampaignFromLink, { data, error }] = useMutation<Result>(
    CREATE_CAMPAIGN_FROM_LINK,
  );

  const handleCreateCampaignFromLink = async (input: Props) => {
    const result = await createCampaignFromLink({
      variables: { input },
    });

    return result;
  };

  return { handleCreateCampaignFromLink, data, error };
};
