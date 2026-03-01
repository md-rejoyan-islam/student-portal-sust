import {
  EnrollmentContent,
  EnrollmentSessionsContent,
} from "@/components/protected";
import { studentService } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Enrollment",
  description:
    "Browse available courses and enroll for the current semester at SUST EEE Department. View session-wise course offerings and submit enrollment requests.",
  openGraph: {
    title: "Course Enrollment | SUST EEE Student Portal",
    description:
      "Explore and register for courses in the EEE Department at SUST.",
    type: "website",
    url: "/enrollment",
  },
  keywords: [
    "SUST EEE enrollment",
    "course registration",
    "semester enrollment",
    "EEE course registration",
    "academic enrollment",
    "SUST course offerings",
  ],
  alternates: {
    canonical: "/enrollment",
  },
};

interface PageProps {
  searchParams: Promise<{ session?: string }>;
}

export default async function EnrollmentPage({ searchParams }: PageProps) {
  const { session } = await searchParams;

  // If a session is selected, show courses for that session
  if (session) {
    const courses = await studentService.getEnrollments(session);
    return <EnrollmentContent courses={courses} session={session} />;
  }

  // Otherwise show session cards
  const sessions = await studentService.getEnrollmentSessions();
  return <EnrollmentSessionsContent sessions={sessions} />;
}
