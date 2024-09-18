import { useMutation } from "@apollo/client";
import { CREATE_CAMPAIGN_FROM_LINK } from "@/gql/mutation/campaign";
import {
  GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
  GET_EXPIRED_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
} from "@/gql/query/campaign";
import { showPromiseToast } from "@/lib/toast";

interface Result {
  createCampaignFromLink: {
    ok: boolean;
    error: null | string;
    campaignId: number | null;
  };
}

interface Props {
  detailedViewLink: string;
  userId: number;
}

export const useCreateCampaignFromLink = () => {
  const [createCampaignFromLink, { data, error, loading }] =
    useMutation<Result>(CREATE_CAMPAIGN_FROM_LINK);

  const handleCreateCampaignFromLink = async (input: Props) => {
    const result = createCampaignFromLink({
      variables: { input },
      refetchQueries: [
        { query: GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE },
        { query: GET_EXPIRED_CAMPAIGN_LIST_SORTED_BY_DEADLINE },
      ],
    });

    showPromiseToast(
      result.then((res) => {
        if (!res.data?.createCampaignFromLink.ok) {
          throw new Error(
            res.data?.createCampaignFromLink.error ||
              "체험단 생성에 실패했습니다 😢",
          );
        }
        return res;
      }),
      {
        success: "체험단 생성에 성공했습니다! 🎉",
        error: "체험단 생성에 실패했습니다 😢",
        pending: "체험단 생성중입니다 ⏳",
      },
    );

    return result;
  };

  return { handleCreateCampaignFromLink, data, error, loading };
};
