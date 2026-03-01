"use client";

import { EnrollmentCourse } from "@/types";
import {
  ArrowLeft,
  BookMarked,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ListFilter,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const ITEMS_PER_PAGE = 5;

type SortField = "name" | "code" | "credits" | "instructor";
type SortOrder = "asc" | "desc";

interface EnrollmentContentProps {
  courses: EnrollmentCourse[];
  session: string;
}

export function EnrollmentContent({
  courses,
  session,
}: EnrollmentContentProps) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const filtered = useMemo(() => {
    let result = courses.filter(
      (c) =>
        c.course_title.toLowerCase().includes(search.toLowerCase()) ||
        c.course_code.toLowerCase().includes(search.toLowerCase()),
    );

    result = [...result].sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "name":
          comparison = a.course_title.localeCompare(b.course_title);
          break;
        case "code":
          // Use natural sorting for course codes (handles numbers properly)
          comparison = a.course_code.localeCompare(b.course_code, undefined, {
            numeric: true,
            sensitivity: "base",
          });
          break;
        case "credits":
          comparison = a.credit - b.credit;
          break;
        case "instructor":
          comparison = (a.instructor || "").localeCompare(b.instructor || "");
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [courses, search, sortField, sortOrder]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCourses = filtered.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setShowSortDropdown(false);
    setCurrentPage(1);
  };

  const sortOptions: { field: SortField; label: string }[] = [
    { field: "name", label: "Course Name" },
    { field: "code", label: "Course Code" },
    { field: "credits", label: "Credits" },
    { field: "instructor", label: "Instructor" },
  ];

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <header className="pb-4 md:pb-5 border-b border-[rgb(var(--slate-200))]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/enrollment"
                className="p-1.5 md:p-2 rounded-lg bg-[rgb(var(--slate-100))] text-[rgb(var(--slate-500))] hover:bg-[rgb(var(--brand-primary))]/10 hover:text-[rgb(var(--brand-primary))] transition-all group"
              >
                <ArrowLeft
                  size={14}
                  className="md:w-4 md:h-4 group-hover:-translate-x-0.5 transition-transform"
                />
              </Link>
              <BookMarked
                size={18}
                className="text-[rgb(var(--slate-700))] md:w-5 md:h-5"
              />
              <span className="section-label">Course Registration</span>
            </div>
            <h1 className="page-title">Session {session}</h1>
          </div>
          <span className="text-[10px] md:text-[11px] text-[rgb(var(--slate-500))]">
            {filtered.length} courses available
          </span>
        </div>
      </header>

      {/* Search Bar & Sort - Always visible */}
      <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
        <div className="flex-1 relative group">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--slate-400))] z-10"
          />
          <input
            type="text"
            placeholder="Search by course code or name..."
            className="premium-input text-sm"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="btn-secondary flex items-center justify-center gap-2 px-4 md:px-5 py-2.5 md:py-3 text-[10px] md:text-xs w-full sm:w-auto disabled:opacity-50"
          >
            <ListFilter size={14} className="text-[rgb(var(--slate-400))]" />
            <span>
              Sort: {sortOptions.find((o) => o.field === sortField)?.label}
            </span>
            <ChevronDown
              size={14}
              className={`text-[rgb(var(--slate-400))] transition-transform ${showSortDropdown ? "rotate-180" : ""}`}
            />
          </button>
          {showSortDropdown && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[rgb(var(--slate-200))] rounded-xl shadow-lg z-20 overflow-hidden">
              {sortOptions.map((option) => (
                <button
                  key={option.field}
                  onClick={() => handleSort(option.field)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-xs hover:bg-[rgb(var(--slate-5))] transition-colors ${
                    sortField === option.field
                      ? "bg-[rgb(var(--brand-primary))]/10 text-[rgb(var(--brand-primary))] font-medium"
                      : "text-[rgb(var(--slate-700))]"
                  }`}
                >
                  <span>{option.label}</span>
                  {sortField === option.field && (
                    <span className="text-[10px]">
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Content */}
      <div className="card-interactive overflow-hidden hidden md:block">
        <table className="w-full text-left">
          <thead className="bg-[rgb(var(--slate-50))] border-b border-[rgb(var(--slate-200))]">
            <tr>
              <th className="px-4 py-3 section-label w-12">#</th>
              <th className="px-4 py-3 section-label">Code</th>
              <th className="px-4 py-3 section-label">Course Title</th>
              <th className="px-4 py-3 section-label text-center">Session</th>
              <th className="px-4 py-3 section-label">Instructor</th>
              <th className="px-4 py-3 section-label text-center">Credits</th>
              <th className="px-4 py-3 section-label text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgb(var(--slate-100))]">
            {paginatedCourses.map((course, index) => (
              <tr
                key={course._id}
                className="hover:bg-[rgb(var(--brand-primary))]/5 transition-colors group cursor-default"
              >
                <td className="px-4 py-4">
                  <span className="text-xs font-medium text-[rgb(var(--slate-500))]">
                    {startIndex + index + 1}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <Link
                    href={`/enrollment/${course._id}`}
                    className="text-xs font-bold text-[rgb(var(--brand-primary))] hover:underline"
                  >
                    {course.course_code}
                  </Link>
                </td>
                <td className="px-4 py-3.5">
                  <Link
                    href={`/enrollment/${course._id}`}
                    className="text-sm font-medium text-[rgb(var(--slate-700))] group-hover:text-[rgb(var(--slate-900))] hover:text-[rgb(var(--brand-primary))] transition-colors"
                  >
                    {course.course_title}
                  </Link>
                </td>
                <td className="px-4 py-3.5 text-center">
                  <span className="text-xs text-[rgb(var(--slate-500))]">
                    {course.session}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-xs text-[rgb(var(--slate-500))]">
                    {course.instructor}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-center">
                  <span className="text-xs font-medium text-[rgb(var(--slate-700))]">
                    {course.credit}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right">
                  <Link
                    href={`/enrollment/${course._id}`}
                    className="btn-primary inline-flex items-center gap-1 px-3 py-1.5 text-[10px]"
                  >
                    Enroll
                    <ChevronRight size={12} className="opacity-70" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-2">
        {paginatedCourses.map((course, index) => (
          <div key={course._id} className="card-interactive p-3">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium text-[rgb(var(--slate-400))]">
                  #{startIndex + index + 1}
                </span>
                <Link
                  href={`/enrollment/${course._id}`}
                  className="badge-primary hover:opacity-80"
                >
                  {course.course_code}
                </Link>
              </div>
              <span className="text-[9px] text-[rgb(var(--slate-400))]">
                {course.session}
              </span>
            </div>
            <Link
              href={`/enrollment/${course._id}`}
              className="text-xs font-semibold text-[rgb(var(--slate-700))] mb-1 leading-snug block hover:text-[rgb(var(--brand-primary))]"
            >
              {course.course_title}
            </Link>
            <p className="text-[10px] text-[rgb(var(--slate-500))] mb-2">
              {course.instructor}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-[rgb(var(--slate-100))]">
              <span className="text-[10px] font-medium text-[rgb(var(--slate-600))]">
                {course.credit} Credits
              </span>
              <Link
                href={`/enrollment/${course._id}`}
                className="btn-primary inline-flex items-center gap-1 px-2.5 py-1 text-[9px]"
              >
                Enroll
                <ChevronRight size={10} className="opacity-70" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {filtered.length > 0 && totalPages > 1 && (
        <div className="card-base p-3 md:p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[10px] md:text-xs text-[rgb(var(--slate-500))]">
              Showing{" "}
              <span className="font-semibold text-[rgb(var(--slate-700))]">
                {startIndex + 1}-
                {Math.min(startIndex + ITEMS_PER_PAGE, filtered.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[rgb(var(--slate-700))]">
                {filtered.length}
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

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="card-base p-8 md:p-12 text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-[rgb(var(--slate-100))] rounded-lg flex items-center justify-center mx-auto mb-3">
            <Search size={18} className="text-[rgb(var(--slate-400))]" />
          </div>
          <h3 className="text-sm font-semibold text-[rgb(var(--slate-700))] mb-1">
            No Courses Found
          </h3>
          <p className="text-[10px] md:text-xs text-[rgb(var(--slate-500))]">
            Try adjusting your search criteria
          </p>
        </div>
      )}
    </div>
  );
}
