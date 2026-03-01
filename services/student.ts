import {
  ApiResponse,
  ChangePasswordRequest,
  EnrollmentCourse,
  EnrollmentSession,
  EnrollRequest,
  SingleCourseData,
  SingleEnrollmentData,
  StudentCourse,
  StudentProfile,
  StudentSummary,
  UpdateProfileRequest,
} from "@/types";
import { api } from "./api";

export const studentService = {
  // Profile
  updateStudentProfile: async (
    data: UpdateProfileRequest,
  ): Promise<ApiResponse<StudentProfile>> => {
    return api<ApiResponse<StudentProfile>>("/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  changePassword: async (
    data: ChangePasswordRequest,
  ): Promise<ApiResponse<object>> => {
    return api<ApiResponse<object>>("/change-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Courses
  getStudentCourses: async (): Promise<StudentCourse[]> => {
    const response = await api<ApiResponse<StudentCourse[]>>("/courses");
    return response.data || [];
  },

  getSingleCourseData: async (courseId: string): Promise<SingleCourseData> => {
    const response = await api<ApiResponse<SingleCourseData>>(
      `/courses/${courseId}`,
    );
    return response.data as SingleCourseData;
  },

  // Enrollment Sessions
  getEnrollmentSessions: async (): Promise<EnrollmentSession[]> => {
    const response = await api<ApiResponse<EnrollmentSession[]>>(
      "/enrollment-sessions",
    );
    return response.data || [];
  },

  // Enrollments (with optional session filter)
  getEnrollments: async (session?: string): Promise<EnrollmentCourse[]> => {
    const params = session ? { session } : undefined;
    const response = await api<ApiResponse<EnrollmentCourse[]>>(
      "/enrollments",
      { params },
    );
    return response.data || [];
  },

  getSingleEnrollmentData: async (
    courseId: string,
  ): Promise<SingleEnrollmentData> => {
    const response = await api<ApiResponse<SingleEnrollmentData>>(
      `/enrollments/${courseId}`,
    );
    return response.data as SingleEnrollmentData;
  },

  enrollInCourse: async (data: EnrollRequest): Promise<ApiResponse<object>> => {
    return api<ApiResponse<object>>("/enroll", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // Summary
  getStudentSummary: async (): Promise<StudentSummary> => {
    const response = await api<ApiResponse<StudentSummary>>("/summary");
    return response.data as StudentSummary;
  },
};
