import { ProfileContent } from "@/components/protected";
import { authService } from "@/services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Profile",
  description:
    "View and manage your student profile, personal information, password, and account settings on the SUST EEE Student Portal.",
  openGraph: {
    title: "Student Profile | SUST EEE Student Portal",
    description:
      "Manage your academic profile, personal details, and security settings at SUST EEE.",
    type: "website",
    url: "/profile",
  },
  keywords: [
    "SUST EEE profile",
    "student profile",
    "account settings",
    "change password",
    "academic profile management",
  ],
  alternates: {
    canonical: "/profile",
  },
};

export default async function ProfilePage() {
  const student = await authService.getMe();

  return <ProfileContent student={student} />;
}
