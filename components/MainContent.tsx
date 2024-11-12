"use client";

import { useAddress } from "@thirdweb-dev/react";
import NFTMinter from "@/components/nft/NFTMinter";
import NFTGallery from "@/components/nft/NFTGallery";
import Navbar from "@/components/navigation/Navbar";

export default function MainContent() {
  const address = useAddress();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Create & Mint Your NFTs
          </h1>
          <p className="text-lg text-muted-foreground">
            Upload your artwork, give it a name, and mint it on the Sepolia testnet
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <NFTMinter />
          <NFTGallery />
        </div>
      </div>
    </main>
  );
}