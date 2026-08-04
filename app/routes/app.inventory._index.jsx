import React from "react";

const InventoryListPage = React.lazy(
  () => import("../pages/inventory/inventory-list-page"),
);

export default function InventoryIndexRoute() {
  return (
    <React.Suspense fallback={""}>
      <InventoryListPage />
    </React.Suspense>
  );
}
