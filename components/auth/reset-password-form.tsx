"use client";

import { resetPasswordAction } from "@/app/actions/auth-actions";
import { ResetPasswordSchema } from "@/schemas";
import { VerifyResetTokenResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Eye, EyeOff, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { AuthButton } from "./auth-button";
import { AuthInput } from "./auth-input";

interface ResetPasswordFormProps {
    token?: string;
    verificationData?: VerifyResetTokenResponse | null;
    isTokenInvalid?: boolean;
}

export const ResetPasswordForm = ({ token, verificationData, isTokenInvalid }: ResetPasswordFormProps) => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    if (!token) return;
    setIsLoading(true);

    try {
      const result = await resetPasswordAction({
        token,
        new_password: data.password,
      });

      if (result.success) {
        setResetSuccess(true);
        toast.success("Password Reset Successful", {
          description: result.message || "Your password has been reset successfully.",
        });

        // Redirect to login after 3 seconds
        setTimeout(() => {
            router.push("/login");
        }, 3000);
      } else {
        toast.error("Reset Failed", {
             description: result.message || "Failed to reset password.",
        });
      }
    } catch (err: any) {
      toast.error("Reset Failed", {
        description: "An unexpected error occurred",
      });
    } finally {
        setIsLoading(false);
    }
  };

  // No token provided
  if (!token) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">
          Invalid Reset Link
        </h3>
        <p className="text-sm text-slate-600">
          No reset token was provided. Please request a new password reset link.
        </p>
        <Link
          href="/forgot-password"
          className="inline-block mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Request New Reset Link
        </Link>
      </div>
    );
  }

  // Token is invalid or expired
  if (isTokenInvalid) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">
          Link Expired or Invalid
        </h3>
        <p className="text-sm text-slate-600">
          This password reset link has expired or is invalid. Please request a
          new one.
        </p>
        <Link
          href="/forgot-password"
          className="inline-block mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Request New Reset Link
        </Link>
      </div>
    );
  }

  // Reset successful
  if (resetSuccess) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">
          Password Reset Complete
        </h3>
        <p className="text-sm text-slate-600">
          Your password has been successfully reset. You will be redirected to
          the login page shortly.
        </p>
        <Link
          href="/login"
          className="inline-block mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Go to Login Now
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      {/* Welcome message */}
      {verificationData?.name && (
        <div className="mb-6 text-center bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
          <p className="text-blue-800 text-sm">
            Welcome back, <span className="font-semibold">{verificationData.name}</span>
          </p>
          <p className="text-blue-600 text-xs mt-1">
            Create a new secure password for your account
          </p>
        </div>
      )}

      <div>
        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
          New Password
        </label>
        <div className="relative">
          <AuthInput
            {...form.register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            icon={Lock}
            error={form.formState.errors.password?.message}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <AuthInput
            {...form.register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            icon={Lock}
            error={form.formState.errors.confirmPassword?.message}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Password Requirements
        </p>
        <ul className="text-xs text-slate-600 space-y-1">
          <li>• Minimum 6 characters</li>
          <li>• Mix of letters and numbers recommended</li>
          <li>• Avoid using personal information</li>
        </ul>
      </div>

      <AuthButton type="submit" loading={isLoading}>
        {isLoading ? "Resetting..." : "Reset Password"}
      </AuthButton>
    </form>
  );
};
