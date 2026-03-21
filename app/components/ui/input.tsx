import React from 'react';

type InputProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ type = 'text', placeholder, value, onChange, className, ...rest }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${className || ''}`}
      {...rest}
    />
  );
}