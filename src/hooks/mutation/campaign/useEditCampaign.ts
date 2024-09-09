import { useMutation } from "@apollo/client";
import { EDIT_CAMPAIGN } from "@/gql/mutation/campaign";

interface Result {
  editCampaign: {
    ok: boolean;
    error: null | string;
  };
}

interface Props {
  campaignId: number;
  title: string;
  platformName: string;
  reviewDeadline: string;
  serviceDetails: string;
  location: string;
  detailedViewLink?: string;
  serviceAmount: number;
  extraAmount: number;
  reservationDate: string;
}

export const useEditCampaign = () => {
  const [editCampaign, { data, error }] = useMutation<Result>(EDIT_CAMPAIGN);

  const handleEditCampaign = async (input: Props) => {
    const result = await editCampaign({
      variables: { input },
    });

    return result;
  };

  return { handleEditCampaign, data, error };
};
