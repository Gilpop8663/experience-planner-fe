import { Suspense } from "react";
import Layout from "@/components/Layout";
import Skeleton from "@/components/suspense/Skeleton";
import CampaignDetailFetcher from "@/fetchers/CampaignDetailFetcher";

const ExperienceDetailPage = () => {
  return (
    <Layout>
      <Suspense fallback={<Skeleton className="h-48" />}>
        <CampaignDetailFetcher />
      </Suspense>
    </Layout>
  );
};

export default ExperienceDetailPage;
