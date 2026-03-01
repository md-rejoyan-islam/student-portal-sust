"use server";

import { studentService } from "@/services";
import { revalidatePath } from "next/cache";

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
