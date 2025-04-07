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
    <div className="text-black max-w-md mx-auto">
      <UploadDropzone
        endpoint={endpoint}
        appearance={{
          container: {
            backgroundColor: "#f9fafb",
            border: "2px dashed #60a5fa",
            borderRadius: "1rem",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
          },
          label: {
            color: "#1f2937",
            fontSize: "1.125rem",
            fontWeight: "600",
          },
          allowedContent: {
            color: "#6b7280",
            fontSize: "0.875rem",
            marginTop: "0.25rem",
          },
          uploadIcon: {
            color: "#3b82f6",
            width: "48px",
            height: "48px",
          },
          button: {
            backgroundColor: "#3b82f6",
            padding: "0.5rem 1.25rem",
            borderRadius: "0.5rem",
            color: "#ffffff",
            fontWeight: "500",
            border: "none",
            marginTop: "0.5rem",
            transition: "background-color 0.2s ease-in-out",
          },
        }}
        onUploadBegin={() => setFileSelected(true)}
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
