import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "virtual:svg-icons-register";

import App from "@/App";

import "./theme/index.css";
import { queryClient } from "./http/tanstack/react-query";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      {import.meta.env.MODE === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      <Suspense>
        <App />
      </Suspense>
    </QueryClientProvider>
  </HelmetProvider>
);