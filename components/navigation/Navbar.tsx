"use client";

import { ConnectWallet } from "@thirdweb-dev/react";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="ml-2 text-xl font-bold">MintMate</span>
          </div>
          <ConnectWallet 
            theme="dark"
            btnTitle="Connect Wallet"
          />
        </div>
      </div>
    </nav>
  );
}