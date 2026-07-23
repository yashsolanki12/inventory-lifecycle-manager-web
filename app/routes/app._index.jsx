import React from "react";
import SuspenseFallback from "../components/suspense-fallback";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../shopify.server";

const DashboardPage = React.lazy(
  () => import("../pages/dashboard/dashboard-page"),
);

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function Index() {
  return (
    <React.Suspense fallback={<SuspenseFallback />}>
      <DashboardPage />
    </React.Suspense>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
