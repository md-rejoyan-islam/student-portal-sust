
import { cn } from "@/lib/utils";
import { LucideIcon } from 'lucide-react';
import React, { InputHTMLAttributes } from 'react';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  error?: string;
}

export const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ className, icon: Icon, error, ...props }, ref) => {
    return (
      <div>
        <div className="relative group">
          {Icon && (
            <Icon 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none" 
              size={20} 
            />
          )}
          <input
            {...props}
            ref={ref}
            className={cn(
              "premium-input",
              Icon ? "pl-12" : "pl-4",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/10",
              className
            )}
          />
        </div>
        {error && (
          <p className="text-red-500 text-xs mt-1 font-medium ml-1">{error}</p>
        )}
      </div>
    );
  }
);
AuthInput.displayName = "AuthInput";
