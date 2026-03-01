import { StudentProfile, StudentSummary } from "@/types";
import {
    Award,
    BookOpen,
    Calendar,
    CheckCircle2,
    ClipboardList,
    GraduationCap,
    XCircle,
} from "lucide-react";

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  subtitle?: string;
  iconBg: string;
}

const StatCard = ({
  icon: Icon,
  label,
  value,
  subtitle,
  iconBg,
}: StatCardProps) => (
  <div className="card-interactive p-4 md:p-5 relative overflow-hidden group cursor-default">
    <div className="flex items-start justify-between">
      <div className="space-y-1.5 md:space-y-2">
        <p className="section-label">{label}</p>
        <p className="text-2xl md:text-3xl font-bold text-[rgb(var(--slate-800))] tracking-tight">
          {value}
        </p>
        {subtitle && (
          <p className="text-[10px] md:text-[11px] text-[rgb(var(--slate-400))]">
            {subtitle}
          </p>
        )}
      </div>
      <div
        className={`p-2.5 md:p-3 rounded-xl ${iconBg} group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon size={18} className="md:w-5 md:h-5 text-white" />
      </div>
    </div>
  </div>
);

interface DashboardContentProps {
  user: StudentProfile;
  summary: StudentSummary;
}

export function DashboardContent({ user, summary }: DashboardContentProps) {
  // Provide safe defaults for summary data
  const safeData = {
    total_courses: summary?.total_courses ?? 0,
    attendance_rate: summary?.attendance_rate ?? 0,
    terms_test_attended: summary?.terms_test_attended ?? 0,
    terms_test_total: summary?.terms_test_total ?? 0,
    course_attendance: summary?.course_attendance ?? [],
    recent_absents: summary?.recent_absents ?? [],
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-300">
      {/* Page Header - Always visible */}
      <header className="pb-4 md:pb-5 border-b border-[rgb(var(--slate-200))]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap
                size={18}
                className="text-[rgb(var(--slate-700))] md:w-5 md:h-5"
              />
              <span className="section-label">Student Dashboard</span>
            </div>
            <h1 className="page-title">Academic Overview</h1>
          </div>
          <div className="flex items-center gap-2 text-[10px] md:text-[11px] text-[rgb(var(--slate-500))]">
            <span className="font-medium">Department of EEE</span>
            <span className="text-[rgb(var(--slate-300))]">|</span>
            <span>Session {user?.session || "-"}</span>
          </div>
        </div>
      </header>

      {/* Statistics Grid - Always visible */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          <StatCard
            icon={BookOpen}
            label="Enrolled Courses"
            value={safeData.total_courses}
            subtitle="Active this semester"
            iconBg="bg-linear-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            icon={CheckCircle2}
            label="Attendance Rate"
            value={`${safeData.attendance_rate}%`}
            subtitle="Overall attendance"
            iconBg="bg-linear-to-br from-emerald-500 to-emerald-600"
          />
          <StatCard
            icon={Award}
            label="Average Rating"
            value={
              safeData.attendance_rate >= 75
                ? "Good"
                : safeData.attendance_rate >= 50
                  ? "Average"
                  : "Low"
            }
            subtitle="Based on attendance"
            iconBg="bg-linear-to-br from-amber-500 to-orange-500"
          />
          <StatCard
            icon={ClipboardList}
            label="Term Tests"
            value={`${safeData.terms_test_attended}/${safeData.terms_test_total}`}
            subtitle="Completed assessments"
            iconBg="bg-linear-to-br from-indigo-500 to-purple-600"
          />
        </div>
      </section>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-5">
        {/* Course Progress */}
        <section className="card-interactive lg:col-span-3 p-4 md:p-6">
          <div className="flex items-center justify-between mb-5 md:mb-6">
            <div>
              <h2 className="text-sm md:text-base font-bold text-[rgb(var(--slate-800))]">
                Course Attendance
              </h2>
              <p className="text-[10px] md:text-[11px] text-[rgb(var(--slate-500))] mt-0.5">
                Current semester progress
              </p>
            </div>
            <span className="badge-primary">Active Courses</span>
          </div>

          <div className="space-y-4 md:space-y-5">
            {safeData.course_attendance.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="w-10 h-10 text-[rgb(var(--slate-300))] mx-auto mb-3" />
                <p className="text-sm text-[rgb(var(--slate-500))]">
                  No courses enrolled yet
                </p>
              </div>
            ) : (
              safeData.course_attendance.map((course, idx) => (
                <div
                  key={idx}
                  className="group p-3 md:p-4 rounded-xl hover:bg-[rgb(var(--slate-50))]/80 transition-colors -mx-3 md:-mx-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <span className="badge-primary">
                        {course.course_code}
                      </span>
                      <span className="text-[10px] md:text-xs font-medium text-[rgb(var(--slate-700))] truncate">
                        {course.course_title}
                      </span>
                    </div>
                    <span
                      className={`text-xs md:text-sm font-bold ml-2 ${
                        course.attendance_rate >= 75
                          ? "text-[rgb(var(--success))]"
                          : course.attendance_rate >= 50
                            ? "text-[rgb(var(--warning))]"
                            : "text-[rgb(var(--danger))]"
                      }`}
                    >
                      {course.attendance_rate}%
                    </span>
                  </div>
                  <div className="w-full bg-[rgb(var(--slate-100))] h-1.5 md:h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        course.attendance_rate >= 75
                          ? "bg-linear-to-r from-emerald-400 to-emerald-500"
                          : course.attendance_rate >= 50
                            ? "bg-linear-to-r from-amber-400 to-amber-500"
                            : "bg-linear-to-r from-red-400 to-red-500"
                      }`}
                      style={{ width: `${course.attendance_rate}%` }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Recent Absences */}
        <section className="card-interactive lg:col-span-2 p-4 md:p-6">
          <div className="flex items-center justify-between mb-5 md:mb-6">
            <div>
              <h2 className="text-sm md:text-base font-bold text-[rgb(var(--slate-800))]">
                Recent Absences
              </h2>
              <p className="text-[10px] md:text-[11px] text-[rgb(var(--slate-500))] mt-0.5">
                Classes missed recently
              </p>
            </div>
            <div className="p-2 bg-[rgb(var(--danger-light))] rounded-lg">
              <Calendar size={16} className="text-[rgb(var(--danger))]" />
            </div>
          </div>

          <div className="space-y-2.5 md:space-y-3">
            {safeData.recent_absents.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-10 h-10 text-[rgb(var(--success))] mx-auto mb-3" />
                <p className="text-sm text-[rgb(var(--slate-500))]">
                  No recent absences
                </p>
              </div>
            ) : (
              safeData.recent_absents.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 md:p-3.5 rounded-xl bg-linear-to-r from-[rgb(var(--slate-50))] to-transparent border border-[rgb(var(--slate-100))] group hover:from-[rgb(var(--danger-light))] hover:border-[rgb(var(--danger))]/30 transition-all duration-300 cursor-default"
                >
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white flex items-center justify-center border border-[rgb(var(--slate-200))] group-hover:border-[rgb(var(--danger))]/50 group-hover:bg-[rgb(var(--danger-light))] transition-all shadow-sm">
                    <XCircle
                      size={16}
                      className="md:w-4.5 md:h-4.5 text-[rgb(var(--slate-400))] group-hover:text-[rgb(var(--danger))] transition-colors"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] md:text-xs font-semibold text-[rgb(var(--slate-700))] truncate group-hover:text-[rgb(var(--danger))] transition-colors">
                      {item.course_title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="badge-primary">
                        {item.course_code}
                      </span>
                      <span className="text-[9px] md:text-[10px] text-[rgb(var(--slate-400))]">
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
