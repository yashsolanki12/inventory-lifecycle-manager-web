import React from "react";

const AgingBucketsPage = React.lazy(
  () => import("../pages/aging-buckets/aging-buckets-page.jsx"),
);

export default function AgingBucketsIndexRoute() {
  return (
    <React.Suspense fallback="">
      <AgingBucketsPage />
    </React.Suspense>
  );
}
