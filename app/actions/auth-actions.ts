"use server";

import { removeAuthCookies, setAuthCookies } from "@/app/actions";
import { refreshAccessToken } from "@/lib/refresh-token";
import { authService } from "@/services";
import {
  ForgotPasswordRequest,
  LoginRequest,
  ResetPasswordRequest,
} from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(data: LoginRequest) {
  try {
    const response = await authService.login(data);

    if (
      response.data &&
      response.data.accessToken &&
      response.data.refreshToken
    ) {
      await setAuthCookies(
        response.data.accessToken,
        response.data.refreshToken,
      );
    } else {
      return { success: false, message: response.message };
    }

    return { success: true, message: response.message || "Login successful" };
  } catch (error: unknown) {
    const err = error as { data?: { message?: string }; message?: string };
    return {
      success: false,
      message: err.data?.message || err.message || "Login failed",
    };
  }
}

export async function logoutAction() {
  try {
    // Optional: Call backend logout endpoint if needed
    // await authService.logout();
  } catch (error) {
    console.error("Logout failed", error);
  }
  // Clear cookies
  await removeAuthCookies();

  redirect("/login");
}

export async function forgotPasswordAction(data: ForgotPasswordRequest) {
  try {
    const result = await authService.forgotPassword(data);
    return { success: true, message: result.message || "Reset link sent" };
  } catch (error: unknown) {
    const err = error as { data?: { message?: string }; message?: string };
    return {
      success: false,
      message: err.data?.message || err.message || "Request failed",
    };
  }
}

export async function resetPasswordAction(data: ResetPasswordRequest) {
  try {
    const result = await authService.resetPassword(data);
    return {
      success: true,
      message: result.message || "Password reset successful",
    };
  } catch (error: unknown) {
    const err = error as { data?: { message?: string }; message?: string };
    return {
      success: false,
      message: err.data?.message || err.message || "Reset failed",
    };
  }
}

export async function refreshSession() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) return null;

  try {
    const newAccessToken = await refreshAccessToken(refreshToken);
    if (newAccessToken) {
      await setAuthCookies(newAccessToken, refreshToken);
      return newAccessToken;
    }
  } catch (error) {
    console.error("Refresh session failed:", error);
  }
  return null;
}
