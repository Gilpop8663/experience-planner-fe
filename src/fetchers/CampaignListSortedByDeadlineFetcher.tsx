import { useGetCampaignListSortedByDeadline } from "@/hooks/query/campaign/useGetCampaignListSortedByDeadline";
import CardList from "@/pages/MainPage/components/CardList/CardList";

export default function CampaignListSortedByDeadlineFetcher() {
  const { data } = useGetCampaignListSortedByDeadline();

  return <CardList data={data.getCampaignListSortedByDeadline.data} />;
}
