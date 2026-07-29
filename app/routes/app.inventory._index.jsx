import React from "react";

const InventoryPage = React.lazy(
  () => import("../pages/inventory/inventory-page"),
);

export default function InventoryIndexRoute() {
  return (
    <React.Suspense fallback={""}>
      <InventoryPage />
    </React.Suspense>
  );
}
