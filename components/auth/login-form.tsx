"use client";

import { loginAction } from "@/app/actions";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Lock, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { AuthButton } from "./auth-button";
import { AuthInput } from "./auth-input";

export const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      registrationNumber: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    try {
      const result = await loginAction({
        registration_number: data.registrationNumber,
        password: data.password,
      });

      if (result.success) {
        toast.success("Login Successful", {
          description:
            result.message || "Welcome back! Redirecting to dashboard...",
        });
        router.push("/");
      } else {
        toast.error("Login Failed", {
          description:
            result.message || "Please check your credentials and try again.",
        });
      }
    } catch (err: any) {
      toast.error("Login Failed", {
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Registration Number
        </label>
        <AuthInput
          {...form.register("registrationNumber")}
          placeholder="e.g. 2020331045"
          icon={User}
          error={form.formState.errors.registrationNumber?.message}
        />
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
            Security Key
          </label>
          <Link
            href="/forgot-password"
            className="text-[10px] text-blue-600 hover:text-blue-700 font-semibold uppercase tracking-wide"
          >
            Recover Access
          </Link>
        </div>
        <AuthInput
          {...form.register("password")}
          type="password"
          placeholder="••••••••"
          icon={Lock}
          error={form.formState.errors.password?.message}
        />
      </div>

      <AuthButton type="submit" loading={isLoading}>
        {isLoading ? (
          "Verifying..."
        ) : (
          <>
            Enter Dashboard <ArrowRight size={18} />
          </>
        )}
      </AuthButton>
    </form>
  );
};
