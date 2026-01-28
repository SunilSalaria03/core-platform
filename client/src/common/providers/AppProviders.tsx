"use client";

import ReduxProvider from "@/shared/store/storeProvider";
import HttpProvider from "./httpProvider";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <HttpProvider>{children}</HttpProvider>
    </ReduxProvider>
  );
}
