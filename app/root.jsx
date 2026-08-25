import React from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from "react-router";
import { StyledEngineProvider } from "@mui/material/styles";

export const meta = () => {
  return [{ name: "viewport", content: "width=device-width,initial-scale=1" }];
};

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (location) {
      const params = new URLSearchParams(location.search);
      params.delete("appLoadId");
      navigate(`${location.pathname}?${params.toString()}${location.hash}`, {
        replace: true,
      });
    }
  }, [location.pathname, location.search, location.hash, navigate]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="emotion-insertion-point"
          content=""
          suppressHydrationWarning
        />
        <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></script>
        <Meta />
        <Links />
      </head>
      <body suppressHydrationWarning>
        <StyledEngineProvider injectFirst>
          <Outlet />
        </StyledEngineProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
