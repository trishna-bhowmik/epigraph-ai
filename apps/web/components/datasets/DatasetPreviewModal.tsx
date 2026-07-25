"use client";

import { useMemo, useState } from "react";
import {
  X,
  FileSpreadsheet,
  Search,
  Table2,
  Database,
  Calendar,
} from "lucide-react";

interface DatasetPreviewModalProps {
  open: boolean;
  onClose: () => void;

  title: string;
  fileSize: string;
  uploadedAt: string;

  columns: string[];
  rows: Record<string, any>[];
}

export default function DatasetPreviewModal({
  open,
  onClose,
  title,
  fileSize,
  uploadedAt,
  columns,
  rows,
}: DatasetPreviewModalProps) {
  const [search, setSearch] = useState("");

  const filteredColumns = useMemo(() => {
    if (!search) return columns;

    return columns.filter((column) =>
      column.toLowerCase().includes(search.toLowerCase())
    );
  }, [columns, search]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-6">

      <div className="flex h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="border-b border-slate-200 bg-gradient-to-r from-blue-800 to-indigo-800 p-6 text-white">

          <div className="flex items-start justify-between">

            <div className="flex items-center gap-4">

              <div className="rounded-2xl bg-white/20 p-4">
                <FileSpreadsheet size={28} />
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  {title}
                </h2>

                <p className="mt-1 text-blue-100">
                  Dataset Preview
                </p>

              </div>

            </div>

            <button
              onClick={onClose}
              className="rounded-xl bg-white/10 p-2 transition hover:bg-white/20"
            >
              <X />
            </button>

          </div>

          {/* Stats */}

          <div className="mt-6 grid grid-cols-4 gap-4">

            <div className="rounded-xl bg-white/10 p-4">

              <div className="flex items-center gap-2 text-sm text-blue-100">

                <Database size={16} />

                Columns

              </div>

              <div className="mt-2 text-2xl font-bold">
                {columns.length}
              </div>

            </div>

            <div className="rounded-xl bg-white/10 p-4">

              <div className="flex items-center gap-2 text-sm text-blue-100">

                <Table2 size={16} />

                Preview Rows

              </div>

              <div className="mt-2 text-2xl font-bold">
                {rows.length}
              </div>

            </div>

            <div className="rounded-xl bg-white/10 p-4">

              <div className="text-sm text-blue-100">

                File Size

              </div>

              <div className="mt-2 text-2xl font-bold">
                {fileSize}
              </div>

            </div>

            <div className="rounded-xl bg-white/10 p-4">

              <div className="flex items-center gap-2 text-sm text-blue-100">

                <Calendar size={16} />

                Uploaded

              </div>

              <div className="mt-2 font-semibold">
                {uploadedAt}
              </div>

            </div>

          </div>

        </div>

        {/* Search */}

        <div className="border-b border-slate-200 bg-slate-50 p-4">

          <div className="relative max-w-sm">

            <Search
              className="absolute left-3 top-3 text-slate-400"
              size={18}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search column..."
              className="w-full rounded-xl border border-slate-200 py-2 pl-10 pr-4 outline-none focus:border-blue-500"
            />

          </div>

        </div>

        {/* Table */}

        <div className="flex-1 overflow-auto">

          <table className="min-w-full text-sm">

            <thead className="sticky top-0 z-20 bg-slate-100">

              <tr>

                {filteredColumns.map((column) => (

                  <th
                    key={column}
                    className="border-b border-slate-200 px-6 py-4 text-left font-semibold text-slate-700"
                  >
                    {column}
                  </th>

                ))}

              </tr>

            </thead>

            <tbody>

              {rows.map((row, index) => (

                <tr
                  key={index}
                  className="odd:bg-white even:bg-slate-50 hover:bg-blue-50 transition"
                >

                  {filteredColumns.map((column) => (

                    <td
                      key={column}
                      className="border-b border-slate-100 px-6 py-3 whitespace-nowrap"
                    >
                      {String(row[column] ?? "-")}
                    </td>

                  ))}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Footer */}

        <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 text-sm text-slate-500">

          Showing first <strong>{rows.length}</strong> rows of the dataset.

        </div>

      </div>

    </div>
  );
}