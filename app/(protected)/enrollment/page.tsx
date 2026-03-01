import {
  EnrollmentContent,
  EnrollmentSessionsContent,
} from "@/components/protected";
import { studentService } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course Enrollment | SUST EEE Portal",
  description:
    "Browse and enroll in available courses for the current semester at SUST EEE Department.",
  openGraph: {
    title: "Course Enrollment | SUST EEE Portal",
    description: "Explore and register for courses in the EEE Department.",
    type: "website",
  },
  keywords: [
    "SUST",
    "EEE",
    "course enrollment",
    "course registration",
    "academic portal",
    "semester courses",
  ],
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
