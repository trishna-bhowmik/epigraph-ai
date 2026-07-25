import AuthCard from "@/components/auth/AuthCard";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start predicting disease spread with AI."
    >
      <AuthCard>
        <RegisterForm />
      </AuthCard>
    </AuthLayout>
  );
}