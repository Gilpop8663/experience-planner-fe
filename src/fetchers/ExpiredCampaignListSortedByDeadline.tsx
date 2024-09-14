import { useGetExpiredCampaignListSortedByDeadline } from "@/hooks/query/campaign/useGetExpiredCampaignListSortedByDeadline";
import CardList from "@/pages/MainPage/components/CardList/CardList";

export default function ExpiredCampaignListSortedByDeadline() {
  const { data } = useGetExpiredCampaignListSortedByDeadline();

  return <CardList data={data.getExpiredCampaignListSortedByDeadline.data} />;
}
