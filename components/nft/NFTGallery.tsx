"use client";

import { useState, useEffect } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { NFTCard } from "./NFTCard";

interface NFTMetadata {
  name: string;
  image: string;
  description: string;
}

export default function NFTGallery() {
  const [nfts, setNfts] = useState<NFTMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { contract } = useContract("0xA895a9b5882DBa287CF359b6a722C5be46aCb675");
  const { data: tokenCounter } = useContractRead(contract, "_tokenIdCounter");

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!contract || !tokenCounter) return;

      try {
        const nftData = [];
        for (let i = 0; i < Number(tokenCounter); i++) {
          const uri = await contract.call("tokenURI", [i]);
          const response = await fetch(uri);
          const metadata = await response.json();
          nftData.push(metadata);
        }
        setNfts(nftData);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNFTs();
  }, [contract, tokenCounter]);

  if (isLoading) {
    return (
      <Card className="p-6 flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Minted NFTs</h2>
      
      {nfts.length === 0 ? (
        <p className="text-center text-gray-500">No NFTs have been minted yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {nfts.map((nft, index) => (
            <NFTCard key={index} nft={nft} />
          ))}
        </div>
      )}
    </Card>
  );
}