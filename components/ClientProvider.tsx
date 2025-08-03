"use client"; // Mark as Client Component

import { MetaMaskProvider } from "@metamask/sdk-react";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export function ClientProvider({ children }: { children: ReactNode }) {
  const host = typeof window !== "undefined" ? window.location.host : "defaultHost";

  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "Sentinel", // Your app name
      url: host,
    },
  };

  return (
    <MetaMaskProvider sdkOptions={sdkOptions}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1a1a',
            color: '#10b981',
            border: '1px solid #065f46',
            borderRadius: '8px',
            fontFamily: 'monospace',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#000000',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#000000',
            },
          },
        }}
      />
    </MetaMaskProvider>
  );
}