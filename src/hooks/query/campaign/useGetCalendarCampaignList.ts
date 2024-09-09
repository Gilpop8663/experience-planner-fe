import { GET_CALENDAR_CAMPAIGN_LIST } from "@/gql/query/campaign";
import { useQuery } from "@apollo/client";

interface Result {
  getCalendarCampaignList: {
    ok: boolean;
    error: null | string;
    data: Array<{
      id: number;
      title: string;
      reviewDeadline: string;
    }>;
  };
}

interface Props {
  year: number;
  month: number;
}

export const useGetCalendarCampaignList = (input: Props) => {
  const { data, error, loading } = useQuery<Result>(
    GET_CALENDAR_CAMPAIGN_LIST,
    {
      variables: { input },
    },
  );

  return { data, error, loading };
};
