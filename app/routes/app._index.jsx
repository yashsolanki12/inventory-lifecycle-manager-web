import React from "react";
// import SuspenseFallback from "../components/suspense-fallback";
import DashboardSkeleton from "../ui/skeleton-loader/dashboard-skeleton";
import SyncProductSkeleton from "../ui/skeleton-loader/sync-product-skeleton";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";
import { useLoaderData } from "react-router";
import { syncPlanToBackend } from "../api/plan";

const DashboardPage = React.lazy(
  () => import("../pages/dashboard/dashboard-page"),
);

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_API_URL ||
  "https://inventory-lifecycle-manager-backend.onrender.com";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  console.log("[IndexLoader] session.shop=", session?.shop, "session.id=", session?.id);

  const url = new URL(request.url);
  const chargeId = url.searchParams.get("charge_id");
  const planHandle = url.searchParams.get("plan_handle");

  if (chargeId && planHandle && session?.shop) {
    try {
      console.log("[IndexLoader] Syncing plan before fetch:", planHandle, chargeId);
      await syncPlanToBackend(
        session.shop,
        planHandle.toLowerCase(),
        chargeId,
      );
      console.log("[IndexLoader] Plan sync completed");
    } catch (err) {
      console.error("[IndexLoader] Plan sync failed:", err.message);
    }
  }

  let planUsage = null;
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/rules/plan?shop=${session.shop}`,
    );
    console.log("[IndexLoader] plan API status=", res.status);
    if (res.ok) {
      const json = await res.json();
      console.log("[IndexLoader] plan API json=", JSON.stringify(json));
      if (json.success) planUsage = json.data;
    }
  } catch (err) {
    console.error("[IndexLoader] Plan fetch failed:", err.message);
  }

  return {
    shop: session?.shop ?? "No shop found",
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
