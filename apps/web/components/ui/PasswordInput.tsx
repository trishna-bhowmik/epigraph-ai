"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function PasswordInput({
  label,
  error,
  className,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-semibold text-indigo-950">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          className={cn(
            "w-full rounded-xl border border-indigo-200 bg-white px-4 py-3 pr-12 text-indigo-950 shadow-sm",
            "placeholder:text-slate-400",
            "focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/15",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error &&
              "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-teal-700"
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
