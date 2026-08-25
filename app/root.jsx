import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "react-router";
import { StyledEngineProvider } from "@mui/material/styles";

export const meta = () => {
  return [{ name: "viewport", content: "width=device-width,initial-scale=1" }];
};

export default function App() {
  const location = useLocation();

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const url = new URL(window.location.href);

    if (url.searchParams.has("appLoadId")) {
      url.searchParams.delete("appLoadId");

      window.history.replaceState(
        window.history.state,
        "",
        url.pathname +
          (url.search ? url.search : "") +
          (url.hash ? url.hash : ""),
      );
    }
  }, [location.pathname, location.search]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="emotion-insertion-point" content="" suppressHydrationWarning />
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
