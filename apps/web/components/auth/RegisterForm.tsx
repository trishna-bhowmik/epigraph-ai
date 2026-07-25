"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  registerSchema,
  RegisterFormValues,
} from "@/lib/validators/auth";

import { useRegister } from "@/hooks/useRegister";

import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";

export default function RegisterForm() {
  const router = useRouter();

  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Account created successfully!");

        router.push("/login");
      },

      onError: (error: any) => {
        toast.error(
          error?.response?.data?.detail ??
            "Registration failed."
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
        label="Full Name"
        placeholder="John Doe"
        error={errors.full_name?.message}
        {...register("full_name")}
      />

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
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending
          ? "Creating Account..."
          : "Create Account"}
      </Button>
    </form>
  );
}