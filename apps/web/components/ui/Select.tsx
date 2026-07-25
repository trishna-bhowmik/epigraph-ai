"use client";

import { ChevronDown } from "lucide-react";

interface SelectProps {
  label?: string;
  value: string;
  options: string[];
  placeholder?: string;
  onChange: (value: string) => void;
}

export default function Select({
  label,
  value,
  options,
  placeholder = "Select an option",
  onChange,
}: SelectProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            h-11
            w-full
            appearance-none
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            pr-10
            text-sm
            text-slate-700
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-200
          "
        >
          <option value="">
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="
            pointer-events-none
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />
      </div>
    </div>
  );
}