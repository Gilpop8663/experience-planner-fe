import { useMutation } from "@apollo/client";
import { EDIT_CAMPAIGN } from "@/gql/mutation/campaign";
import { Campaign } from "@/types/campaign";
import {
  GET_CALENDAR_CAMPAIGN_LIST,
  GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
  GET_EXPIRED_CAMPAIGN_LIST_SORTED_BY_DEADLINE,
} from "@/gql/query/campaign";

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
  const [editCampaign, { data, error }] = useMutation<Result>(EDIT_CAMPAIGN);

  const handleEditCampaign = async (input: Props) => {
    const result = await editCampaign({
      variables: { input },
      refetchQueries: [
        { query: GET_CAMPAIGN_LIST_SORTED_BY_DEADLINE },
        { query: GET_CALENDAR_CAMPAIGN_LIST },
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

    return result;
  };

  return { handleEditCampaign, data, error };
};
