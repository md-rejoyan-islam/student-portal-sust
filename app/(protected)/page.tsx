import { DashboardContent } from "@/components/protected";
import { authService, studentService } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Dashboard | SUST EEE Portal",
  description:
    "View your academic overview, course attendance, and recent activities on the SUST EEE Student Portal.",
  openGraph: {
    title: "Student Dashboard | SUST EEE Portal",
    description:
      "Your academic dashboard for SUST EEE - track attendance, courses, and performance.",
    type: "website",
  },
  keywords: [
    "SUST",
    "EEE",
    "student dashboard",
    "academic portal",
    "attendance tracking",
    "course progress",
  ],
};

export default async function DashboardPage() {
  const [user, summary] = await Promise.all([
    authService.getMe(),
    studentService.getStudentSummary(),
  ]);

  return <DashboardContent user={user} summary={summary} />;
}
