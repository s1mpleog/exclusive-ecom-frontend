import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
// import "daisyui/dist/full.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoute from "./AppRoutes.tsx";
import { AppContextProvider } from "./contexts/AppContext.tsx";
import { ProductContextProvider } from "./contexts/ProductContext.tsx";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <ProductContextProvider>
            <AppRoute />
            <Toaster />
          </ProductContextProvider>
        </AppContextProvider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
