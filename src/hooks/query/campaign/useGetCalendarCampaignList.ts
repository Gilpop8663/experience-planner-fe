import { GET_CALENDAR_CAMPAIGN_LIST } from "@/gql/query/campaign";
import { client } from "@/main";
import { Campaign } from "@/types/campaign";
import { useSuspenseQuery } from "@apollo/client";
import { useEffect } from "react";

interface Result {
  getCalendarCampaignList: {
    ok: boolean;
    error: null | string;
    data: Campaign[];
  };
}

interface Props {
  year: number;
  month: number;
}

export const useGetCalendarCampaignList = (input: Props) => {
  const { data, error } = useSuspenseQuery<Result>(GET_CALENDAR_CAMPAIGN_LIST, {
    variables: { input },
  });

  const { month, year } = input;

  const previousMonth = month === 1 ? 12 : month - 1;
  const previousYear = month === 1 ? year - 1 : year;

  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  // 캐시를 통해 이전 달과 다음 달 데이터를 미리 요청
  const prefetchData = async (year: number, month: number) => {
    try {
      const { data } = await client.query({
        query: GET_CALENDAR_CAMPAIGN_LIST,
        variables: {
          input: { year, month },
        },
        fetchPolicy: "cache-first",
      });

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    prefetchData(previousYear, previousMonth);
    prefetchData(nextYear, nextMonth);
  }, [year, month, previousMonth, previousYear, nextMonth, nextYear]);

  return { data, error };
};
