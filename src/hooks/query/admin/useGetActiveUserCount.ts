import { GET_ACTIVE_USER_COUNT } from "@/gql/query/admin";
import { useSuspenseQuery } from "@apollo/client";

interface Result {
  getActiveUserCount: {
    ok: boolean;
    error: null | string;
    count: number;
  };
}

export const useGetActiveUserCount = () => {
  const { data, error } = useSuspenseQuery<Result>(GET_ACTIVE_USER_COUNT);

  return { data, error };
};
