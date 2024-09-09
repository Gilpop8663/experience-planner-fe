import { useSuspenseQuery } from "@apollo/client";
import { User } from "@/types/user";
import { ME } from "@/gql/query/user";

interface Result {
  me: User;
}

export const useMyProfile = () => {
  const { data } = useSuspenseQuery<Result>(ME, {
    fetchPolicy: "cache-first",
  });

  return { user: data.me };
};
