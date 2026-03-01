import { CoursesContent } from "@/components/protected";
import { studentService } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Courses | SUST EEE Portal",
  description:
    "View your enrolled courses, track attendance, and access course materials on the SUST EEE Student Portal.",
  openGraph: {
    title: "My Courses | SUST EEE Portal",
    description:
      "Track your enrolled courses and attendance for the current semester.",
    type: "website",
  },
  keywords: [
    "SUST",
    "EEE",
    "courses",
    "enrolled courses",
    "attendance",
    "academic portal",
  ],
};

export default async function CoursesPage() {
  const courses = await studentService.getStudentCourses();

  return <CoursesContent courses={courses} />;
}
