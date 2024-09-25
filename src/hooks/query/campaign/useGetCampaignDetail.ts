import { GET_CAMPAIGN_DETAIL } from "@/gql/query/campaign";
import { Campaign } from "@/types/campaign";
import { useSuspenseQuery } from "@apollo/client";

interface Result {
  getCampaignDetail: {
    ok: boolean;
    error: null | string;
    data: Campaign;
    nearByCampaign: Campaign[];
  };
}

interface Props {
  campaignId: number;
}

export const useGetCampaignDetail = (input: Props) => {
  const { data, error } = useSuspenseQuery<Result>(GET_CAMPAIGN_DETAIL, {
    variables: { input },
  });

  return { data, error };
};
