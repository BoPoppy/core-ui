import { ThemeProvider, ToastProvider } from "@bopoppy/core-ui";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
// The real library stylesheet (token cascade + Tailwind utilities the
// components use) followed by the catalog chrome.
import "../../src/styles/index.css";
import "./catalog.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
);
