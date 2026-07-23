import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { AppProviders } from "./app/App";
import { router } from "./app/routes";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </AppProviders>
  </StrictMode>,
);
