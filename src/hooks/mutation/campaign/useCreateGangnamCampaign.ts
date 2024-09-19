import { useMutation } from "@apollo/client";
import { CREATE_GANGNAM_CAMPAIGN } from "@/gql/mutation/campaign";
import {
  GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
  GET_EXPIRED_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
} from "@/gql/query/campaign";
import { showPromiseToast } from "@/lib/toast";

interface Result {
  createGangnamCampaign: {
    ok: boolean;
    error: null | string;
    campaignId: number | null;
  };
}

interface Props {
  siteContent: string;
  userId: number;
}

export const useCreateGangnamCampaign = () => {
  const [createGangnamCampaign, { data, error, loading }] = useMutation<Result>(
    CREATE_GANGNAM_CAMPAIGN,
  );

  const handleCreateGangnamCampaign = async (input: Props) => {
    const result = createGangnamCampaign({
      variables: { input },
      refetchQueries: [
        { query: GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE },
        { query: GET_EXPIRED_CAMPAIGN_LIST_SORTED_BY_DEADLINE },
      ],
    });

    showPromiseToast(
      result.then((res) => {
        if (!res.data?.createGangnamCampaign.ok) {
          throw new Error(
            res.data?.createGangnamCampaign.error ||
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

  return { handleCreateGangnamCampaign, data, error, loading };
};
