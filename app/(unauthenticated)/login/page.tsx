import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portal Login | SUST EEE",
  description:
    "Enter your registration number and security key to access the academic dashboard.",
  openGraph: {
    title: "Portal Login | SUST EEE",
    description: "Enter your credentials to access academic records.",
  },
};

export default async function LoginPage() {
  return (
    <AuthCard
      title="Portal Login"
      subtitle="Enter your credentials to access academic records."
    >
      <LoginForm />
    </AuthCard>
  );
}
