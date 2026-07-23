import React from "react";
import { authenticate } from "../shopify.server";
import { useLoaderData, useSubmit, useActionData } from "react-router";
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
    // eslint-disable-next-line no-undef
    appName: process.env.SHOPIFY_APP_NAME,
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
        appName={data.appName}
        submit={submit}
        actionData={actionData}
      />
    </React.Suspense>
  );
}
