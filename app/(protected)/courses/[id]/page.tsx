import { CourseDetailContent } from "@/components/protected";
import { studentService } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Details | SUST EEE Portal",
  description:
    "View detailed course information, academic results, and attendance records on the SUST EEE Student Portal.",
  openGraph: {
    title: "Course Details | SUST EEE Portal",
    description: "View your course performance and attendance tracking.",
    type: "website",
  },
  keywords: [
    "SUST",
    "EEE",
    "course details",
    "attendance",
    "academic results",
    "grades",
  ],
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { id } = await params;
  const course = await studentService.getSingleCourseData(id);

  return <CourseDetailContent course={course} />;
}
