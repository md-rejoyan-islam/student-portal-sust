import { AuthCard } from "@/components/auth/auth-card";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Recover access to your SUST EEE Student Portal account. Enter your registered email to receive a password reset link.",
  openGraph: {
    title: "Forgot Password | SUST EEE Student Portal",
    description:
      "Recover access to your academic portal account via your SUST email.",
    type: "website",
    url: "/forgot-password",
  },
  keywords: [
    "SUST EEE forgot password",
    "reset password",
    "account recovery",
    "student portal recovery",
  ],
  alternates: {
    canonical: "/forgot-password",
  },
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Reset Access"
      subtitle="Check your SUST email for instructions."
      showBack={true}
      backHref="/login"
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
