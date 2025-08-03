"use client";

import { useSDK } from "@metamask/sdk-react";
import { Button } from "@/components/ui/button"; // Replace with your UI component if not using Shadcn
import { useCallback, useEffect } from "react";

export const ConnectWallet = () => {
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const handleConnectAndSwitch = async () => {
    try {
      // Step 1: Connect to wallet
      const accounts = await sdk?.connect();
      if (accounts?.[0]) {
        console.log("Connected account:", accounts[0]);
        
        // Step 2: Immediately switch or add chain
        await switchOrAddChain();
      }
    } catch (err) {
      console.warn("Failed to connect or switch:", err);
    }
  };

  const switchOrAddChain = useCallback(async () => {
    if (!provider) {
      console.error("Provider not available");
      return;
    }

    const targetChainIdHex = "0x" + (133717).toString(16); // 0x20a55

    try {
      // Try to switch
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: targetChainIdHex }],
      });
      console.log("Switched to Metis Hyperion Testnet (133717)");
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        // Add chain if not present
        try {
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: targetChainIdHex,
                chainName: "Metis Hyperion Testnet",
                nativeCurrency: {
                  name: "Test Metis",
                  symbol: "tMETIS",
                  decimals: 18,
                },
                rpcUrls: ["https://hyperion-testnet.metisdevops.link"],
                blockExplorerUrls: ["https://hyperion-testnet-explorer.metisdevops.link"],
              },
            ],
          });
          // Switch after adding
          await provider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: targetChainIdHex }],
          });
          console.log("Added and switched to Metis Hyperion Testnet (133717)");
        } catch (addError) {
          console.error("Failed to add chain:", addError);
        }
      } else {
        console.error("Failed to switch chain:", switchError);
      }
    }
  }, [provider]);

  // Optional: Auto-switch if already connected but on wrong chain
  useEffect(() => {
    if (connected && provider && chainId !== "0x20a55") {
      switchOrAddChain();
    }
  }, [connected, provider, chainId, switchOrAddChain]);

  return (
    <div>
      {connected && chainId === "0x20a55" ? (
        <Button disabled>Connected to Hyperion Testnet</Button>
      ) : (
        <Button disabled={connecting} onClick={handleConnectAndSwitch}>
          Connect to Hyperion Testnet
        </Button>
      )}
    </div>
  );
};