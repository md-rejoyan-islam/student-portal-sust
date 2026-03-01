import { DashboardContent } from "@/components/protected";
import { authService, studentService } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Dashboard",
  description:
    "View your academic overview, course attendance, recent activities, and performance summary on the SUST EEE Student Portal.",
  openGraph: {
    title: "Student Dashboard | SUST EEE Student Portal",
    description:
      "Your academic dashboard for SUST EEE — track attendance, courses, grades, and performance at a glance.",
    type: "website",
    url: "/",
  },
  keywords: [
    "SUST EEE dashboard",
    "student dashboard",
    "academic portal",
    "attendance tracking",
    "course progress",
    "SUST academic overview",
    "EEE department",
  ],
  alternates: {
    canonical: "/",
  },
};

export default async function DashboardPage() {
  const [user, summary] = await Promise.all([
    authService.getMe(),
    studentService.getStudentSummary(),
  ]);

  return <DashboardContent user={user} summary={summary} />;
}
