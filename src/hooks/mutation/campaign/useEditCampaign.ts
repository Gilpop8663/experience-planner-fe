import { useMutation } from "@apollo/client";
import { EDIT_CAMPAIGN } from "@/gql/mutation/campaign";
import { Campaign } from "@/types/campaign";
import {
  GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
  GET_EXPIRED_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
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
  title: string;
  reviewDeadline: string;
  platformName?: string;
  serviceDetails?: string;
  location?: string;
  detailedViewLink?: string;
  serviceAmount?: number;
  extraAmount?: number;
  reservationDate?: string;
}

interface CampaignListResult {
  getCampaignListSortedByDeadline: {
    ok: boolean;
    error: null | string;
    data: Campaign[];
  };
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
      ],
      update: (cache, { data }) => {
        if (!data?.editCampaign.ok) return;

        const existingCampaign: CampaignListResult | null = cache.readQuery({
          query: GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
        });

        if (!existingCampaign) return;

        const newCampaignList: Campaign[] =
          existingCampaign.getCampaignListSortedByDeadline.data.map((item) => {
            if (item.id !== input.campaignId) return item;

            return { ...item, reservationDate: input.reservationDate };
          });

        cache.updateQuery(
          { query: GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE },
          () => ({
            getCampaignListSortedByDeadline: {
              ok: true,
              error: null,
              data: newCampaignList,
            },
          }),
        );
      },
    });

    showPromiseToast(result, {
      success: "체험단 수정에 성공했습니다! 🎉",
      error: "체험단 수정에 실패했습니다 😢",
      pending: "체험단 수정중입니다 ⏳",
    });

    return result;
  };

  return { handleEditCampaign, data, error, loading };
};
