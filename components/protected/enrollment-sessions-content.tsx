"use client";

import { EnrollmentSession } from "@/types";
import { BookMarked, Calendar, ChevronRight, FolderOpen } from "lucide-react";
import Link from "next/link";

interface EnrollmentSessionsContentProps {
  sessions: EnrollmentSession[];
}

export function EnrollmentSessionsContent({
  sessions,
}: EnrollmentSessionsContentProps) {
  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <header className="pb-4 md:pb-5 border-b border-[rgb(var(--slate-200))]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookMarked
                size={18}
                className="text-[rgb(var(--slate-700))] md:w-5 md:h-5"
              />
              <span className="section-label">Course Registration</span>
            </div>
            <h1 className="page-title">Select a Session</h1>
            <p className="text-[10px] md:text-xs text-[rgb(var(--slate-500))] mt-1">
              Choose a session to view available courses for enrollment
            </p>
          </div>
          <span className="text-[10px] md:text-[11px] text-[rgb(var(--slate-500))]">
            {sessions.length} {sessions.length === 1 ? "session" : "sessions"}{" "}
            available
          </span>
        </div>
      </header>

      {/* Session Cards Grid */}
      {sessions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {sessions.map((session) => (
            <Link
              key={session.session}
              href={`/enrollment?session=${encodeURIComponent(session.session)}`}
              className="card-interactive group p-4 md:p-5 hover:border-[rgb(var(--brand-primary))]/30 hover:shadow-md transition-all duration-300"
            >
              {/* Session Icon & Name */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[rgb(var(--brand-primary))]/10 flex items-center justify-center group-hover:bg-[rgb(var(--brand-primary))]/15 transition-colors">
                  <Calendar
                    size={20}
                    className="text-[rgb(var(--brand-primary))] md:w-6 md:h-6"
                  />
                </div>
                <ChevronRight
                  size={16}
                  className="text-[rgb(var(--slate-300))] group-hover:text-[rgb(var(--brand-primary))] group-hover:translate-x-0.5 transition-all"
                />
              </div>

              {/* Session Name */}
              <h3 className="text-sm md:text-base font-semibold text-[rgb(var(--slate-800))] mb-1 group-hover:text-[rgb(var(--brand-primary))] transition-colors">
                Session {session.session}
              </h3>

              {/* Course Count */}
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-[10px] md:text-xs font-medium text-[rgb(var(--brand-primary))] bg-[rgb(var(--brand-primary))]/10 px-2 py-0.5 rounded-md">
                  {session.total_courses}{" "}
                  {session.total_courses === 1 ? "course" : "courses"}
                </span>
                <span className="text-[9px] md:text-[10px] text-[rgb(var(--slate-400))]">
                  available
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="card-base p-8 md:p-12 text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[rgb(var(--slate-100))] rounded-lg flex items-center justify-center mx-auto mb-3">
            <FolderOpen size={18} className="text-[rgb(var(--slate-400))]" />
          </div>
          <h3 className="text-sm font-semibold text-[rgb(var(--slate-700))] mb-1">
            No Sessions Available
          </h3>
          <p className="text-[10px] md:text-xs text-[rgb(var(--slate-500))]">
            There are no sessions with open enrollment at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
