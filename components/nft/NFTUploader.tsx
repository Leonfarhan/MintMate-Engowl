"use client";

import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

interface NFTUploaderProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

export function NFTUploader({ file, setFile }: NFTUploaderProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  return (
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
  );
}