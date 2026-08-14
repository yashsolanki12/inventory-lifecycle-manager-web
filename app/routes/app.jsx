import React from "react";
import NoPlanFallback from "../pages/plans/no-plan-fallback";
import {
  Outlet,
  useLoaderData,
  useRouteError,
  useLocation,
} from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { authenticate, sessionStorage } from "../shopify.server";
import { authPostSync } from "../api/auth";
import { syncPlanToBackend } from "../api/plan";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const loader = async ({ request }) => {
  const { session, billing } = await authenticate.admin(request);

  if (session) {
    const hasInfo = await sessionStorage
      .hasShopInfo(session.id)
      .catch(() => false);
    if (!hasInfo) {
      try {
        const response = await fetch(
          `https://${session.shop}/admin/api/2026-07/shop.json`,
          {
            headers: {
              "X-Shopify-Access-Token": session.accessToken,
              "Content-Type": "application/json",
            },
          },
        );
        const data = await response.json();
        const shopData = data.shop;

        if (shopData) {
          const fullName = shopData.shop_owner || "";
          const nameParts = fullName.trim().split(/\s+/);
          await sessionStorage.updateShopInfo(session.id, {
            firstName: nameParts[0] || "",
            lastName: nameParts.slice(1).join(" ") || "",
            email: shopData.email || "",
            accountOwner: true,
            locale: shopData.locale || "",
            collaborator: false,
            emailVerified: true,
          });
        }
      } catch (err) {
        console.error("[App] Failed to fetch shop info:", err.message);
      }
    }
  }

  let hasActivePlan = false;
  let activeSubscription = null;
  try {
    const { appSubscriptions } = await billing.check();
    console.log(
      "[App] billing.check result:",
      JSON.stringify(
        (appSubscriptions || []).map((s) => ({
          name: s.name,
          status: s.status,
          id: s.id,
        })),
      ),
    );
    if (appSubscriptions && appSubscriptions.length > 0) {
      activeSubscription = appSubscriptions.find(
        (sub) => sub.status.toUpperCase() === "ACTIVE",
      );
      hasActivePlan = !!activeSubscription;
    }
  } catch (err) {
    console.error("[App] Billing check failed:", err.message);
  }
  console.log(
    "[App] shop=",
    session?.shop,
    "| hasActivePlan=",
    hasActivePlan,
  );

  if (session && hasActivePlan && activeSubscription) {
    syncPlanToBackend(
      session.shop,
      activeSubscription.name.toLowerCase(),
      activeSubscription.id,
    ).catch((err) =>
      console.error("[App] Plan sync to backend failed:", err.message),
    );
  }

  // Resolve the app handle from the backend's authoritative APP_NAME so the
  // hosted billing URL always targets the correct production app. The web env
  // SHOPIFY_APP_NAME is only a fallback.
  // eslint-disable-next-line no-undef
  let appName = process.env.SHOPIFY_APP_NAME || "inventory-lifecycle-manager";
  try {
    // eslint-disable-next-line no-undef
    const backendBase = process.env.VITE_BACKEND_API_URL || "https://inventory-lifecycle-manager-backend.onrender.com";
    const cfgRes = await fetch(`${backendBase}/api/config`);
    if (cfgRes.ok) {
      const cfg = await cfgRes.json();
      if (cfg?.data?.appName) appName = cfg.data.appName;
    }
  } catch (err) {
    console.error("[App] Failed to fetch appName from backend:", err.message);
  }
  console.log("[App] resolved appName=", appName);

  return {
    // eslint-disable-next-line no-undef
    apiKey: process.env.SHOPIFY_API_KEY || "",
    // eslint-disable-next-line no-undef
    shop: session?.shop || "",
    // eslint-disable-next-line no-undef
    appName,
    hasActivePlan,
  };
};

export default function App() {
  const { apiKey, hasActivePlan, shop } = useLoaderData();
  const location = useLocation();
  const isPlansRoute = location.pathname === "/app/plans";

  const queryClient = React.useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 16, // 16 seconds
            gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      }),
    [],
  );
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
          {/* 📊 */}
          <s-link href="/app/inventory">Inventory</s-link> {/* 📦 */}
          <s-link href="/app/rules">Rules</s-link>
          <s-link href="/app/archive-history">Archive History</s-link>
          <s-link href="/app/alerts">Alerts</s-link>
          <s-link href="/app/aging-buckets">Aging Buckets</s-link>
          {/* <s-link href="/app/orders">Orders</s-link> */}
          {/* 🛍️  */}
          <s-link href="/app/plans">Plans</s-link>
          {/* 💳  */}
        </s-app-nav>
        {(hasActivePlan || isPlansRoute) && <Outlet />}
        {!hasActivePlan && !isPlansRoute && <NoPlanFallback />}
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
