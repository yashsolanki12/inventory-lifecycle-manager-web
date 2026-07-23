import React from "react";

const InventoryPageView = React.lazy(
  () => import("../pages/inventory/inventory-page"),
);

export default function InventoryRoute() {
  return (
    <React.Suspense fallback={""}>
      <InventoryPageView />
    </React.Suspense>
  );
}
