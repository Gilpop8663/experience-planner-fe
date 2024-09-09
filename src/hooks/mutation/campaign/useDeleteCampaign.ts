import { useMutation } from "@apollo/client";
import { DELETE_CAMPAIGN } from "@/gql/mutation/campaign";

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
    });

    return result;
  };

  return { handleDeleteCampaign, data, error };
};
