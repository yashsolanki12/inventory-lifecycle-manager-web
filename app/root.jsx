// import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
// import { StyledEngineProvider } from "@mui/material/styles";

// export const meta = () => {
//   return [{ name: "viewport", content: "width=device-width,initial-scale=1" }];
// };

// export default function App() {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <meta charSet="utf-8" />
//         <meta
//           name="emotion-insertion-point"
//           content=""
//           suppressHydrationWarning
//         />
//         <script src="https://cdn.shopify.com/shopifycloud/app-bridge.js"></script>
//         <Meta />
//         <Links />
//       </head>
//       <body suppressHydrationWarning>
//         <StyledEngineProvider injectFirst>
//           <Outlet />
//         </StyledEngineProvider>
//         <ScrollRestoration />
//         <Scripts />
//       </body>
//     </html>
//   );
// }

import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { StyledEngineProvider } from "@mui/material/styles";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta
          name="emotion-insertion-point"
          content=""
          suppressHydrationWarning
        />
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
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
