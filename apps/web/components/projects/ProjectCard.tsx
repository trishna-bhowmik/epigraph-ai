"use client";

import Link from "next/link";
import { FolderKanban } from "lucide-react";
import { Project } from "@/lib/api/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <Link href={`/dashboard/projects/${project.id}`}>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <div className="mb-4 flex items-center gap-3">
          <FolderKanban className="h-8 w-8 text-blue-600" />

          <div>
            <h3 className="text-lg font-semibold">
              {project.name}
            </h3>

            <p className="text-sm text-slate-500">
              {new Date(project.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <p className="line-clamp-3 text-slate-600">
          {project.description || "No description provided."}
        </p>
      </div>
    </Link>
  );
}