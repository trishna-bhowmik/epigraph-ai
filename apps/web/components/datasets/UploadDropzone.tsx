"use client";

import { CloudUpload, FileText } from "lucide-react";
import { useRef, DragEvent } from "react";

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void;
}

export default function UploadDropzone({
  onFileSelect,
}: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="rounded-3xl border-2 border-dashed border-slate-300 bg-white p-12 text-center transition duration-300 hover:border-blue-500 hover:bg-blue-50"
    >

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">

        <CloudUpload
          className="text-blue-800"
          size={36}
        />

      </div>

      <h3 className="mt-6 text-2xl font-semibold text-slate-900">
        Drag & Drop Dataset
      </h3>

      <p className="mt-3 text-slate-500">
        Upload CSV, Excel or JSON datasets
      </p>

      <p className="mt-1 text-sm text-slate-400">
        Maximum file size: 100 MB
      </p>

      <button
        onClick={() => inputRef.current?.click()}
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-800 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        <FileText size={18} />

        Browse Files
      </button>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept=".csv,.xlsx,.xls,.json"
        onChange={(e) => {
  const file = e.target.files?.[0];

  if (file) {
    onFileSelect(file);
  }
}}
      />

    </div>
  );
}