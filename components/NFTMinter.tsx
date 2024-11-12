"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useContract, useAddress, useStorageUpload } from "@thirdweb-dev/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Upload, Loader2 } from "lucide-react";

export default function NFTMinter() {
  const address = useAddress();
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const { contract } = useContract("0xA895a9b5882DBa287CF359b6a722C5be46aCb675");
  const { mutateAsync: upload } = useStorageUpload();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  const handleMint = async () => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!file || !name) {
      toast.error("Please provide both an image and a name");
      return;
    }

    try {
      setIsUploading(true);
      // Upload image to IPFS
      const imageUri = await upload({ data: [file] });
      
      // Create metadata
      const metadata = {
        name,
        image: imageUri[0],
        description: `Created with MintMate by ${address}`,
      };
      
      // Upload metadata to IPFS
      const metadataUri = await upload({ data: [metadata] });

      setIsUploading(false);
      setIsMinting(true);

      // Mint NFT
      const tx = await contract?.call("mintNFT", [address, metadataUri[0]]);
      
      toast.success("NFT minted successfully!");
      setName("");
      setFile(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to mint NFT");
    } finally {
      setIsUploading(false);
      setIsMinting(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Create New NFT</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">NFT Name</label>
          <Input
            type="text"
            placeholder="Enter NFT name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Upload Image</label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-primary" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {file ? (
              <div className="space-y-2">
                <p className="text-sm">{file.name}</p>
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="max-h-48 mx-auto"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p>Drag & drop an image here, or click to select</p>
              </div>
            )}
          </div>
        </div>

        <Button
          onClick={handleMint}
          disabled={!address || !file || !name || isUploading || isMinting}
          className="w-full"
        >
          {isUploading || isMinting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isUploading ? "Uploading..." : "Minting..."}
            </>
          ) : (
            "Mint NFT"
          )}
        </Button>
      </div>
    </Card>
  );
}