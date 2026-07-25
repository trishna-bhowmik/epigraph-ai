"use client";

import { Search, ArrowUpDown, Filter } from "lucide-react";

interface DatasetToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;

  sort: string;
  onSortChange: (value: string) => void;

  filter: string;
  onFilterChange: (value: string) => void;
}

export default function DatasetToolbar({
  search,
  onSearchChange,
  sort,
  onSortChange,
  filter,
  onFilterChange,
}: DatasetToolbarProps) {
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
          placeholder="Search datasets..."
          className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-blue-800 focus:ring-2 focus:ring-blue-100"
        />

      </div>

      {/* Controls */}

      <div className="flex gap-3">

        <div className="relative">

          <ArrowUpDown
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-8 outline-none transition focus:border-blue-800"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name">Name</option>
            <option value="size">Size</option>
          </select>

        </div>

        <div className="relative">

          <Filter
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-8 outline-none transition focus:border-blue-800"
          >
            <option value="all">All</option>
            <option value="ready">Ready</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>

        </div>

      </div>

    </div>
  );
}