"use client";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import { useState } from "react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: "messageFile" | "serverImage";
  value?: string;
}

const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();
  const [fileSelected, setFileSelected] = useState(false);

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20 mx-auto">
        <Image
          src={value}
          alt="Upload"
          fill
          className="rounded-full object-cover object-center"
        />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="text-black">
      <UploadDropzone
        endpoint={endpoint}
        appearance={{
          container: {
            backgroundColor: "#f9fafb",
            border: "2px dashed #3b82f6",
            borderRadius: "0.75rem",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            color: "#000000 !important",
          },
          label: {
            color: "#000000",
            fontSize: "1rem",
            fontWeight: "500",
          },
          allowedContent: {
            color: "#6b7280",
            fontSize: "0.875rem",
          },
          uploadIcon: {
            color: "#3b82f6",
            width: "40px",
            height: "40px",
          },
          button: {
            color: "#000",
          },
        }}
        content={{
          button: ({ isUploading }) => {
            if (isUploading) return "Uploading...";
            if (fileSelected) return "Upload Now";
            return "Upload Now";
          },
        }}
        onUploadBegin={() => {
          setFileSelected(true);
        }}
        onClientUploadComplete={(res) => {
          setFileSelected(false); 
          onChange(res?.[0].ufsUrl); 
        }}
        onUploadError={(error) => {
          console.error(error);
          setFileSelected(false); 
        }}
      />
    </div>
  );
};

export default FileUpload;