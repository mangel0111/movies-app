import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const BasicTestContainer = ({ children }) => {
  // Global react-query configs
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export const TestContainer = ({ children }) => {
  return <BasicTestContainer>{children}</BasicTestContainer>;
};

export default TestContainer;
