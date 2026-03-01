"use client";

import logo from "@/public/logo.png";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4 md:p-6">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-2">
        <div className="">
          <Image
            src={logo}
            alt="SUST EEE Logo"
            width={120}
            height={120}
            className="w-10 h-10 md:w-12 md:h-12"
          />
        </div>
        <div className="block">
          <span className="font-bold text-lg md:text-xl tracking-tight text-slate-900">
            SUST EEE
          </span>
          <p className="text-[9px] md:text-[10px] text-slate-500 font-medium -mt-0.5">
            Student Portal
          </p>
        </div>
      </div>

      {/* Card */}
      <div className="card-base p-8 md:p-12 max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[rgb(var(--danger-light))] flex items-center justify-center">
          <AlertCircle size={40} className="text-[rgb(var(--danger))]" />
        </div>

        {/* Error Code */}
        <p className="section-label mb-2">Error 404</p>
        <h1 className="page-title mb-3">Page Not Found</h1>

        {/* Description */}
        <p className="text-sm text-[rgb(var(--slate-500))] mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-sm"
          >
            <Home size={16} />
            Go to Dashboard
          </Link>
          <button
            onClick={() => history.back()}
            className="btn-secondary cursor-pointer inline-flex items-center justify-center gap-2 px-6 py-3 text-sm"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-8 text-[10px] md:text-[11px] text-[rgb(var(--slate-400))]">
        Department of EEE • Shahjalal University of Science and Technology
      </p>
    </div>
  );
}
