import React from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import SyncProductSkeleton from "../../ui/skeleton-loader/sync-product-skeleton";
import DashboardSkeleton from "../../ui/skeleton-loader/dashboard-skeleton";
import DashboardHeader from "./ui-components/dashboard-header";
import StatsCards from "./ui-components/stats-cards";
import AgingDistributionChart from "./ui-components/aging-distribution";
import InventoryValueChart from "./ui-components/inventory-value-chart";
import DeadStockTrend from "./ui-components/dead-stock-trend";
import TopDeadStockTable from "./ui-components/top-dead-stock-table";
import WelcomeCard from "./ui-components/welcome-card";
import UpgradePrompt from "./ui-components/upgrade-prompt";
import useInventoryData from "../../hooks/useInventoryData";
import useInventorySubmit from "../../hooks/useInventorySubmit";
import { useCurrentShopDomain } from "../../utils/helper";
import { syncProduct } from "../../api/products";
import { getInventoryDashboard } from "../../api/inventory-dashboard";
import { getAgingBucket, populateSnapshot } from "../../api/inventory-aging";
import { useSearchParams } from "react-router";
import { AppContext } from "../../utils/app-context";
import { getPlanFromBackend } from "../../api/plan";

const DashboardPage = () => {
  const shopDomain = useCurrentShopDomain();
  const { hasActivePlan } = React.useContext(AppContext);

  const [hasSynced, setHasSynced] = React.useState(() => {
    if (typeof window === "undefined" || !shopDomain) return false;
    return sessionStorage.getItem(`inventory_synced_${shopDomain}`) === "true";
  });
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
    ["plan-usage", shopDomain],
    () => getPlanFromBackend(shopDomain),
    null,
    { enabled: !!shopDomain },
  );

  const plan = planData?.data ?? planData;
  const features = plan?.features || {};

  const hasFullDashboard = features.dashboardAnalytics === "full";
  const hasFullAging = features.inventoryAging === "full";

  const { data: dashboardData, isLoading: isDashboardLoading } =
    useInventoryData(
      ["inventory-dashboard-data", shopDomain],
      () => getInventoryDashboard(shopDomain),
      null,
      { enabled: !!shopDomain },
    );

  const { data: agingData } = useInventoryData(
    ["inventory-aging-data", shopDomain],
    () => getAgingBucket(shopDomain, { page: 1, limit: 10, bucket: "dead" }),
    null,
    { enabled: !!shopDomain },
  );

  const populateSnapShotMutation = useInventorySubmit(
    () => populateSnapshot(shopDomain),
    null,
    {
      invalidateKeys: [["populate-snapshot"]],
    },
  );

  const syncMutation = useInventorySubmit(
    () => syncProduct(shopDomain),
    setSnackbar,
    {
      invalidateKeys: [
        ["inventory-dashboard-data"],
        ["inventory-aging-data"],
        ["plan-usage"],
        // ["dead-stock-trend-data"],
      ],
      onSuccess: () => {
        sessionStorage.setItem(`inventory_synced_${shopDomain}`, "true");
        setHasSynced(true);
        populateSnapShotMutation.mutate();
      },
    },
  );

  const handleSync = () => {
    // if (!shopDomain) return;
    syncMutation.mutate();
    // if (!syncMutation.error && populateSnapShotMutation.status === "idle") {
    //   populateSnapShotMutation.mutate(shopDomain);
    // }
  };
  React.useEffect(() => {
    if (!shopDomain) return;
    const alreadySynced =
      sessionStorage.getItem(`inventory_synced_${shopDomain}`) === "true";
    if (alreadySynced && !syncMutation.isPending) setHasSynced(true);
  }, [shopDomain]);

  React.useEffect(() => {
    if (syncMutation.error) {
      setSnackbar({
        open: true,
        message: syncMutation.error || "An error occurred",
        severity: "error",
      });
    }
  }, [syncMutation.error]);

  React.useEffect(() => {
    if (
      (searchParams.has("charge_id") ||
        searchParams.has("plan_handle") ||
        searchParams.has("appLoadId")) &&
      shopDomain
    ) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("charge_id");
      newParams.delete("plan_handle");
      newParams.delete("appLoadId");
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, shopDomain, setSearchParams]);

  const isInitialLoading =
    hasSynced && isDashboardLoading && !syncMutation.isPending;
  const isSyncing = syncMutation.isPending;
  const hasDashboardData = dashboardData?.data;

  let content;

  if (!hasSynced && isSyncing) {
    content = <SyncProductSkeleton />;
  } else if (!hasSynced) {
    content = (
      <WelcomeCard
        onSync={() => handleSync(false)}
        plan={plan}
        isSyncing={isSyncing}
      />
    );
  } else if (isSyncing) {
    content = <DashboardSkeleton dashboardData={dashboardData} />;
  } else if (isInitialLoading) {
    content = <DashboardSkeleton />;
  } else if (hasDashboardData) {
    content = (
      <Box
        sx={{
          width: "95%",
          maxWidth: 1450,
          mx: "auto",
          my: 0,
          px: { xs: 2, sm: 3 },
          py: 3,
          mb: 5,
          boxSizing: "border-box",
          background: "#f5f7fb",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
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
      {content}
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
