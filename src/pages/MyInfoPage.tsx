import Layout from "@/components/Layout";
import ExperienceRegistrationFetcher from "@/fetchers/ExperienceRegistrationFetcher";
import { Suspense } from "react";

const MyInfoPage: React.FC = () => {
  return (
    <Layout>
      <Suspense fallback={<span>로딩중...</span>}>
        <ExperienceRegistrationFetcher />
      </Suspense>
    </Layout>
  );
};

export default MyInfoPage;
