"use client";

import { toast } from "sonner";

import UploadDropzone from "./UploadDropzone";

import { useUploadDataset } from "@/hooks/useUploadDataset";

type Props = {
  projectId: string;
};

export default function DatasetUpload({
  projectId,
}: Props) {
  const uploadMutation =
    useUploadDataset(projectId);

  const handleUpload = (
    file: File
  ) => {
    uploadMutation.mutate(file, {
      onSuccess: () => {
        toast.success(
          "Dataset uploaded successfully."
        );
      },

      onError: (error: any) => {
        toast.error(
          error?.response?.data?.detail ??
            "Upload failed."
        );
      },
    });
  };

  return (
    <UploadDropzone
      onFileSelect={handleUpload}
    />
  );
}