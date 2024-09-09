import { GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE } from "@/gql/query/campaign";
import { useQuery } from "@apollo/client";

interface Result {
  getCampaignListSortedByDeadline: {
    ok: boolean;
    error: null | string;
    data: Array<{
      id: number;
      title: string;
      reviewDeadline: string;
    }>;
  };
}

export const useGetCampaignListSortedByDeadline = () => {
  const { data, error, loading } = useQuery<Result>(
    GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
  );

  return { data, error, loading };
};
