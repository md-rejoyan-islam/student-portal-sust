import { CourseDetailContent } from "@/components/protected";
import { studentService } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Details",
  description:
    "View detailed course information, academic results, attendance records, and instructor details on the SUST EEE Student Portal.",
  openGraph: {
    title: "Course Details | SUST EEE Student Portal",
    description:
      "View your course performance, grades, and attendance tracking at SUST EEE.",
    type: "website",
  },
  keywords: [
    "SUST EEE course details",
    "course attendance",
    "academic results",
    "grades",
    "course performance",
    "EEE department courses",
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
