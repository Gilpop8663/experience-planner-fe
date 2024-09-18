import Layout from "@/components/Layout";
import ExperienceRegistrationLoading from "@/components/suspense/ExperienceRegistrationLoading";
import ExperienceRegistrationFetcher from "@/fetchers/ExperienceRegistrationFetcher";
import { Suspense } from "react";

const MyInfoPage: React.FC = () => {
  return (
    <Layout>
      <Suspense fallback={<ExperienceRegistrationLoading />}>
        <ExperienceRegistrationFetcher />
      </Suspense>
    </Layout>
  );
};

export default MyInfoPage;
