"use client";

import { useRouter } from "next/navigation";
import {
  FolderPlus,
  Upload,
  Network,
  Brain,
} from "lucide-react";

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      title: "New Project",
      icon: FolderPlus,
      onClick: () => router.push("/dashboard/projects"),
    },
    {
      title: "Upload Dataset",
      icon: Upload,
      onClick: () => router.push("/dashboard/projects"),
    },
    {
      title: "Generate Graph",
      icon: Network,
      onClick: () => router.push("/dashboard/projects"),
    },
    {
      title: "Train Model",
      icon: Brain,
      onClick: () => router.push("/dashboard/projects"),
    },
  ];

  return (
    <div>

      <h2 className="mb-4 text-xl font-semibold text-indigo-950">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={action.onClick}
              className="rounded-3xl border border-indigo-100 bg-white/80 p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal-300 hover:shadow-xl"
            >
              <Icon
                className="mx-auto mb-3 text-teal-600"
                size={30}
              />

              <p className="font-medium">
                {action.title}
              </p>
            </button>
          );
        })}

      </div>

    </div>
  );
}
