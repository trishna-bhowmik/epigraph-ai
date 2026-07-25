"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  projectSchema,
  ProjectFormValues,
} from "@/lib/validators/project";

import { useCreateProject } from "@/hooks/useCreateProject";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ProjectForm() {
  const router = useRouter();

  const createProject = useCreateProject();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),

    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data: ProjectFormValues) => {
    createProject.mutate(data, {
      onSuccess: () => {
        toast.success("Project created successfully.");

        router.push("/dashboard/projects");
      },

      onError: (error: any) => {
        toast.error(
          error?.response?.data?.detail ??
            "Failed to create project."
        );
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <Input
        label="Project Name"
        placeholder="Disease Spread Prediction"
        error={errors.name?.message}
        {...register("name")}
      />

      <div>
        <label className="mb-2 block text-sm font-medium">
          Description
        </label>

        <textarea
          rows={5}
          {...register("description")}
          className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-blue-500"
          placeholder="Describe your project..."
        />

        {errors.description && (
          <p className="mt-2 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={createProject.isPending}
      >
        {createProject.isPending
          ? "Creating..."
          : "Create Project"}
      </Button>
    </form>
  );
}