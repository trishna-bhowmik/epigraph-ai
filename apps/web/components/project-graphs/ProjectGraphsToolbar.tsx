"use client";

import { Search, ArrowUpDown } from "lucide-react";

interface ProjectGraphsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  sort: string;
  onSortChange: (value: string) => void;
}

export default function ProjectGraphsToolbar({
  search,
  onSearchChange,
  sort,
  onSortChange,
}: ProjectGraphsToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">

      {/* Search */}

      <div className="relative w-full lg:max-w-md">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />

        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search graphs..."
          className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Sort */}

      <div className="relative">
        <ArrowUpDown
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-8 outline-none transition focus:border-blue-500"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="name">Name</option>
          <option value="nodes">Most Nodes</option>
          <option value="edges">Most Edges</option>
        </select>
      </div>

    </div>
  );
}