import { GraduationCap } from "lucide-react";

interface AuthSplitLayoutProps {
  children: React.ReactNode;
  leftContent: React.ReactNode;
  image?: string;
}

export function AuthSplitLayout({
  children,
  leftContent,
  image,
}: AuthSplitLayoutProps) {
  return (
    <div className="grid h-full min-h-[600px] lg:grid-cols-2">
      <div className="relative hidden h-full flex-col bg-gradient-to-br from-slate-900 to-slate-800 p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent" />
        {image && (
          <img
            src={image}
            alt="Authentication background"
            className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-overlay"
          />
        )}
        <div className="relative z-20 flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg shadow-blue-500/25 text-white">
            <GraduationCap size={20} />
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight">SUST EEE</span>
            <p className="text-[10px] text-blue-200 font-medium -mt-0.5">
              Student Portal
            </p>
          </div>
        </div>
        <div className="relative z-20 mt-auto">{leftContent}</div>
      </div>
      <div className="flex items-center justify-center bg-background p-8 lg:p-12">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {children}
        </div>
      </div>
    </div>
  );
}
