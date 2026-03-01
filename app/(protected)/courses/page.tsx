import { CoursesContent } from "@/components/protected";
import { studentService } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Courses",
  description:
    "View your enrolled courses, track attendance records, and monitor course progress on the SUST EEE Student Portal.",
  openGraph: {
    title: "My Courses | SUST EEE Student Portal",
    description:
      "Track your enrolled courses, attendance, and academic progress for the current semester at SUST EEE.",
    type: "website",
    url: "/courses",
  },
  keywords: [
    "SUST EEE courses",
    "enrolled courses",
    "course attendance",
    "academic portal",
    "semester courses",
    "EEE course list",
  ],
  alternates: {
    canonical: "/courses",
  },
};

export default async function CoursesPage() {
  const courses = await studentService.getStudentCourses();

  return <CoursesContent courses={courses} />;
}
