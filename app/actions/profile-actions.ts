"use server";

import { studentService } from "@/services";
import { ChangePasswordRequest, UpdateProfileRequest } from "@/types";
import { revalidatePath } from "next/cache";

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
