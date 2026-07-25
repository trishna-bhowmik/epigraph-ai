"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProjectNavigationProps {
  projectId: string;
}

export default function ProjectNavigation({
  projectId,
}: ProjectNavigationProps) {
  const pathname = usePathname();

  const tabs = [
    {
      label: "Datasets",
      href: `/dashboard/projects/${projectId}`,
    },
    {
      label: "Graphs",
      href: `/dashboard/projects/${projectId}/graphs`,
    },
    {
      label: "Training",
      href: `/dashboard/projects/${projectId}/training`,
    },
    {
      label: "Prediction",
      href: `/dashboard/projects/${projectId}/prediction`,
    },
    {
      label: "Simulation",
      href: `/dashboard/projects/${projectId}/simulation`,
    },
    {
      label: "Explainability",
      href: `/dashboard/projects/${projectId}/explainability`,
    },
    {
      label: "Reports",
      href: `/dashboard/projects/${projectId}/reports`,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const active =
            pathname === tab.href ||
            pathname.startsWith(tab.href + "/");

          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={`rounded-xl px-5 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-blue-900 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
