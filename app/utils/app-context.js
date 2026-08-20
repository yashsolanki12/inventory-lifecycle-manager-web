import React from "react";

export const AppContext = React.createContext({
  hasActivePlan: false,
  billingUrl: "",
  shop: "",
});
