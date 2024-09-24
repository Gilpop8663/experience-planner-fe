import { Suspense } from "react";
import Skeleton from "@/components/suspense/Skeleton";
import AdminFetcher from "@/fetchers/AdminFetcher";
import Layout from "@/components/Layout";
import AdminRoute from "@/router/AdminRoute";

export default function AdminPage() {
  return (
    <Layout>
      <AdminRoute>
        <Suspense fallback={<Skeleton className="h-48" />}>
          <AdminFetcher />
        </Suspense>
      </AdminRoute>
    </Layout>
  );
}
