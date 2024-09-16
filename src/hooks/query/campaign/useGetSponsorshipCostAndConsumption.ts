import { GET_SPONSORSHIP_COST_AND_CONSUMPTION } from "@/gql/query/campaign";
import { client } from "@/main";
import { useSuspenseQuery } from "@apollo/client";
import { useEffect } from "react";

interface Result {
  getSponsorshipCostAndConsumption: {
    ok: boolean;
    error: null | string;
    sponsorshipCost: number;
    consumptionCost: number;
  };
}

interface Props {
  year: number;
  month: number;
}

export const useGetSponsorshipCostAndConsumption = (input: Props) => {
  const { data, error } = useSuspenseQuery<Result>(
    GET_SPONSORSHIP_COST_AND_CONSUMPTION,
    {
      variables: { input },
      fetchPolicy: "cache-and-network",
    },
  );

  const { year, month } = input;

  // 캐시를 통해 이전 달과 다음 달 데이터를 미리 요청하는 함수
  const prefetchData = async (year: number, month: number) => {
    try {
      const { data } = await client.query({
        query: GET_SPONSORSHIP_COST_AND_CONSUMPTION,
        variables: { input: { year, month } },
        fetchPolicy: "cache-first",
      });

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // 이전 달 및 다음 달 데이터 요청
    const previousMonth = month === 1 ? 12 : month - 1;
    const previousYear = month === 1 ? year - 1 : year;

    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;

    prefetchData(previousYear, previousMonth);
    prefetchData(nextYear, nextMonth);
  }, [year, month]);

  return { data, error };
};
