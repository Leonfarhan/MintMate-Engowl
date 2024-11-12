"use client";

import { Card } from "@/components/ui/card";

interface NFTCardProps {
  nft: {
    name: string;
    image: string;
    description: string;
  };
}

export function NFTCard({ nft }: NFTCardProps) {
  return (
    <Card className="p-4">
      <img
        src={nft.image}
        alt={nft.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="font-semibold">{nft.name}</h3>
      <p className="text-sm text-gray-500 mt-1">{nft.description}</p>
    </Card>
  );
}