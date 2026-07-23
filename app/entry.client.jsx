import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

const KNOWN_EXTENSION_SELECTORS = [
  "grammarly-desktop-integration",
  "gradio-tooltip",
  "[data-new-gr-c-s-check-loaded]",
  "[data-gr-ext-installed]",
];

function stripBrowserExtensionElements() {
  for (const selector of KNOWN_EXTENSION_SELECTORS) {
    try {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => el.remove());
    } catch {
      // skip invalid selectors
    }
  }
}

stripBrowserExtensionElements();

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  );
});
