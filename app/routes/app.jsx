import { Outlet, useLoaderData, useRouteError, useLocation } from "react-router";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { authenticate } from "../shopify.server";
import { authPostSync } from "../api/auth";
import { syncPlanToBackend } from "../api/plan";
import NoPlanFallback from "../pages/plans/no-plan-fallback";

export const loader = async ({ request }) => {
  const { session, billing } = await authenticate.admin(request);

  if (session) {
    authPostSync(session.shop);
  }

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
    hasActivePlan,
  };
};


export default function App() {
  const { apiKey, hasActivePlan } = useLoaderData();
  const location = useLocation();
  const isPlansRoute = location.pathname === "/app/plans";

  return (
    <AppProvider embedded apiKey={apiKey}>
      <s-app-nav>
        <s-link href="/app">Home</s-link>
        <s-link href="/app/plans">Plans</s-link>
        <s-link href="/app/additional">Additional page</s-link>
        <s-link href="/app/products">Products</s-link>
      </s-app-nav>
      {(hasActivePlan || isPlansRoute) && <Outlet />}
      {!hasActivePlan && !isPlansRoute && <NoPlanFallback />}
    </AppProvider>
  );
}

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
