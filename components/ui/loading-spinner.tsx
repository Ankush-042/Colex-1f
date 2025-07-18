import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingSpinner({ className, size = "md" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn("animate-spin rounded-full border-t-transparent border-primary", sizeClasses[size])}
        aria-label="Loading"
      />
    </div>
  )
}

