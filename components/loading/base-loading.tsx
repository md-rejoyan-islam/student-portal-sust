import logo from "@/public/logo.png";
import { GraduationCap } from "lucide-react";
import Image from "next/image";

interface BaseLoadingProps {
  /** Full screen loading with background effects */
  fullScreen?: boolean;
  /** Title text shown below the loader */
  title?: string;
  /** Subtitle/description text */
  subtitle?: string;
  /** Show footer with department info */
  showFooter?: boolean;
  /** Show the logo above the loader */
  showLogo?: boolean;
}

export function BaseLoading({
  fullScreen = false,
  title = "Loading",
  subtitle = "Please wait while we fetch your data...",
  showFooter = false,
  showLogo = false,
}: BaseLoadingProps) {
  const containerClasses = fullScreen
    ? "min-h-screen bg-linear-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden"
    : "flex flex-col items-center justify-center py-20 md:py-32 animate-in fade-in duration-300";

  return (
    <div className={containerClasses}>
      {/* Background effects - only for fullScreen */}
      {fullScreen && (
        <>
          {/* Animated gradient background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-100/30 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-100/20 via-transparent to-transparent" />
          </div>

          {/* Floating orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/4 left-1/5 w-72 h-72 bg-blue-400/10 rounded-full blur-[100px] animate-pulse"
              style={{ animationDuration: "4s" }}
            />
            <div
              className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-indigo-400/8 rounded-full blur-[120px] animate-pulse"
              style={{ animationDuration: "5s", animationDelay: "1s" }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-300/5 rounded-full blur-[150px] animate-pulse"
              style={{ animationDuration: "6s", animationDelay: "2s" }}
            />
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        </>
      )}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo - only when showLogo is true */}
        {showLogo && (
          <div className="mb-12 flex flex-col items-center gap-4">
            <div className="relative group">
              {/* Outer glow rings */}
              <div
                className="absolute inset-0 rounded-2xl bg-blue-500/15 blur-2xl scale-150 animate-pulse"
                style={{ animationDuration: "3s" }}
              />
              <div
                className="absolute inset-0 rounded-2xl bg-indigo-400/10 blur-3xl scale-200 animate-pulse"
                style={{ animationDuration: "4s", animationDelay: "1s" }}
              />

              {/* Icon container */}
              <div className="">
                <Image
                  src={logo}
                  alt="SUST EEE Logo"
                  width={120}
                  height={120}
                  className="w-16 h-16 md:w-20 md:h-20"
                />
              </div>
            </div>

            <div className="text-center mt-2">
              <h1 className="text-2xl font-bold bg-linear-to-r from-slate-800 via-blue-700 to-slate-800 bg-clip-text text-transparent tracking-tight">
                SUST EEE Portal
              </h1>
              <p className="text-[11px] text-slate-500 font-medium tracking-[0.2em] uppercase mt-1">
                Student Access
              </p>
            </div>
          </div>
        )}

        {/* Premium circular loader */}
        <div className={`relative ${showLogo ? "mb-10" : "mb-6"}`}>
          {/* Outer glow */}
          <div
            className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 -m-2 bg-blue-400/20 rounded-full blur-2xl animate-pulse"
            style={{ animationDuration: "2s" }}
          />

          {/* Loader container */}
          <div className="relative w-16 h-16 md:w-20 md:h-20">
            {/* Rotating outer ring */}
            <svg
              className="absolute inset-0 w-full h-full animate-spin"
              style={{ animationDuration: "3s" }}
              viewBox="0 0 100 100"
            >
              <defs>
                <linearGradient
                  id="outerGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.08)" />
                  <stop offset="50%" stopColor="rgba(99, 102, 241, 0.2)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0.08)" />
                </linearGradient>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="url(#outerGradient)"
                strokeWidth="2"
              />
            </svg>

            {/* Main spinning arc */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 100 100"
            >
              <defs>
                <linearGradient
                  id="arcGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    stopColor="rgb(59 130 246)"
                    stopOpacity="0"
                  />
                  <stop offset="30%" stopColor="rgb(59 130 246)" />
                  <stop offset="70%" stopColor="rgb(99 102 241)" />
                  <stop offset="100%" stopColor="rgb(139 92 246)" />
                </linearGradient>
              </defs>
              {/* Track */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="rgba(148, 163, 184, 0.2)"
                strokeWidth="4"
              />
              {/* Animated arc */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="url(#arcGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="180 240"
                className="animate-spin origin-center"
                style={{ animationDuration: "1.2s" }}
              />
            </svg>

            {/* Inner pulsing ring */}
            <svg
              className="absolute inset-0 w-full h-full animate-spin"
              style={{ animationDuration: "8s", animationDirection: "reverse" }}
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="30"
                fill="none"
                stroke="rgba(99, 102, 241, 0.12)"
                strokeWidth="1"
                strokeDasharray="4 8"
              />
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div
                  className="absolute inset-0 bg-blue-400/25 rounded-full blur-lg scale-150 animate-pulse"
                  style={{ animationDuration: "2s" }}
                />
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-lg shadow-slate-200/50">
                  <GraduationCap
                    size={18}
                    className="text-blue-600 md:w-5 md:h-5"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-6 bg-linear-to-r from-transparent via-blue-400/40 to-transparent" />
            <p className="text-sm font-medium text-slate-700 tracking-wide">
              {title}
            </p>
            <div className="h-px w-6 bg-linear-to-r from-transparent via-blue-400/40 to-transparent" />
          </div>
          <p className="text-xs text-slate-500 max-w-[240px]">{subtitle}</p>
        </div>

        {/* Animated dots */}
        <div className="flex items-center gap-1.5 mt-6">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"
              style={{
                animationDuration: "1.5s",
                animationDelay: `${i * 150}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Footer - only for fullScreen */}
      {showFooter && (
        <div className="absolute bottom-6 flex flex-col items-center gap-2">
          <p className="text-[10px] text-slate-400 tracking-wider">
            Department of EEE • SUST
          </p>
        </div>
      )}
    </div>
  );
}
