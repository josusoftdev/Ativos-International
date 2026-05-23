import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, className = "", id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="field-focus flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-slate-400 transition-colors"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-500">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`w-full rounded-xl border bg-slate-900/80 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-offset-0
              ${leftIcon ? "pl-10" : ""}
              ${
                error
                  ? "border-rose-500/60 focus:ring-rose-500/40"
                  : "border-slate-700 focus:border-indigo-500/50 focus:ring-indigo-500/30"
              }
              ${className}`}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-rose-400">{error}</p>}
        {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
