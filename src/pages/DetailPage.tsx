import Layout from "@/components/Layout";
import Skeleton from "@/components/suspense/Skeleton";
import CampaignDetailFetcher from "@/fetchers/CampaignDetailFetcher";
import { Suspense } from "react";

const ExperienceDetailPage = () => {
  return (
    <Layout>
      <Suspense fallback={<Skeleton className="h-48" />}>
        <CampaignDetailFetcher />;
      </Suspense>
    </Layout>
  );
};

export default ExperienceDetailPage;
