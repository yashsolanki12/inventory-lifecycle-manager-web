import React from "react";

const AlertsListPage = React.lazy(
  () => import("../pages/alerts/alerts-list-page"),
);

export default function AlertsIndexRoute() {
  return (
    <React.Suspense fallback={""}>
      <AlertsListPage />
    </React.Suspense>
  );
}
