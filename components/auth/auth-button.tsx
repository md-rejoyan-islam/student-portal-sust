import { cn } from "@/lib/utils";
import React, { ButtonHTMLAttributes } from "react";

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const AuthButton = React.forwardRef<HTMLButtonElement, AuthButtonProps>(
  ({ className, children, loading, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={loading || disabled}
        className={cn(
          "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.01] active:scale-[0.98] shadow-lg shadow-blue-500/25 disabled:opacity-70 disabled:cursor-not-allowed text-sm",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
AuthButton.displayName = "AuthButton";
