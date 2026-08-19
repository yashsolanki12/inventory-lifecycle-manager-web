import React from "react";
// import SuspenseFallback from "../components/suspense-fallback";
import DashboardSkeleton from "../ui/skeleton-loader/dashboard-skeleton";
import SyncProductSkeleton from "../ui/skeleton-loader/sync-product-skeleton";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import { useLoaderData } from "react-router";

const DashboardPage = React.lazy(
  () => import("../pages/dashboard/dashboard-page"),
);

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  return {
    shop: session.shop ?? "No shop found",
  };
};

export default function Index() {
  const { shop } = useLoaderData();
  const hasSynced = () => {
    if (typeof window === "undefined" || !shop) return false;
    return sessionStorage.getItem(`inventory_synced_${shop}`) === "true";
  };
  const showFallback =
    hasSynced() === true ? <DashboardSkeleton /> : <SyncProductSkeleton />;
  return (
    <React.Suspense fallback={showFallback}>
      <DashboardPage />
    </React.Suspense>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
