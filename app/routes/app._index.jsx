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

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_API_URL ||
  "https://inventory-lifecycle-manager-backend.onrender.com";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  let planUsage = null;
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/rules/plan?shop=${session.shop}`,
    );
    if (res.ok) {
      const json = await res.json();
      if (json.success) planUsage = json.data;
    }
  } catch (err) {
    console.error("[Index] Plan fetch failed:", err.message);
  }

  return {
    shop: session.shop ?? "No shop found",
    planUsage,
  };
};

export default function Index() {
  const { shop, planUsage } = useLoaderData();
  const hasSynced = () => {
    if (typeof window === "undefined" || !shop) return false;
    return sessionStorage.getItem(`inventory_synced_${shop}`) === "true";
  };
  const showFallback =
    hasSynced() === true ? <DashboardSkeleton /> : <SyncProductSkeleton />;
  return (
      <React.Suspense fallback={showFallback}>
        <DashboardPage shop={shop} planFromLoader={planUsage} />
      </React.Suspense>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
