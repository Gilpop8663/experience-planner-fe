import { useMutation } from "@apollo/client";
import { COMPLETE_REVIEW_AND_END_CAMPAIGN } from "@/gql/mutation/campaign";
import {
  GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
  GET_EXPIRED_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
} from "@/gql/query/campaign";
import { showPromiseToast } from "@/lib/toast";

interface Result {
  completeReviewAndEndCampaign: {
    ok: boolean;
    error: null | string;
  };
}

interface Props {
  campaignId: number;
}

export const useCompleteReviewAndEndCampaign = () => {
  const [completeReviewAndEndCampaign, { data, error }] = useMutation<Result>(
    COMPLETE_REVIEW_AND_END_CAMPAIGN,
  );

  const handleCompleteReviewAndEndCampaign = async (input: Props) => {
    const result = completeReviewAndEndCampaign({
      variables: { input },
      refetchQueries: [
        { query: GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE },
        { query: GET_EXPIRED_CAMPAIGN_LIST_SORTED_BY_DEADLINE },
      ],
    });

    showPromiseToast(
      result.then((res) => {
        if (!res.data?.completeReviewAndEndCampaign.ok) {
          throw new Error(
            res.data?.completeReviewAndEndCampaign.error ||
              "체험단 상태 변경에 실패했습니다 😢",
          );
        }
        return res;
      }),
      {
        success: "체험단 상태 변경에 성공했습니다! 🎉",
        error: "체험단 상태 변경에 실패했습니다 😢",
        pending: "체험단 상태 변경중입니다 ⏳",
      },
    );

    return result;
  };

  return { handleCompleteReviewAndEndCampaign, data, error };
};
