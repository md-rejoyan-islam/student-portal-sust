import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to the SUST EEE Student Portal with your registration number and password to access your academic dashboard, courses, and enrollment.",
  openGraph: {
    title: "Login | SUST EEE Student Portal",
    description:
      "Sign in to access your academic records, courses, and enrollment at SUST EEE.",
    type: "website",
    url: "/login",
  },
  keywords: [
    "SUST EEE login",
    "student portal login",
    "SUST sign in",
    "academic portal access",
    "EEE student login",
  ],
  alternates: {
    canonical: "/login",
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
