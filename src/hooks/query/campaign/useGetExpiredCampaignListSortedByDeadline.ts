import { useSuspenseQuery } from "@apollo/client";
import { GET_EXPIRED_CAMPAIGN_LIST_SORTED_BY_DEADLINE } from "@/gql/query/campaign";
import { Campaign } from "@/types/campaign";

interface Result {
  getExpiredCampaignListSortedByDeadline: {
    ok: boolean;
    error: null | string;
    data: Campaign[];
  };
}

export const useGetExpiredCampaignListSortedByDeadline = () => {
  const { data, error } = useSuspenseQuery<Result>(
    GET_EXPIRED_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
  );

  return { data, error };
};
