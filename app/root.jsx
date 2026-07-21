import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { StyledEngineProvider } from "@mui/material/styles";

export const meta = () => {
  return [{ name: "viewport", content: "width=device-width,initial-scale=1" }];
};

export default function App() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="emotion-insertion-point" content="" suppressHydrationWarning />
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
