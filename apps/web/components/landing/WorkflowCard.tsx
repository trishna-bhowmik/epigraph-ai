import { LucideIcon } from "lucide-react";

interface WorkflowCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isLast?: boolean;
}

export default function WorkflowCard({
  icon: Icon,
  title,
  description,
  isLast = false,
}: WorkflowCardProps) {
  return (
    <div className="relative flex gap-6">
      <div className="flex flex-col items-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-800 text-white shadow-lg">
          <Icon size={24} />
        </div>

        {!isLast && (
          <div className="mt-2 h-20 w-1 rounded bg-blue-200" />
        )}
      </div>

      <div className="pb-10">
        <h3 className="text-xl font-semibold text-slate-900">
          {title}
        </h3>

        <p className="mt-2 text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}