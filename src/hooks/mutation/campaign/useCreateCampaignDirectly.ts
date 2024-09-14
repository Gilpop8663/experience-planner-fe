import { useMutation } from "@apollo/client";
import { CREATE_CAMPAIGN_DIRECTLY } from "@/gql/mutation/campaign";
import {
  GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
  GET_EXPIRED_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
} from "@/gql/query/campaign";

interface Result {
  createCampaignDirectly: {
    ok: boolean;
    error: null | string;
    campaignId: number | null;
  };
}

interface Props {
  title: string;
  reviewDeadline: string;
  platformName?: string;
  serviceDetails?: string;
  location?: string;
  detailedViewLink?: string;
  serviceAmount?: number;
  userId?: number;
  extraAmount?: number;
  reservationDate?: string;
}

export const useCreateCampaignDirectly = () => {
  const [createCampaignDirectly, { data, error, loading }] =
    useMutation<Result>(CREATE_CAMPAIGN_DIRECTLY);

  const handleCreateCampaignDirectly = async (input: Props) => {
    const result = await createCampaignDirectly({
      variables: { input },
      refetchQueries: [
        { query: GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE },
        { query: GET_EXPIRED_CAMPAIGN_LIST_SORTED_BY_DEADLINE },
      ],
    });

    return result;
  };

  return { handleCreateCampaignDirectly, data, error, loading };
};
