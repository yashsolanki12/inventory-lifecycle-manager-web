import React from "react";
import {
  Outlet,
  useLoaderData,
  useRouteError,
  useLocation,
} from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { authenticate } from "../shopify.server";
import { authPostSync } from "../api/auth";
import { syncPlanToBackend } from "../api/plan";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NoPlanFallback from "../pages/plans/no-plan-fallback";

export const loader = async ({ request }) => {
  const { session, billing } = await authenticate.admin(request);

  let hasActivePlan = false;
  let activeSubscription = null;
  try {
    const { appSubscriptions } = await billing.check();
    if (appSubscriptions && appSubscriptions.length > 0) {
      activeSubscription = appSubscriptions.find(
        (sub) => sub.status.toUpperCase() === "ACTIVE",
      );
      hasActivePlan = !!activeSubscription;
    }
  } catch (err) {
    console.error("[App] Billing check failed:", err.message);
  }

  if (session && hasActivePlan && activeSubscription) {
    syncPlanToBackend(
      session.shop,
      activeSubscription.name.toLowerCase(),
      activeSubscription.id,
    ).catch((err) =>
      console.error("[App] Plan sync to backend failed:", err.message),
    );
  }

  return {
    // eslint-disable-next-line no-undef
    apiKey: process.env.SHOPIFY_API_KEY || "",
    // eslint-disable-next-line no-undef
    appName: process.env.SHOPIFY_APP_NAME || "",
    shop: session?.shop || "",
    hasActivePlan,
  };
};

export default function App() {
  const { apiKey, hasActivePlan, shop, appName } = useLoaderData();
  const location = useLocation();
  const isPlansRoute = location.pathname === "/app/plans";

  const queryClient = React.useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
            refetchOnWindowFocus: false,
            // Disable queries during SSR
            enabled: typeof window !== "undefined",
          },
        },
      }),
    [],
  );
  const pricingUrl =
    shop && appName
      ? `https://admin.shopify.com/store/${shop.split(".").at(0)}/charges/${appName}/pricing_plans`
      : "";

  React.useEffect(() => {
    if (!shop) return;
    const key = `auth_post_sync_${shop}`;
    if (!localStorage.getItem(key)) {
      authPostSync(shop).then(() => localStorage.setItem(key, "true"));
    }
  }, [shop]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider embedded apiKey={apiKey}>
        <s-app-nav>
          <s-link href="/app">Dashboard</s-link>
          <s-link href="/app/inventory">Inventory</s-link>
          <s-link href="/app/plans">Plans</s-link>
          {/* <s-link href="/app/products">Products</s-link> */}
        </s-app-nav>
        {(hasActivePlan || isPlansRoute) && <Outlet />}
        {!hasActivePlan && !isPlansRoute && (
          <NoPlanFallback pricingUrl={pricingUrl} />
        )}
      </AppProvider>
    </QueryClientProvider>
  );
}

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
