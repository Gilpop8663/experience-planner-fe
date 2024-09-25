import { useMutation } from "@apollo/client";
import { EDIT_CAMPAIGN } from "@/gql/mutation/campaign";
import {
  GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
  GET_EXPIRED_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
  GET_TOTAL_SPONSORSHIP_COST_AND_CONSUMPTION,
} from "@/gql/query/campaign";
import { showPromiseToast } from "@/lib/toast";

interface Result {
  editCampaign: {
    ok: boolean;
    error: null | string;
  };
}

interface Props {
  campaignId: number;
  title?: string;
  reviewDeadline?: string;
  platformName?: string;
  serviceDetails?: string;
  location?: string;
  detailedViewLink?: string;
  serviceAmount?: number;
  extraAmount?: number;
  reservationDate?: string;
}

export const useEditCampaign = () => {
  const [editCampaign, { data, error, loading }] =
    useMutation<Result>(EDIT_CAMPAIGN);

  const handleEditCampaign = async (input: Props) => {
    const result = editCampaign({
      variables: { input },
      refetchQueries: [
        { query: GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE },
        { query: GET_EXPIRED_CAMPAIGN_LIST_SORTED_BY_DEADLINE },
        { query: GET_TOTAL_SPONSORSHIP_COST_AND_CONSUMPTION },
      ],
    });

    showPromiseToast(
      result.then((res) => {
        if (!res.data?.editCampaign.ok) {
          throw new Error(
            res.data?.editCampaign.error || "체험단 수정에 실패했습니다 😢",
          );
        }
        return res;
      }),
      {
        success: "체험단 수정에 성공했습니다! 🎉",
        error: "체험단 수정에 실패했습니다 😢",
        pending: "체험단 수정중입니다 ⏳",
      },
    );

    return result;
  };

  return { handleEditCampaign, data, error, loading };
};
