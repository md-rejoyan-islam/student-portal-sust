"use client";

import { StudentCourse } from "@/types";
import {
    BookOpen,
    ChevronLeft,
    ChevronRight,
    Clock,
    GraduationCap,
    Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ITEMS_PER_PAGE = 6;

// Single CourseCard component
interface CourseCardProps {
  course: StudentCourse;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const progress =
    course.total_classes > 0
      ? Math.round((course.attended_classes / course.total_classes) * 100)
      : 0;

  return (
    <article className="card-interactive overflow-hidden group hover:-translate-y-1">
      <div className="p-4 md:p-5">
        {/* Course Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="badge-primary">{course.course_code}</span>
          <span className="text-[9px] md:text-[10px] text-[rgb(var(--slate-400))] bg-[rgb(var(--slate-50))] px-2 py-0.5 rounded">
            {course.credit} Credit
          </span>
        </div>

        {/* Course Info */}
        <h3 className="text-sm md:text-base font-bold text-[rgb(var(--slate-800))] mb-2 leading-snug line-clamp-2 min-h-10 md:min-h-12 group-hover:text-[rgb(var(--brand-primary))] transition-colors">
          {course.course_title}
        </h3>
        <p className="text-[10px] md:text-xs text-[rgb(var(--slate-500))] mb-4">
          {course.instructor}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-[9px] md:text-[10px] text-[rgb(var(--slate-500))] mb-4 pb-4 border-b border-[rgb(var(--slate-100))]">
          <div className="flex items-center gap-1.5">
            <div className="p-1 bg-[rgb(var(--slate-100))] rounded">
              <Clock size={10} className="text-[rgb(var(--slate-500))]" />
            </div>
            <span className="font-medium">
              {course.total_classes} Classes
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="p-1 bg-[rgb(var(--slate-100))] rounded">
              <Users size={10} className="text-[rgb(var(--slate-500))]" />
            </div>
            <span className="font-medium">
              {course.attended_classes} Attended
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="section-label">Attendance</span>
            <span
              className={`text-xs md:text-sm font-bold ${
                progress >= 75
                  ? "text-[rgb(var(--success))]"
                  : progress >= 50
                    ? "text-[rgb(var(--warning))]"
                    : "text-[rgb(var(--danger))]"
              }`}
            >
              {progress}%
            </span>
          </div>
          <div className="w-full bg-[rgb(var(--slate-100))] h-1.5 md:h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                progress >= 75
                  ? "bg-linear-to-r from-emerald-400 to-emerald-500"
                  : progress >= 50
                    ? "bg-linear-to-r from-amber-400 to-amber-500"
                    : "bg-linear-to-r from-red-400 to-red-500"
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Action */}
        <Link
          href={`/courses/${course._id}`}
          className="btn-secondary flex items-center justify-center gap-2 w-full py-2.5 md:py-3 text-[10px] md:text-xs text-[rgb(var(--brand-primary))] border-2 border-[rgb(var(--brand-primary))]/20 hover:border-[rgb(var(--brand-primary))] hover:bg-[rgb(var(--brand-primary))] hover:text-white transition-all duration-300 group/btn"
        >
          <span>View Details</span>
          <ChevronRight
            size={14}
            className="group-hover/btn:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </article>
  );
};

interface CoursesContentProps {
  courses: StudentCourse[];
}

export function CoursesContent({ courses }: CoursesContentProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCourses = courses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-300">
      {/* Page Header - Always visible */}
      <header className="pb-4 md:pb-5 border-b border-[rgb(var(--slate-200))]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen
                size={18}
                className="text-[rgb(var(--slate-700))] md:w-5 md:h-5"
              />
              <span className="section-label">Current Semester</span>
            </div>
            <h1 className="page-title">Enrolled Courses</h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[rgb(var(--slate-100))] rounded-lg">
            <GraduationCap size={14} className="text-[rgb(var(--slate-500))]" />
            <span className="text-[10px] md:text-[11px] font-medium text-[rgb(var(--slate-600))]">
              {courses.length} Active Courses
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      {courses.length === 0 ? (
        <div className="card-base p-8 md:p-12 text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[rgb(var(--slate-100))] rounded-lg flex items-center justify-center mx-auto mb-3">
            <BookOpen size={18} className="text-[rgb(var(--slate-400))]" />
          </div>
          <h3 className="text-sm font-semibold text-[rgb(var(--slate-700))] mb-1">
            No Enrolled Courses
          </h3>
          <p className="text-[10px] md:text-xs text-[rgb(var(--slate-500))]">
            You haven&apos;t enrolled in any courses yet
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {paginatedCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {courses.length > ITEMS_PER_PAGE && (
        <div className="card-base p-3 md:p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[10px] md:text-xs text-[rgb(var(--slate-500))]">
              Showing{" "}
              <span className="font-semibold text-[rgb(var(--slate-700))]">
                {startIndex + 1}-
                {Math.min(startIndex + ITEMS_PER_PAGE, courses.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[rgb(var(--slate-700))]">
                {courses.length}
              </span>{" "}
              courses
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-[rgb(var(--slate-200))] text-[rgb(var(--slate-600))] hover:bg-[rgb(var(--slate-50))] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                      currentPage === page
                        ? "bg-[rgb(var(--brand-primary))] text-white"
                        : "border border-[rgb(var(--slate-200))] text-[rgb(var(--slate-600))] hover:bg-[rgb(var(--slate-50))]"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-[rgb(var(--slate-200))] text-[rgb(var(--slate-600))] hover:bg-[rgb(var(--slate-50))] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
