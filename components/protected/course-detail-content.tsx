import { SingleCourseData } from "@/types";
import {
    ArrowLeft,
    Calendar,
    CheckCircle2,
    Clock,
    FileText,
    TrendingUp,
    XCircle,
} from "lucide-react";
import Link from "next/link";

interface CourseDetailContentProps {
  course: SingleCourseData;
}

export function CourseDetailContent({ course }: CourseDetailContentProps) {
  const progress =
    course && course.total_classes > 0
      ? Math.round((course.attended_classes / course.total_classes) * 100)
      : 0;

  const presentCount =
    course?.attendance.filter((a) => a.status === "Present").length ?? 0;
  const absentCount =
    course?.attendance.filter((a) => a.status === "Absent").length ?? 0;

  // Calculate total percentage from results
  const totalPercentage =
    course && course.result.length > 0
      ? Math.round(
          course.result.reduce((acc, r) => {
            if (r.marks_obtained !== null) {
              return acc + (r.marks_obtained / r.total_marks) * 100;
            }
            return acc;
          }, 0) / course.result.filter((r) => r.marks_obtained !== null).length,
        ) || 0
      : 0;

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-300 max-w-5xl mx-auto">
      {/* Page Header - Always visible */}
      <header className="pb-4 md:pb-5 border-b border-[rgb(var(--slate-200))]">
        <div className="flex items-center gap-3 mb-3">
          <Link
            href="/courses"
            className="p-2 md:p-2.5 rounded-xl bg-[rgb(var(--slate-100))] text-[rgb(var(--slate-500))] hover:bg-[rgb(var(--brand-primary))]/10 hover:text-[rgb(var(--brand-primary))] transition-all group"
          >
            <ArrowLeft
              size={14}
              className="md:w-4 md:h-4 group-hover:-translate-x-0.5 transition-transform"
            />
          </Link>
          <span className="badge-primary">{course.course_code}</span>
          <span className="text-[9px] md:text-[10px] text-[rgb(var(--slate-400))] bg-[rgb(var(--slate-50))] px-2 py-0.5 rounded">
            {course.credit} Credit
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-[rgb(var(--slate-800))]">
              {course.course_title}
            </h1>
            <p className="text-[10px] md:text-xs text-[rgb(var(--slate-500))] mt-1">
              Instructor: {course.instructor.first_name}{" "}
              {course.instructor.last_name}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[rgb(var(--slate-50))] px-3 py-2 md:px-4 md:py-2.5 rounded-lg border border-[rgb(var(--slate-200))]">
            <div
              className={`p-1.5 rounded ${
                progress >= 75
                  ? "bg-[rgb(var(--success-light))] text-[rgb(var(--success))]"
                  : progress >= 50
                    ? "bg-[rgb(var(--warning-light))] text-[rgb(var(--warning))]"
                    : "bg-[rgb(var(--danger-light))] text-[rgb(var(--danger))]"
              }`}
            >
              <CheckCircle2 size={14} className="md:w-4 md:h-4" />
            </div>
            <div>
              <p className="section-label">Attendance</p>
              <p className="text-sm md:text-base font-semibold text-[rgb(var(--slate-800))]">
                {course.attended_classes}/{course.total_classes}{" "}
                <span className="text-[10px] md:text-xs font-normal text-[rgb(var(--slate-500))]">
                  ({progress}%)
                </span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Dynamic Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
        {/* Academic Results */}
        <section className="space-y-3 md:space-y-4">
          <h2 className="flex items-center gap-2 text-sm md:text-base font-semibold text-[rgb(var(--slate-800))]">
            <FileText
              size={16}
              className="text-[rgb(var(--slate-400))] md:w-4.5 md:h-4.5"
            />
            Academic Results
          </h2>

          <div className="card-interactive p-4 md:p-5">
            <div className="space-y-3 md:space-y-4">
              {course.result.length === 0 ? (
                <div className="text-center py-6">
                  <FileText className="w-10 h-10 text-[rgb(var(--slate-300))] mx-auto mb-3" />
                  <p className="text-sm text-[rgb(var(--slate-500))]">
                    No results available yet
                  </p>
                </div>
              ) : (
                <>
                  {course.result.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 md:p-4 rounded-xl bg-[rgb(var(--slate-50))]/50 hover:bg-[rgb(var(--slate-50))] transition-colors"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] md:text-xs font-medium text-[rgb(var(--slate-600))]">
                          {item.exam_type}
                        </span>
                        <span className="text-xs md:text-sm font-bold text-[rgb(var(--slate-800))]">
                          {item.marks_obtained !== null
                            ? item.marks_obtained
                            : "-"}
                          <span className="text-[rgb(var(--slate-300))] font-normal">
                            /
                          </span>
                          {item.total_marks}
                        </span>
                      </div>
                      <div className="h-1.5 md:h-2 w-full bg-[rgb(var(--slate-200))] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                          style={{
                            width: `${item.marks_obtained !== null ? (item.marks_obtained / item.total_marks) * 100 : 0}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}

                  {course.result.length > 0 && (
                    <div className="pt-4 md:pt-5 mt-2 border-t border-[rgb(var(--slate-100))] flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-[rgb(var(--success-light))] rounded-lg">
                          <TrendingUp
                            size={14}
                            className="text-[rgb(var(--success))]"
                          />
                        </div>
                        <span className="section-label">Average Score</span>
                      </div>
                      <span className="text-lg md:text-xl font-bold text-[rgb(var(--success))]">
                        {totalPercentage}%
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        {/* Attendance History */}
        <section className="space-y-3 md:space-y-4">
          <h2 className="flex items-center gap-2 text-sm md:text-base font-semibold text-[rgb(var(--slate-800))]">
            <Clock
              size={16}
              className="text-[rgb(var(--slate-400))] md:w-4.5 md:h-4.5"
            />
            Attendance Record
          </h2>

          <div className="card-interactive p-4 md:p-5">
            {/* Attendance Summary Card */}
            <div className="mb-5 p-4 md:p-5 rounded-xl bg-linear-to-br from-[rgb(var(--slate-50))] to-[rgb(var(--slate-100))] border border-[rgb(var(--slate-200))]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="section-label mb-1">Classes Attended</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl md:text-4xl font-bold text-[rgb(var(--slate-800))]">
                      {course.attended_classes}
                    </span>
                    <span className="text-lg md:text-xl text-[rgb(var(--slate-400))] font-medium">
                      / {course.total_classes}
                    </span>
                  </div>
                </div>
                <div
                  className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center ${
                    progress >= 75
                      ? "bg-[rgb(var(--success-light))] text-[rgb(var(--success))]"
                      : progress >= 50
                        ? "bg-[rgb(var(--warning-light))] text-[rgb(var(--warning))]"
                        : "bg-[rgb(var(--danger-light))] text-[rgb(var(--danger))]"
                  }`}
                >
                  <span className="text-xl md:text-2xl font-bold">
                    {progress}%
                  </span>
                </div>
              </div>

              <div className="h-2.5 md:h-3 w-full bg-white rounded-full overflow-hidden shadow-inner">
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

              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="text-center p-2 rounded-lg bg-white/70">
                  <p className="text-lg md:text-xl font-bold text-[rgb(var(--success))]">
                    {presentCount}
                  </p>
                  <p className="text-[9px] md:text-[10px] text-[rgb(var(--slate-500))]">
                    Present
                  </p>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/70">
                  <p className="text-lg md:text-xl font-bold text-[rgb(var(--danger))]">
                    {absentCount}
                  </p>
                  <p className="text-[9px] md:text-[10px] text-[rgb(var(--slate-500))]">
                    Absent
                  </p>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/70">
                  <p className="text-lg md:text-xl font-bold text-[rgb(var(--slate-700))]">
                    {course.total_classes}
                  </p>
                  <p className="text-[9px] md:text-[10px] text-[rgb(var(--slate-500))]">
                    Total
                  </p>
                </div>
              </div>
            </div>

            {/* Attendance Log */}
            <div>
              <p className="section-label mb-3">Attendance Log</p>

              {course.attendance.length === 0 ? (
                <div className="text-center py-6">
                  <Calendar className="w-10 h-10 text-[rgb(var(--slate-300))] mx-auto mb-3" />
                  <p className="text-sm text-[rgb(var(--slate-500))]">
                    No attendance records yet
                  </p>
                </div>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden md:block rounded-lg border border-[rgb(var(--slate-200))] overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-[rgb(var(--slate-50))] border-b border-[rgb(var(--slate-200))]">
                        <tr>
                          <th className="px-4 py-2.5 section-label">#</th>
                          <th className="px-4 py-2.5 section-label">Date</th>
                          <th className="px-4 py-2.5 section-label text-right">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[rgb(var(--slate-100))]">
                        {course.attendance.map((entry, idx) => (
                          <tr
                            key={idx}
                            className="hover:bg-[rgb(var(--slate-50))]/50 transition-colors"
                          >
                            <td className="px-4 py-2.5 text-xs text-[rgb(var(--slate-400))] font-medium">
                              {idx + 1}
                            </td>
                            <td className="px-4 py-2.5">
                              <div className="flex items-center gap-2">
                                <Calendar
                                  size={12}
                                  className="text-[rgb(var(--slate-400))]"
                                />
                                <span className="text-xs text-[rgb(var(--slate-700))]">
                                  {entry.date}
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-2.5 text-right">
                              <span
                                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${
                                  entry.status === "Present"
                                    ? "bg-[rgb(var(--success-light))] text-[rgb(var(--success))] border border-[rgb(var(--success))]/20"
                                    : "bg-[rgb(var(--danger-light))] text-[rgb(var(--danger))] border border-[rgb(var(--danger))]/20"
                                }`}
                              >
                                {entry.status === "Present" ? (
                                  <CheckCircle2 size={10} />
                                ) : (
                                  <XCircle size={10} />
                                )}
                                {entry.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile List */}
                  <div className="md:hidden space-y-2">
                    {course.attendance.map((entry, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-3 rounded-lg border ${
                          entry.status === "Present"
                            ? "bg-[rgb(var(--success-light))]/50 border-[rgb(var(--success))]/20"
                            : "bg-[rgb(var(--danger-light))]/50 border-[rgb(var(--danger))]/20"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[10px] font-semibold text-[rgb(var(--slate-500))] border border-[rgb(var(--slate-200))]">
                            {idx + 1}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <Calendar
                              size={12}
                              className="text-[rgb(var(--slate-400))]"
                            />
                            <span className="text-[11px] font-medium text-[rgb(var(--slate-700))]">
                              {entry.date}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-semibold ${
                            entry.status === "Present"
                              ? "text-[rgb(var(--success))]"
                              : "text-[rgb(var(--danger))]"
                          }`}
                        >
                          {entry.status === "Present" ? (
                            <CheckCircle2 size={12} />
                          ) : (
                            <XCircle size={12} />
                          )}
                          {entry.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
