import "./globals.css";
import ReduxProvider from "@/shared/store/storeProvider";
import { Toaster } from "react-hot-toast";
import { ConfirmProvider } from "@/common/modals/confirmationModal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ConfirmProvider>
            {children}
            <Toaster position="top-right" />
          </ConfirmProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
