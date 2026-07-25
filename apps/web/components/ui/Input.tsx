import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({
  label,
  error,
  className,
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-semibold text-indigo-950">
          {label}
        </label>
      )}

      <input
        className={cn(
          "w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 text-indigo-950 shadow-sm",
          "placeholder:text-slate-400",
          "focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/15",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
