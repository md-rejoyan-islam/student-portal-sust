"use client";

import { enrollInCourseAction } from "@/app/actions/enrollment-actions";
import { SingleEnrollmentData } from "@/types";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface EnrollmentDetailContentProps {
  course: SingleEnrollmentData;
}

export function EnrollmentDetailContent({
  course,
}: EnrollmentDetailContentProps) {
  const router = useRouter();
  const [isEnrolling, setIsEnrolling] = useState(false);

  const isEnrolled = course.enrollment_status === "enrolled";

  // Helper to format instructor name
  const getInstructorName = () => {
    if (!course.instructor) return "N/A";
    const { first_name, last_name } = course.instructor;
    return `${first_name || ""} ${last_name || ""}`.trim() || "N/A";
  };

  const handleEnroll = async () => {
    setIsEnrolling(true);
    try {
      const result = await enrollInCourseAction(course._id);
      if (result.success) {
        toast.success("Enrollment Submitted", {
          description: result.message,
        });
        router.push("/courses");
      } else {
        toast.error("Enrollment Failed", {
          description: result.message,
        });
      }
    } catch (err: unknown) {
      toast.error("Enrollment Failed", {
        description: "An unexpected error occurred",
      });
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-300 max-w-4xl mx-auto">
      {/* Page Header - Always visible */}
      <header className="pb-4 md:pb-5 border-b border-[rgb(var(--slate-200))]">
        <div className="flex items-center gap-3 mb-3">
          <Link
            href="/enrollment"
            className="p-2 md:p-2.5 rounded-xl bg-[rgb(var(--slate-100))] text-[rgb(var(--slate-500))] hover:bg-[rgb(var(--brand-primary))]/10 hover:text-[rgb(var(--brand-primary))] transition-all group"
          >
            <ArrowLeft
              size={14}
              className="md:w-4 md:h-4 group-hover:-translate-x-0.5 transition-transform"
            />
          </Link>
          <span className="badge-primary">{course.course_code}</span>
          <span className="text-[9px] md:text-[10px] text-[rgb(var(--slate-400))] bg-[rgb(var(--slate-50))] px-2 py-0.5 rounded">
            {course.session}
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-[rgb(var(--slate-800))]">
              {course.course_title}
            </h1>
            <p className="text-[10px] md:text-xs text-[rgb(var(--slate-500))] mt-1">
              {getInstructorName()} • {course.session}
            </p>
          </div>
          <span className="text-[10px] md:text-xs font-medium text-[rgb(var(--slate-600))] bg-[rgb(var(--slate-50))] px-2.5 py-1 rounded border border-[rgb(var(--slate-200))] w-fit">
            {course.credit} Credit Hours
          </span>
        </div>
      </header>

      {/* Dynamic Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        {/* Course Information */}
        <div className="lg:col-span-2 space-y-4 md:space-y-5">
          {/* Course Details Card */}
          <section className="card-interactive p-4 md:p-5">
            <h2 className="text-xs md:text-sm font-semibold text-[rgb(var(--slate-800))] mb-4 flex items-center gap-2">
              <BookOpen size={14} className="text-[rgb(var(--slate-400))]" />
              Course Details
            </h2>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-1">
                <p className="section-label">Course Code</p>
                <p className="text-xs md:text-sm font-semibold text-[rgb(var(--slate-700))]">
                  {course.course_code}
                </p>
              </div>
              <div className="space-y-1">
                <p className="section-label">Session</p>
                <p className="text-xs md:text-sm font-semibold text-[rgb(var(--slate-700))]">
                  {course.session}
                </p>
              </div>
              <div className="space-y-1">
                <p className="section-label">Credits</p>
                <p className="text-xs md:text-sm font-semibold text-[rgb(var(--slate-700))]">
                  {course.credit} Hours
                </p>
              </div>
              <div className="space-y-1">
                <p className="section-label">Instructor</p>
                <p className="text-xs md:text-sm font-semibold text-[rgb(var(--slate-700))]">
                  {getInstructorName()}
                </p>
              </div>
            </div>
          </section>

          {/* Instructor Card */}
          <section className="card-interactive p-4 md:p-5">
            <h2 className="text-xs md:text-sm font-semibold text-[rgb(var(--slate-800))] mb-4 flex items-center gap-2">
              <User size={14} className="text-[rgb(var(--slate-400))]" />
              Instructor Information
            </h2>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[rgb(var(--slate-100))] border border-[rgb(var(--slate-200))] flex items-center justify-center shrink-0">
                <GraduationCap
                  size={18}
                  className="text-[rgb(var(--slate-500))] md:w-5 md:h-5"
                />
              </div>
              <div>
                <p className="text-sm md:text-base font-semibold text-[rgb(var(--slate-800))]">
                  {getInstructorName()}
                </p>
                <p className="text-[10px] md:text-xs text-[rgb(var(--slate-500))] mt-0.5">
                  {course.instructor?.department || "Department of EEE, SUST"}
                </p>
                <p className="text-[10px] md:text-xs text-[rgb(var(--brand-primary))] font-medium mt-1">
                  Faculty Member
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Enrollment Panel */}
        <div className="lg:col-span-1">
          <div className="card-interactive p-4 md:p-5 sticky top-4">
            <h2 className="text-xs md:text-sm font-semibold text-[rgb(var(--slate-800))] mb-4">
              Enrollment
            </h2>

            {/* Status */}
            <div className="p-3 bg-[rgb(var(--slate-50))] rounded-lg border border-[rgb(var(--slate-100))] mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="section-label">Status</span>
                <span
                  className={`text-[9px] md:text-[10px] font-medium px-2 py-0.5 rounded ${
                    isEnrolled
                      ? "bg-[rgb(var(--success-light))] text-[rgb(var(--success))] border border-[rgb(var(--success))]/20"
                      : "bg-[rgb(var(--warning-light))] text-[rgb(var(--warning))] border border-[rgb(var(--warning))]/20"
                  }`}
                >
                  {isEnrolled ? "Enrolled" : "Available"}
                </span>
              </div>
              <p className="text-[10px] md:text-xs text-[rgb(var(--slate-600))]">
                {isEnrolled
                  ? "You are already enrolled in this course."
                  : "This course is open for enrollment."}
              </p>
            </div>

            {/* Requirements */}
            <div className="mb-4">
              <p className="section-label mb-2">Requirements</p>
              <ul className="space-y-1.5 text-[10px] md:text-xs text-[rgb(var(--slate-600))]">
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-[rgb(var(--slate-400))] rounded-full mt-1.5 shrink-0"></span>
                  Active student status
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-[rgb(var(--slate-400))] rounded-full mt-1.5 shrink-0"></span>
                  Prerequisite courses completed
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-[rgb(var(--slate-400))] rounded-full mt-1.5 shrink-0"></span>
                  Department approval
                </li>
              </ul>
            </div>

            {/* Enroll Button */}
            <button
              onClick={handleEnroll}
              disabled={isEnrolled || isEnrolling}
              className={`w-full py-3 md:py-3.5 rounded-xl font-semibold text-[10px] md:text-xs transition-all ${
                isEnrolled
                  ? "bg-[rgb(var(--success-light))] text-[rgb(var(--success))] border border-[rgb(var(--success))]/30 cursor-default"
                  : "bg-brand-gradient text-white hover:shadow-lg disabled:opacity-50"
              }`}
            >
              {isEnrolling ? (
                "Submitting..."
              ) : isEnrolled ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 size={16} />
                  Already Enrolled
                </span>
              ) : (
                "Submit Enrollment Request"
              )}
            </button>

            {!isEnrolled && (
              <p className="text-[9px] md:text-[10px] text-[rgb(var(--slate-400))] text-center mt-2.5">
                Subject to department approval
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
