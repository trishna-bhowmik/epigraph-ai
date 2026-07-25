"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FolderKanban,
  BarChart3,
  FileText,
  LogOut,
  UserRound,
} from "lucide-react";
import clsx from "clsx";
import { useAuth } from "@/contexts/AuthContext";

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: BarChart3,
  },
  {
    href: "/dashboard/projects",
    label: "Projects",
    icon: FolderKanban,
  },
  {
    href: "/dashboard/reports",
    label: "Reports",
    icon: FileText,
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: UserRound,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <aside className="m-3 hidden w-64 shrink-0 flex-col rounded-3xl border border-slate-800/60 bg-gradient-to-b from-slate-800 via-indigo-800 to-slate-900 text-slate-100 shadow-2xl shadow-slate-950/30 lg:flex">
      <div className="border-b border-white/10 p-6">
        <h1 className="text-xl font-extrabold tracking-tight text-white">
          EpiGraph AI
        </h1>
      </div>

      <nav className="space-y-2 p-4">
        {links.map((link) => {
          const Icon = link.icon;

          const active =
            pathname === link.href ||
            pathname.startsWith(link.href + "/");

          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                active
                  ? "bg-teal-400 text-slate-950 shadow-lg shadow-teal-950/20"
                  : "text-indigo-100/75 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon size={20} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-white/10 p-4">
        <Link href="/dashboard/profile" className="mb-3 flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3 transition hover:bg-white/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-300 font-bold text-slate-950">{user?.full_name?.slice(0, 1).toUpperCase() ?? "U"}</div>
          <div className="min-w-0"><p className="truncate text-sm font-semibold text-white">{user?.full_name ?? "Profile"}</p><p className="truncate text-xs text-indigo-200">{user?.email ?? "Manage account"}</p></div>
        </Link>
        <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-indigo-100 transition hover:bg-white/10 hover:text-white"><LogOut size={18} />Log out</button>
      </div>
    </aside>
  );
}
