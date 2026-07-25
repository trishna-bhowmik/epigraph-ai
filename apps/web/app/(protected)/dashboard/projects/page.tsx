"use client";

import Link from "next/link";

import EmptyProjects from "@/components/projects/EmptyProjects";
import ProjectGrid from "@/components/projects/ProjectGrid";
import DatasetHeader from "@/components/datasets/DatasetHeader";
import DatasetStats from "@/components/datasets/DatasetStats";
import DatasetToolbar from "@/components/datasets/DatasetToolbar";
import UploadDropzone from "@/components/datasets/UploadDropzone";
import DatasetGrid from "@/components/datasets/DatasetGrid";

import { useProjects } from "@/hooks/useProjects";

export default function ProjectsPage() {
  const {
    data: projects,
    isLoading,
  } = useProjects();

  if (isLoading) {
    return (

        <div className="text-center py-20">
          Loading projects...
        </div>
    );
  }

  return (
<div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            My Projects
          </h1>

          <p className="mt-2 text-slate-600">
            Manage all your disease prediction projects.
          </p>
        </div>

        <Link
          href="/dashboard/projects/new"
          className="rounded-xl bg-blue-800 px-5 py-3 font-medium text-white hover:bg-blue-700"
        >
          + New Project
        </Link>
      </div>

      {!projects || projects.length === 0 ? (
        <EmptyProjects />
      ) : (
        <ProjectGrid projects={projects} />
      )}
    </div>
  );
}