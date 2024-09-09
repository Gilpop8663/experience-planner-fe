import { useQuery } from "@apollo/client";
import { GET_EXPIRED_CAMPAIGN_LIST_SORTED_BY_DEADLINE } from "@/gql/query/campaign";

interface Result {
  getExpiredCampaignListSortedByDeadline: {
    ok: boolean;
    error: null | string;
    data: Array<{
      id: number;
      title: string;
      reviewDeadline: string;
    }>;
  };
}

export const useGetExpiredCampaignListSortedByDeadline = () => {
  const { data, error, loading } = useQuery<Result>(
    GET_EXPIRED_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
  );

  return { data, error, loading };
};
