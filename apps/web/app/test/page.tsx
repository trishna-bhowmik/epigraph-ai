"use client";

import { useRegister } from "@/hooks/useRegister";

export default function TestPage() {
  const register = useRegister();

  return (
    <button
      onClick={() =>
        register.mutate({
          full_name: "Test User",
          email: "test@example.com",
          password: "Password@123",
        })
      }
      className="rounded-lg bg-blue-800 px-6 py-3 text-white"
    >
      Test Register API
    </button>
  );
}