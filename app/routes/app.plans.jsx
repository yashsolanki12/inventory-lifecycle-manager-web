import React from "react";
import { authenticate } from "../shopify.server";
import { useLoaderData, useSubmit, useActionData, useRouteLoaderData } from "react-router";
import PlansShimmer from "../ui/plans-shimmer";

const PlansPageView = React.lazy(() => import("../pages/plans/plans-page"));

export const loader = async ({ request }) => {
  const { session, billing } = await authenticate.admin(request);

  let subscription = null;
  try {
    const { appSubscriptions } = await billing.check();
    if (appSubscriptions && appSubscriptions.length > 0) {
      subscription = appSubscriptions[0];
    }
  } catch (err) {
    console.error("Billing check failed:", err.message);
  }

  return {
    shop: session?.shop,
    subscription,
  };
};

export async function action({ request }) {
  const { billing } = await authenticate.admin(request);
  try {
    const { appSubscriptions } = await billing.check();
    if (appSubscriptions && appSubscriptions.length > 0) {
      await billing.cancel({ subscriptionId: appSubscriptions[0].id });
      return { success: true, message: "Plan successfully cancelled." };
    }
    return { success: false, message: "No active subscription found." };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export default function PlansPage() {
  const data = useLoaderData();
  const submit = useSubmit();
  const actionData = useActionData();
  const parentData = useRouteLoaderData("routes/app");

  const pricingUrl =
    parentData?.shop && parentData?.appName
      ? `https://admin.shopify.com/store/${parentData.shop.split(".").at(0)}/charges/${parentData.appName}/pricing_plans`
      : "";

  return (
    <React.Suspense fallback={<PlansShimmer />}>
      <PlansPageView
        shop={data.shop}
        subscription={data.subscription}
        pricingUrl={pricingUrl}
        submit={submit}
        actionData={actionData}
      />
    </React.Suspense>
  );
}
