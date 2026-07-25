"use client";

import Link from "next/link";
import { FolderPlus } from "lucide-react";

export default function EmptyProjects() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white py-20">
      <FolderPlus className="mb-4 h-16 w-16 text-slate-400" />

      <h2 className="text-2xl font-semibold">
        No Projects Yet
      </h2>

      <p className="mt-2 text-slate-500">
        Create your first project to start analyzing disease spread.
      </p>

      <Link
        href="/dashboard/projects/new"
        className="mt-8 rounded-xl bg-blue-800 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        Create Project
      </Link>
    </div>
  );
}