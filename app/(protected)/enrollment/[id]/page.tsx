import { EnrollmentDetailContent } from "@/components/protected";
import { studentService } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Enrollment Details | SUST EEE Portal",
  description:
    "View course details and submit your enrollment request for the selected course at SUST EEE Department.",
  openGraph: {
    title: "Course Enrollment Details | SUST EEE Portal",
    description:
      "Review course information and enroll in your desired courses.",
    type: "website",
  },
  keywords: [
    "SUST",
    "EEE",
    "course enrollment",
    "course registration",
    "enroll",
    "academic portal",
  ],
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EnrollmentDetailPage({ params }: PageProps) {
  const { id } = await params;
  const course = await studentService.getSingleEnrollmentData(id);

  return <EnrollmentDetailContent course={course} />;
}
