import React, { memo, forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = memo(
  forwardRef(
    (
      { type = "text", className, ...props }: InputProps,
      ref: React.Ref<HTMLInputElement>
    ) => {
      return (
        <input
          type={type}
          ref={ref}
          className={`w-full border rounded-md px-3 py-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          {...props}
        />
      );
    }
  )
);
