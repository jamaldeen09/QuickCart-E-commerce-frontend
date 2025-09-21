"use client"
import React from "react"

const LoadingSpinner = ({
  size = "md",
  className = ""
}: {
  size?: "sm" | "md" | "lg" | "custom" | "xs"; 
  className?: string;
}): React.ReactElement => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xs: "h-3 w-3",
    custom: "h-5 w-5"
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-solid border-white border-t-transparent`}
      />
    </div>
  );
};

export default LoadingSpinner;