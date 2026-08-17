import compression from "compression";
import express from "express";
import morgan from "morgan";
import { createRequestHandler } from "@react-router/express";

const app = express();
app.disable("x-powered-by");
app.use(compression());

const assetsBuildDirectory = "build/client";

app.use(
  "/assets",
  express.static(`${assetsBuildDirectory}/assets`, {
    immutable: true,
    maxAge: "1y",
  }),
);
app.use(express.static(assetsBuildDirectory));
app.use(express.static("public", { maxAge: "1h" }));

// HTML documents (SSR responses) must not be cached so every deploy loads the
// newest build instead of a stale cached bundle referencing deleted chunks.
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  next();
});

app.use(morgan("tiny"));

const build = await import("./build/server/index.js");
const requestHandler = createRequestHandler({
  build,
  // eslint-disable-next-line no-undef
  mode: process.env.NODE_ENV ?? "production",
});

app.all("*", requestHandler);

// eslint-disable-next-line no-undef
const port = Number(process.env.PORT) ?? 3000;
app.listen(port, () => {
  console.log(`Inventory Manager web listening on ${port}`);
});
