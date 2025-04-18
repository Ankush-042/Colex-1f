"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

// Animated button with ripple effect - simplified without framer-motion
export function AnimatedButton({
  children,
  className,
  onClick,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
}) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setRipples([...ripples, { x, y, id }])

    setTimeout(() => {
      setRipples((ripples) => ripples.filter((ripple) => ripple.id !== id))
    }, 600)

    if (onClick) onClick(e)
  }

  return (
    <button
      className={cn("relative overflow-hidden transition-transform hover:scale-105 active:scale-95", className)}
      onClick={handleClick}
      {...props}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
            width: "5px",
            height: "5px",
          }}
        />
      ))}
      {children}
    </button>
  )
}

// Animated input with floating label - simplified without framer-motion
export function AnimatedInput({
  label,
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  className?: string
}) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  useEffect(() => {
    setHasValue(!!props.value)
  }, [props.value])

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "relative border rounded-md overflow-hidden transition-shadow duration-200",
          isFocused ? "shadow-[0_0_0_2px_rgba(99,102,241,0.4)]" : "",
          error ? "shadow-[0_0_0_2px_rgba(239,68,68,0.4)]" : "",
        )}
      >
        <input
          {...props}
          className="w-full px-4 py-2 pt-6 bg-transparent outline-none border-none"
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            setHasValue(!!e.target.value)
            props.onBlur?.(e)
          }}
          onChange={(e) => {
            setHasValue(!!e.target.value)
            props.onChange?.(e)
          }}
        />
        <label
          className={cn(
            "absolute left-4 pointer-events-none text-muted-foreground transition-all duration-200",
            isFocused || hasValue ? "top-2 text-xs" : "top-1/2 -translate-y-1/2 text-base",
            isFocused ? "text-blue-500" : "",
            error ? "text-red-500" : "",
          )}
        >
          {label}
        </label>
      </div>
      {error && <p className="text-red-500 text-sm mt-1 animate-fade-in">{error}</p>}
    </div>
  )
}

// Scroll reveal component - simplified without framer-motion
export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  direction?: "up" | "down" | "left" | "right"
  delay?: number
}) {
  const getTransformClass = () => {
    switch (direction) {
      case "up":
        return "translate-y-8"
      case "down":
        return "-translate-y-8"
      case "left":
        return "translate-x-8"
      case "right":
        return "-translate-x-8"
      default:
        return "translate-y-8"
    }
  }

  return (
    <div
      className={cn("opacity-0 animate-fade-in", getTransformClass(), className)}
      style={{ animationDelay: `${delay}s` }}
      {...props}
    >
      {children}
    </div>
  )
}

// Success/Error feedback component - simplified without framer-motion
export function FeedbackMessage({
  type,
  message,
  onClose,
}: {
  type: "success" | "error" | "info"
  message: string
  onClose?: () => void
}) {
  const bgColor = type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500"

  return (
    <div className={`${bgColor} text-white p-4 rounded-md shadow-lg flex items-center justify-between animate-fade-in`}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-4 text-white/80 hover:text-white">
          ×
        </button>
      )}
    </div>
  )
}

