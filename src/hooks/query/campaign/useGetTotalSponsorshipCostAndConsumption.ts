import { GET_TOTAL_SPONSORSHIP_COST_AND_CONSUMPTION } from "@/gql/query/campaign";
import { useSuspenseQuery } from "@apollo/client";

interface Result {
  getTotalSponsorshipCostAndConsumption: {
    ok: boolean;
    error: null | string;
    totalSponsorshipCost: number;
    totalConsumptionCost: number;
  };
}

export const useGetTotalSponsorshipCostAndConsumption = () => {
  const { data, error } = useSuspenseQuery<Result>(
    GET_TOTAL_SPONSORSHIP_COST_AND_CONSUMPTION,
  );

  return { data, error };
};
