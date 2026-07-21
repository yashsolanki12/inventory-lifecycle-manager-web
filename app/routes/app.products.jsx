import React from "react";

const ProductPageView = React.lazy(
  () => import("../pages/products/product-page"),
);

export default function ProductPage() {
  return (
    <React.Suspense fallback={""}>
      <ProductPageView />
    </React.Suspense>
  );
}
