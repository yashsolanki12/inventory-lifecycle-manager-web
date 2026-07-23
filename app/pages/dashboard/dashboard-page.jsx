import React from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import SyncProductSkeleton from "../../ui/sync-product-skeleton";
import DashboardSkeleton from "../../ui/dashboard-skeleton";
import DashboardHeader from "./components/dashboard-header";
import StatsCards from "./components/stats-cards";
import AgingDistributionChart from "./components/aging-distribution";
import InventoryValueChart from "./components/inventory-value-chart";
import DeadStockTrend from "./components/dead-stock-trend";
import TopDeadStockTable from "./components/top-dead-stock-table";
import WelcomeCard from "./components/welcome-card";
import UpgradePrompt from "./components/upgrade-prompt";

import useInventoryData from "../../hooks/useInventoryData";
import useInventorySubmit from "../../hooks/useInventorySubmit";
import { useCurrentShopDomain } from "../../utils/helper";
import { syncProduct } from "../../api/products";
import { getInventoryDashboard } from "../../api/inventory-dashboard";
import { getAgingBucket, populateSnapshot } from "../../api/inventory-aging";
import { getPlanUsage } from "../../api/plan-usage";
import { useSearchParams } from "react-router";

const DashboardPage = () => {
  const shopDomain = useCurrentShopDomain();

  const [hasSynced, setHasSynced] = React.useState(
    () => localStorage.getItem("inventory_synced") === "true",
  );
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "success" });
  };

  const { data: planData } = useInventoryData(
    ["plan-usage"],
    () => getPlanUsage(shopDomain),
    null,
    { enabled: !!shopDomain },
  );

  const plan = planData?.data;
  const features = plan?.features || {};

  const hasFullDashboard = features.dashboardAnalytics === "full";
  const hasFullAging = features.inventoryAging === "full";

  const { data: dashboardData, isLoading: isDashboardLoading } =
    useInventoryData(
      ["inventory-dashboard-data"],
      () => getInventoryDashboard(shopDomain),
      null,
      { enabled: hasSynced && !!shopDomain },
    );

  const { data: agingData, isLoading: isAgingLoading } = useInventoryData(
    ["inventory-aging-data"],
    () => getAgingBucket(shopDomain, { page: 1, limit: 10, bucket: "dead" }),
    null,
    { enabled: hasSynced && !!shopDomain && hasFullAging },
  );

  const syncMutation = useInventorySubmit(
    (shop) => syncProduct(shop),
    setSnackbar,
    {
      invalidateKeys: [["inventory-dashboard-data"], ["inventory-aging-data"]],
      onSuccess: () => {
        localStorage.setItem("inventory_synced", "true");
        setHasSynced(true);
      },
    },
  );

  const populateSnapShotMutation = useInventorySubmit(
    (shop) => populateSnapshot(shop),
    null,
    {
      invalidateKeys: [["populate-snapshot"]],
    },
  );

  const handleSync = (isResync = false) => {
    if (!shopDomain) return;
    syncMutation.mutate(shopDomain);
    populateSnapShotMutation.mutate(shopDomain);
  };

  React.useEffect(() => {
    if (searchParams.has("charge_id") || searchParams.has("plan_handle")) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("charge_id");
      newParams.delete("plan_handle");
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const isInitialLoading = hasSynced && isDashboardLoading;
  const isSyncing = syncMutation.isPending;
  const isResyncing = syncMutation.isPending && hasSynced && dashboardData;
  const hasDashboardData = dashboardData?.data;

  if (isInitialLoading) {
    return <DashboardSkeleton />;
  }

  if (isSyncing && !hasDashboardData) {
    return <SyncProductSkeleton />;
  }

  if (isResyncing) {
    return <DashboardSkeleton />;
  }

  if (hasDashboardData) {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: 1450,
          mx: "auto",
          px: { xs: 2, sm: 3 },
          py: 3,
          boxSizing: "border-box",
          background: "#f5f7fb",
          borderRadius: "12px",
        }}
      >
        <DashboardHeader onSync={() => handleSync(true)} />
        <StatsCards dashboardData={dashboardData} plan={plan} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.5fr 1fr" },
            gap: 2,
            mb: 3,
          }}
        >
          {hasFullAging ? (
            <AgingDistributionChart agingData={agingData} />
          ) : (
            <UpgradePrompt
              feature="Inventory Aging Distribution"
              description="Upgrade to view detailed aging breakdown of your inventory across time periods."
              requiredPlan="Starter"
            />
          )}
          {hasFullDashboard ? (
            <InventoryValueChart
              dashboardData={dashboardData}
              agingData={agingData}
            />
          ) : (
            <UpgradePrompt
              feature="Inventory Value by Age"
              description="Upgrade to track inventory value distribution across aging buckets."
              requiredPlan="Starter"
            />
          )}
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.4fr 1fr" },
            gap: 2,
          }}
        >
          {hasFullDashboard ? (
            <DeadStockTrend />
          ) : (
            <UpgradePrompt
              feature="Dead Stock Trend"
              description="Upgrade to monitor dead stock trends over time."
              requiredPlan="Starter"
            />
          )}
          {hasFullAging ? (
            <TopDeadStockTable agingData={agingData} />
          ) : (
            <UpgradePrompt
              feature="Top Dead Stock Products"
              description="Upgrade to view and manage your dead stock products."
              requiredPlan="Starter"
            />
          )}
        </Box>
      </Box>
    );
  }

  return (
    <>
      <WelcomeCard onSync={() => handleSync(false)} plan={plan} />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.severity === "error" ? 5000 : 3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DashboardPage;
