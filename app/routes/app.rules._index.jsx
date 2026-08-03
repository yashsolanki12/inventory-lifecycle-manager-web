import React from "react";
const InventoryListPage = React.lazy(
  () => import("../pages/rules/rules-list-page.jsx"),
);

export default function RulesIndexRoute() {
  return (
    <React.Suspense fallback="">
      <InventoryListPage />
    </React.Suspense>
  );
}
