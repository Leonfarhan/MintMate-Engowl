"use client";

import { Input } from "@/components/ui/input";

interface NFTFormProps {
  name: string;
  setName: (name: string) => void;
}

export function NFTForm({ name, setName }: NFTFormProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">NFT Name</label>
      <Input
        type="text"
        placeholder="Enter NFT name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}