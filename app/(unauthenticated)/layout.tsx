import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCookie } from "../actions";

export const metadata: Metadata = {
  title: "Unauthenticated Layout | SUST EEE",
  description: "Layout for unauthenticated users.",
};

export default async function UnauthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = await getCookie("accessToken");

  if (accessToken) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 md:p-12 font-sans text-slate-900 bg-slate-50">
      {children}
    </div>
  );
}
