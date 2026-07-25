
import ProjectForm from "@/components/projects/ProjectForm";

export default function NewProjectPage() {
  return (
  
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold">
          Create New Project
        </h1>

        <p className="mb-8 text-slate-600">
          Organize datasets, predictions and reports inside a project.
        </p>

        <div className="rounded-2xl bg-white p-8 shadow">
          <ProjectForm />
        </div>
      </div>
   
  );
}