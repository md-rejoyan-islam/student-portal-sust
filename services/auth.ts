import {
  ApiResponse,
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  StudentProfile,
  VerifyResetTokenResponse,
} from "@/types";
import { cache } from "react";
import { api } from "./api";

/**
 * Cached getMe — deduplicated per server-side request.
 * When layout.tsx and page.tsx both call authService.getMe() in the same
 * render, only ONE actual /me fetch goes to the backend.
 */
const getCachedMe = cache(async (): Promise<StudentProfile> => {
  const response = await api<ApiResponse<StudentProfile>>("/me");
  return response.data as StudentProfile;
});

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    return api<LoginResponse>("/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  forgotPassword: async (
    data: ForgotPasswordRequest,
  ): Promise<ApiResponse<object>> => {
    return api<ApiResponse<object>>("/forgot-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  verifyResetToken: async (
    token: string,
  ): Promise<VerifyResetTokenResponse> => {
    const response = await api<ApiResponse<VerifyResetTokenResponse>>(
      "/verify-reset-token",
      {
        params: { token },
      },
    );
    return response.data as VerifyResetTokenResponse;
  },

  resetPassword: async (
    data: ResetPasswordRequest,
  ): Promise<ApiResponse<object>> => {
    return api<ApiResponse<object>>("/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  getMe: getCachedMe,

  logout: async (): Promise<ApiResponse<null>> => {
    return api<ApiResponse<null>>("/logout", {
      method: "POST",
    });
  },
};
