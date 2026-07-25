"use client";

import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "@/lib/api/auth";

export function useLogin() {
  return useMutation({
    mutationFn: AuthAPI.login,
  });
}