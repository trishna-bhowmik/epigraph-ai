"use client";

import {
  Bell,
  Search,
  Sun,
  UserCircle2,
} from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 mx-3 mt-3 flex h-20 items-center justify-between rounded-3xl border border-white/70 bg-indigo-200 px-6 shadow-lg shadow-indigo-950/5 backdrop-blur-xl lg:px-8">

      {/* Search */}

      <div className="relative w-full max-w-md">

        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search projects, graphs..."
          className="w-full rounded-2xl border border-indigo-100 bg-indigo-50/70 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-100"
        />

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-5">

        <button className="rounded-xl p-2 text-indigo-700 transition hover:bg-indigo-50">
          <Bell size={20} />
        </button>

        <button className="rounded-xl p-2 text-indigo-700 transition hover:bg-indigo-50">
          <Sun size={20} />
        </button>

        <div className="flex items-center gap-3 rounded-2xl border border-indigo-100 bg-white px-3 py-2 shadow-sm">

          <UserCircle2
            size={34}
            className="text-teal-600"
          />

          <div>

            <p className="text-sm font-semibold">
              Trishna
            </p>

            <p className="text-xs text-slate-500">
              AI Engineer
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}
