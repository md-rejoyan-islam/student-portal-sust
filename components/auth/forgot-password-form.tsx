"use client";

import { forgotPasswordAction } from "@/app/actions/auth-actions";
import { ForgotPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { AuthButton } from "./auth-button";
import { AuthInput } from "./auth-input";

export const ForgotPasswordForm = () => {
    const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    setIsLoading(true);
    try {
      const result = await forgotPasswordAction({
        email: data.email,
      });

      // API returns message on success
      if (result.success) {
        setEmailSent(true);
        toast.success("Email Sent", {
          description:
            result.message || "Password reset instructions sent to your email!",
        });
      } else {
        toast.error("Request Failed", {
            description: result.message || "Failed to send reset email.",
       });
      }
    } catch (err: any) {
      toast.error("Request Failed", {
        description: "An unexpected error occurred.",
      });
    } finally {
        setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <Mail className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800">
          Check Your Email
        </h3>
        <p className="text-sm text-slate-600">
          We&apos;ve sent password reset instructions to your email address.
        </p>
        <button
          onClick={() => setEmailSent(false)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Try a different email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
          SUST Mail Address
        </label>
        <AuthInput
          {...form.register("email")}
          type="email"
          placeholder="student@eee.sust.edu"
          icon={Mail}
          error={form.formState.errors.email?.message}
        />
      </div>

      <AuthButton type="submit" loading={isLoading}>
        {isLoading ? "Sending..." : "Send Verification"}
      </AuthButton>
    </form>
  );
};
