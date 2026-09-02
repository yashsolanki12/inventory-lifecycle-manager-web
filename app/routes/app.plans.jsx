import React from "react";
import PlansShimmer from "../ui/plans-shimmer";
import { authenticate } from "../shopify.server";
import { useLoaderData, useSubmit, useActionData } from "react-router";

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

  // eslint-disable-next-line no-undef
  const billingHandle = process.env.SHOPIFY_APP_NAME || "inventory-test-app-5";
  const billingUrl = session?.shop
    ? `https://admin.shopify.com/store/${session.shop
        .split(".")
        .at(0)}/charges/${billingHandle}/pricing_plans`
    : "";

  return {
    shop: session?.shop,
    subscription,
    billingUrl,
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

  return (
    <React.Suspense fallback={<PlansShimmer />}>
      <PlansPageView
        shop={data.shop}
        subscription={data.subscription}
        billingUrl={data.billingUrl}
        submit={submit}
        actionData={actionData}
      />
    </React.Suspense>
  );
}
