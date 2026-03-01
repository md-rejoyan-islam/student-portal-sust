import { EnrollmentDetailContent } from "@/components/protected";
import { studentService } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enrollment Details",
  description:
    "View course details, instructor information, and submit your enrollment request for the selected course at SUST EEE Department.",
  openGraph: {
    title: "Enrollment Details | SUST EEE Student Portal",
    description:
      "Review course information and enroll in your desired courses at SUST EEE.",
    type: "website",
  },
  keywords: [
    "SUST EEE enrollment details",
    "course registration",
    "enroll in course",
    "EEE course details",
    "academic enrollment",
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
