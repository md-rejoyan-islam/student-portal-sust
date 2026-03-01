import logo from "@/public/logo.png";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GuidelinesPane } from "./guidelines-pane";

export const SustEeeLogo = ({ light = false }: { light?: boolean }) => (
  <div
    className={`flex items-center gap-3 ${light ? "text-white" : "text-slate-900"}`}
  >
    <div className="">
      <Image
        src={logo}
        alt="SUST EEE Logo"
        width={120}
        height={120}
        className="w-10 h-10 md:w-12 md:h-12"
      />
    </div>
    <div className="flex flex-col leading-tight">
      <span className="font-bold text-xl tracking-tight">SUST EEE</span>
      <span
        className={`text-[10px] font-medium ${light ? "text-blue-200" : "text-slate-500"} -mt-0.5`}
      >
        Student Portal
      </span>
    </div>
  </div>
);

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  showBack?: boolean;
  backHref?: string;
  leftContent?: React.ReactNode;
}

export const AuthCard = ({
  children,
  title,
  subtitle,
  showBack = false,
  backHref = "/login",
  leftContent,
}: AuthCardProps) => (
  <div className="w-full max-w-6xl bg-white rounded-2xl md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex flex-col lg:flex-row overflow-hidden border border-slate-100 animate-page-entry">
    {leftContent || <GuidelinesPane />}

    <div className="flex-1 p-6 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
      {showBack && (
        <Link
          href={backHref}
          className="flex items-center gap-2 text-slate-400 hover:text-blue-600 mb-6 md:mb-8 transition-colors text-[11px] font-semibold uppercase tracking-wide w-fit group"
        >
          <ChevronLeft
            size={14}
            className="group-hover:-translate-x-0.5 transition-transform"
          />{" "}
          Return to Portal
        </Link>
      )}

      <div className="mb-6 md:mb-8">
        <SustEeeLogo />
      </div>

      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
          {title}
        </h1>
        <p className="text-slate-500 mt-2 text-sm md:text-base">{subtitle}</p>
      </div>

      {children}

      <div className="mt-6 md:mt-8 text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 border-t border-slate-100 pt-6 md:pt-8 text-center">
        © 2026 SUST EEE Department
      </div>
    </div>
  </div>
);
