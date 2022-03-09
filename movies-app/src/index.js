import React from "react";
import { render } from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./app/screens/Home";

import "./index.css";

// Global react-query configs
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById("root")
);
