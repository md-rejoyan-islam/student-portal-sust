"use server";

import { refreshAccessToken } from "@/lib/refresh-token";
import { authService, studentService } from "@/services";
import {
  ChangePasswordRequest,
  ForgotPasswordRequest,
  LoginRequest,
  ResetPasswordRequest,
  UpdateProfileRequest,
} from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ─── Cookie Helpers ──────────────────────────────────────────────────────────

// Set a cookie
export async function setCookie(name: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

// Get a cookie value
export async function getCookie(name: string) {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string,
) {
  await setCookie("accessToken", accessToken);
  await setCookie("refreshToken", refreshToken);
}

export async function removeAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}

export async function getAccessToken() {
  return await getCookie("accessToken");
}

// ─── Auth Actions ────────────────────────────────────────────────────────────

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

// ─── Enrollment Actions ──────────────────────────────────────────────────────

export async function enrollInCourseAction(courseId: string) {
  try {
    const result = await studentService.enrollInCourse({ course_id: courseId });
    revalidatePath("/courses");
    revalidatePath("/enrollment");
    return { success: true, message: result.message || "Enrollment submitted" };
  } catch (error: unknown) {
    const err = error as { data?: { message?: string }; message?: string };
    return {
      success: false,
      message: err.data?.message || err.message || "Enrollment failed",
    };
  }
}

// ─── Profile Actions ─────────────────────────────────────────────────────────

export async function updateProfileAction(data: UpdateProfileRequest) {
  try {
    const result = await studentService.updateStudentProfile(data);
    revalidatePath("/profile");
    return {
      success: true,
      message: result.message || "Profile updated successfully",
    };
  } catch (error: unknown) {
    const err = error as { data?: { message?: string }; message?: string };
    return {
      success: false,
      message: err.data?.message || err.message || "Profile update failed",
    };
  }
}

export async function changePasswordAction(data: ChangePasswordRequest) {
  try {
    const result = await studentService.changePassword(data);
    return {
      success: true,
      message: result.message || "Password changed successfully",
    };
  } catch (error: unknown) {
    const err = error as { data?: { message?: string }; message?: string };
    return {
      success: false,
      message: err.data?.message || err.message || "Password change failed",
    };
  }
}
