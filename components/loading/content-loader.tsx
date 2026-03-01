import { GraduationCap } from "lucide-react";

interface ContentLoaderProps {
  /** Optional loading message */
  message?: string;
  /** Size of the loader */
  size?: "sm" | "md" | "lg";
  /** Optional className for the container */
  className?: string;
}

export function ContentLoader({
  message = "Loading...",
  size = "md",
  className = "",
}: ContentLoaderProps) {
  const sizes = {
    sm: { container: "py-8", loader: "w-12 h-12", icon: 14, text: "text-xs" },
    md: { container: "py-12", loader: "w-16 h-16", icon: 18, text: "text-sm" },
    lg: { container: "py-16", loader: "w-20 h-20", icon: 22, text: "text-sm" },
  };

  const s = sizes[size];

  return (
    <div
      className={`flex flex-col items-center justify-center ${s.container} ${className}`}
    >
      {/* Loader */}
      <div className="relative mb-4">
        {/* Outer glow */}
        <div
          className={`absolute inset-0 ${s.loader} bg-blue-400/15 rounded-full blur-xl animate-pulse`}
          style={{ animationDuration: "2s" }}
        />

        {/* Loader container */}
        <div className={`relative ${s.loader}`}>
          {/* Main spinning arc */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <defs>
              <linearGradient
                id="contentLoaderGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgb(59 130 246)" stopOpacity="0" />
                <stop offset="30%" stopColor="rgb(59 130 246)" />
                <stop offset="70%" stopColor="rgb(99 102 241)" />
                <stop offset="100%" stopColor="rgb(139 92 246)" />
              </linearGradient>
            </defs>
            {/* Track */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="rgba(148, 163, 184, 0.15)"
              strokeWidth="4"
            />
            {/* Animated arc */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="url(#contentLoaderGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="180 264"
              className="animate-spin origin-center"
              style={{ animationDuration: "1.2s" }}
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 bg-blue-400/20 rounded-full blur-md scale-150 animate-pulse"
                style={{ animationDuration: "2s" }}
              />
              <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-md">
                <GraduationCap size={s.icon} className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Text */}
      <p className={`${s.text} text-slate-500 font-medium`}>{message}</p>
    </div>
  );
}
