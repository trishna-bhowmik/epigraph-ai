"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  loginSchema,
  LoginFormValues,
} from "@/lib/validators/auth";

import { useLogin } from "@/hooks/useLogin";

import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginForm() {
  const router = useRouter();

  const loginMutation = useLogin();
  const { refreshUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
  loginMutation.mutate(data, {
    onSuccess: async (response) => {
  localStorage.setItem(
    "access_token",
    response.data.access_token
  );

  await refreshUser();

  toast.success("Welcome back!");

  router.push("/dashboard");
},

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.detail ??
          "Invalid email or password."
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
        label="Email"
        placeholder="john@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <PasswordInput
        label="Password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />

      <Button
        type="submit"
        className="w-full"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending
          ? "Signing In..."
          : "Sign In"}
      </Button>
    </form>
  );
}