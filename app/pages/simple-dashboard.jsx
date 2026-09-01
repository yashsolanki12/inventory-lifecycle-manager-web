import React, { useState } from "react";

// Sample mock structured layout database matching backend model definitions
const initialInventory = [
  {
    id: 1,
    name: "Vintage Leather Jacket",
    SKU: "VLJ-001",
    stock: 12,
    status: "Healthy",
    age: "14 Days",
  },
  {
    id: 2,
    name: "Wireless Bluetooth Earbuds",
    SKU: "WBE-204",
    stock: 0,
    status: "Out of Stock",
    age: "98 Days",
  },
  {
    id: 3,
    name: "Ceramic Coffee Mug",
    SKU: "CCM-882",
    stock: 85,
    status: "Dead Stock",
    age: "120 Days",
  },
  {
    id: 4,
    name: "Minimalist Wall Clock",
    SKU: "MWC-104",
    stock: 3,
    status: "Low Stock",
    age: "45 Days",
  },
];

export default function SimpleDashboard() {
  const [products] = useState(initialInventory);

  return (
    <div style={styles.dashboardWrapper}>
      {/* Standalone Simple Navigation Headers Bar */}
      <nav style={styles.topNavbar}>
        <div style={styles.navContainer}>
          <span style={styles.navLogo}>📦 Inventory Portal</span>
          <button style={styles.disconnectBtn}>Disconnect Store</button>
        </div>
      </nav>

      {/* Primary Layout Bounds Container */}
      <div style={styles.mainContentContainer}>
        {/* Context Information Summary Layer */}
        <div style={styles.pageHeaderRow}>
          <div>
            <h1 style={styles.mainTitleHead}>Inventory Lifecycle</h1>
            <p style={styles.storeSubtext}>
              Connected: <code>://myshopify.com</code>
            </p>
          </div>
          <button style={styles.syncPrimaryActionBtn}>
            Sync Shopify Inventory
          </button>
        </div>

        {/* Analytics Numeric Cards Track Layer Row */}
        <div style={styles.analyticsGridRow}>
          <div
            style={{ ...styles.analyticCard, borderLeft: "4px solid #4f46e5" }}
          >
            <span style={styles.cardMetricLabel}>Total Tracked Items</span>
            <span style={styles.cardValueHeading}>1,248</span>
          </div>
          <div
            style={{ ...styles.analyticCard, borderLeft: "4px solid #f59e0b" }}
          >
            <span style={styles.cardMetricLabel}>Low Stock Alerts</span>
            <span style={{ ...styles.cardValueHeading, color: "#b45309" }}>
              3
            </span>
          </div>
          <div
            style={{ ...styles.analyticCard, borderLeft: "4px solid #ef4444" }}
          >
            <span style={styles.cardMetricLabel}>Dead Stock Identified</span>
            <span style={{ ...styles.cardValueHeading, color: "#b91c1c" }}>
              1
            </span>
          </div>
        </div>

        {/* Products Lifecycle Grid Sheet Layout */}
        <div style={styles.tableCardContainer}>
          <table style={styles.customDataTable}>
            <thead>
              <tr style={styles.tableHeaderRowText}>
                <th style={styles.tableHeadCellAlignLeft}>Product Details</th>
                <th style={styles.tableHeadCellAlignLeft}>SKU Code</th>
                <th style={styles.tableHeadCellAlignRight}>Available Count</th>
                <th style={styles.tableHeadCellAlignLeft}>
                  Lifecycle Track Age
                </th>
                <th style={styles.tableHeadCellAlignLeft}>Status Tag</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id} style={styles.tableRowDividerBorder}>
                  <td style={styles.productNameBoldCell}>{item.name}</td>
                  <td style={styles.standardDataTextCell}>{item.SKU}</td>
                  <td
                    style={{
                      ...styles.tableHeadCellAlignRight,
                      color: item.stock === 0 ? "#ef4444" : "#2d3748",
                      fontWeight: item.stock <= 3 ? "600" : "400",
                    }}
                  >
                    {item.stock}
                  </td>
                  <td style={styles.standardDataTextCell}>{item.age}</td>
                  <td style={styles.standardDataTextCell}>
                    <span
                      style={{
                        ...styles.statusBadgeCapsule,
                        backgroundColor:
                          item.status === "Healthy"
                            ? "#dcfce7"
                            : item.status === "Low Stock"
                              ? "#fef3c7"
                              : "#fee2e2",
                        color:
                          item.status === "Healthy"
                            ? "#166534"
                            : item.status === "Low Stock"
                              ? "#92400e"
                              : "#991b1b",
                      }}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Clean Javascript Inline CSS Variables Objects Object Mapper definitions
const styles = {
  dashboardWrapper: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
    color: "#1e293b",
  },
  topNavbar: {
    backgroundColor: "#0f172a",
    padding: "16px 24px",
    color: "#ffffff",
  },
  navContainer: {
    maxWidth: "1140px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navLogo: {
    fontWeight: "700",
    fontSize: "18px",
  },
  disconnectBtn: {
    backgroundColor: "transparent",
    border: "1px solid #475569",
    color: "#94a3b8",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
  },
  mainContentContainer: {
    maxWidth: "1140px",
    margin: "40px auto",
    padding: "0 20px",
  },
  pageHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  },
  mainTitleHead: {
    fontSize: "28px",
    fontWeight: "800",
    margin: "0 0 4px 0",
    color: "#0f172a",
  },
  storeSubtext: {
    margin: 0,
    color: "#64748b",
    fontSize: "14px",
  },
  syncPrimaryActionBtn: {
    backgroundColor: "#4f46e5",
    color: "#ffffff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "14px",
  },
  analyticsGridRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    marginBottom: "32px",
  },
  analyticCard: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  cardMetricLabel: {
    fontSize: "13px",
    color: "#64748b",
    fontWeight: "500",
  },
  cardValueHeading: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#0f172a",
  },
  tableCardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
  },
  customDataTable: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    fontSize: "14px",
  },
  tableHeaderRowText: {
    backgroundColor: "#f1f5f9",
    color: "#475569",
    fontWeight: "600",
  },
  tableHeadCellAlignLeft: {
    padding: "14px 20px",
    textAlign: "left",
  },
  tableHeadCellAlignRight: {
    padding: "14px 20px",
    textAlign: "right",
  },
  tableRowDividerBorder: {
    borderBottom: "1px solid #f1f5f9",
  },
  productNameBoldCell: {
    padding: "16px 20px",
    fontWeight: "600",
    color: "#0f172a",
  },
  standardDataTextCell: {
    padding: "16px 20px",
    color: "#334155",
  },
  statusBadgeCapsule: {
    padding: "4px 10px",
    borderRadius: "9999px",
    fontSize: "12px",
    fontWeight: "600",
    display: "inline-block",
  },
};
