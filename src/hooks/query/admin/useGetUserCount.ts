import { GET_USER_COUNT } from "@/gql/query/admin";
import { useSuspenseQuery } from "@apollo/client";

interface Result {
  getUserCount: {
    ok: boolean;
    error: null | string;
    count: number;
  };
}

export const useGetUserCount = () => {
  const { data, error } = useSuspenseQuery<Result>(GET_USER_COUNT);

  return { data, error };
};
