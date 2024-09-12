import { useMutation } from "@apollo/client";
import { DELETE_CAMPAIGN } from "@/gql/mutation/campaign";
import {
  GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
  GET_EXPIRED_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
} from "@/gql/query/campaign";

interface Result {
  deleteCampaign: {
    ok: boolean;
    error: null | string;
  };
}

interface Props {
  campaignId: number;
}

export const useDeleteCampaign = () => {
  const [deleteCampaign, { data, error }] =
    useMutation<Result>(DELETE_CAMPAIGN);

  const handleDeleteCampaign = async (input: Props) => {
    const result = await deleteCampaign({
      variables: { input },
      refetchQueries: [
        { query: GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE },
        { query: GET_EXPIRED_CAMPAIGN_LIST_SORTED_BY_DEADLINE },
      ],
    });

    return result;
  };

  return { handleDeleteCampaign, data, error };
};
