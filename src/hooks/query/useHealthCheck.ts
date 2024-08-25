import { useSuspenseQuery } from "@apollo/client";
import { HEALTH_CHECK } from "../../gql/query";

export const useHealthCheck = () => {
  const { data } = useSuspenseQuery<{ healthCheck: { ok: boolean } }>(
    HEALTH_CHECK
  );

  return { data };
};
