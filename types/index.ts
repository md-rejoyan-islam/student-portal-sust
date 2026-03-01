export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  registration_number: string;
  session: string;
  role: "student";
  rfid?: string;
  phone_number?: string;
}

export interface Department {
  _id: string;
  name: string;
  eiin?: string;
}

export interface StudentProfile {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  registration_number: string;
  session: string;
  department: Department;
  rfid: string;
}

export interface LoginResponseData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  success?: boolean;
  message: string;
  data?: LoginResponseData;
}

export interface LoginRequest {
  registration_number: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  new_password: string;
}

export interface VerifyResetTokenResponse {
  valid: boolean;
  email: string;
  name: string;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface UpdateProfileRequest {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
}

// Course types
export interface StudentCourse {
  _id: string;
  course_id: string;
  course_code: string;
  course_title: string;
  credit: number;
  session: string;
  instructor: string;
  total_classes: number;
  attended_classes: number;
}

export interface Instructor {
  first_name: string;
  last_name: string;
  department: string;
}

export interface CourseResult {
  exam_type: string;
  total_marks: number;
  marks_obtained: number | null;
}

export interface AttendanceRecord {
  date: string;
  status: "Present" | "Absent";
}

export interface SingleCourseData {
  _id: string;
  course_id: string;
  course_code: string;
  course_title: string;
  credit: number;
  session: string;
  instructor: Instructor;
  total_classes: number;
  attended_classes: number;
  result: CourseResult[];
  attendance: AttendanceRecord[];
}

// Enrollment types
export interface EnrollmentCourse {
  _id: string;
  course_id: string;
  course_code: string;
  course_title: string;
  credit: number;
  session: string;
  instructor: string;
}

export interface EnrollmentSession {
  session: string;
  total_courses: number;
}

export interface SingleEnrollmentData {
  _id: string;
  course_id: string;
  course_code: string;
  course_title: string;
  credit: number;
  session: string;
  instructor: Instructor;
  enrollment_status: "available" | "enrolled";
}

export interface EnrollRequest {
  course_id: string;
}

// Summary types
export interface CourseAttendance {
  course_code: string;
  course_title: string;
  attendance_rate: number;
}

export interface RecentAbsent {
  course_code: string;
  course_title: string;
  date: string;
}

export interface StudentSummary {
  total_courses: number;
  attendance_rate: number;
  terms_test_total: number;
  terms_test_attended: number;
  course_attendance: CourseAttendance[];
  recent_absents: RecentAbsent[];
}

// API Response types
export interface ApiResponse<T> {
  success?: boolean;
  message: string;
  data?: T;
}
