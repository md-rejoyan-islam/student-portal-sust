import { ProfileContent } from "@/components/protected";
import { authService } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Profile | SUST EEE Portal",
  description:
    "View and manage your student profile, personal information, and security settings for the SUST EEE academic portal.",
  openGraph: {
    title: "Student Profile | SUST EEE Portal",
    description: "Manage your academic profile and security settings.",
    type: "website",
  },
  keywords: [
    "SUST",
    "EEE",
    "student profile",
    "academic portal",
    "account settings",
  ],
};

export default async function ProfilePage() {
  const student = await authService.getMe();

  return <ProfileContent student={student} />;
}
