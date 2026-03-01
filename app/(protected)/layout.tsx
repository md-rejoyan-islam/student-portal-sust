import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { authService } from "@/services";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Protected Layout | SUST EEE",
  description: "Layout for authenticated student users.",
};

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user;

  try {
    user = await authService.getMe();
  } catch (error) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 flex flex-col antialiased text-slate-950 font-sans">
      <Header user={user} />
      <main className="flex-1 flex flex-col">
        <div className="px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8 lg:px-12 lg:py-10 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
