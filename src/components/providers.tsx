"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useState, type ReactNode } from "react";

const SettingsContext = createContext<{ enableOrderNow: boolean }>({
  enableOrderNow: true,
});

export const useSettings = () => useContext(SettingsContext);

export function Providers({
  children,
  enableOrderNow,
}: {
  children: ReactNode;
  enableOrderNow: boolean;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SettingsContext.Provider value={{ enableOrderNow }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SettingsContext.Provider>
  );
}
