"use client";

import ReduxProvider from "@/common/providers/storeProvider";
import HttpProvider from "./httpProvider";
import ReactQueryProvider from "@/common/providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ReactQueryProvider>
        <HttpProvider>
          {children}
          <Toaster position="top-right" />
        </HttpProvider>
      </ReactQueryProvider>
    </ReduxProvider>
  );
}
