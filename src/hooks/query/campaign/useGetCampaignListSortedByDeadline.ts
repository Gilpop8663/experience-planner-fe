import { GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE } from "@/gql/query/campaign";
import { Campaign } from "@/types/campaign";
import { useSuspenseQuery } from "@apollo/client";

interface Result {
  getCampaignListSortedByDeadline: {
    ok: boolean;
    error: null | string;
    data: Campaign[];
  };
}

export const useGetCampaignListSortedByDeadline = () => {
  const { data, error } = useSuspenseQuery<Result>(
    GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
  );

  return { data, error };
};
