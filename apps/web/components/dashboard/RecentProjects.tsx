"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import type { RecentProject } from "@/lib/api/dashboard";

interface Props {
  projects: RecentProject[];
}

export default function RecentProjects({
  projects,
}: Props) {
  const router = useRouter();

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-xl font-semibold">
          Recent Projects
        </h2>

        <button
          onClick={() =>
            router.push("/dashboard/projects")
          }
          className="text-sm text-blue-600"
        >
          View All
        </button>

      </div>

      <div className="space-y-4">

        {projects.length === 0 && (
          <p className="text-gray-500">
            No projects found.
          </p>
        )}

        {projects.map((project) => (

          <button
            key={project.id}
            onClick={() =>
              router.push(
                `/dashboard/projects/${project.id}`
              )
            }
            className="flex w-full items-center justify-between rounded-xl border p-4 text-left transition hover:bg-gray-50"
          >
            <div>

              <h3 className="font-semibold">
                {project.name}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {project.description || "No description"}
              </p>

            </div>

            <ArrowRight />

          </button>

        ))}

      </div>

    </div>
  );
}