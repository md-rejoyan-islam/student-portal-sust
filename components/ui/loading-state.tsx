"use client";

import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  text?: string;
  className?: string;
}

export function LoadingState({
  text = "Loading...",
  className = "",
}: LoadingStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 ${className}`}
    >
      <Loader2
        size={32}
        className="text-[rgb(var(--brand-primary))] animate-spin mb-4"
      />
      <p className="text-sm text-[rgb(var(--slate-500))]">{text}</p>
    </div>
  );
}
