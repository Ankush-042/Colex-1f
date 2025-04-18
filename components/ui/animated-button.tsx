"use client"
import { Button } from "@/components/ui/button"
import type React from "react"

import { cn } from "@/lib/utils"
import type { ButtonProps } from "@/components/ui/button"
import { useState, useEffect } from "react"

export interface AnimatedButtonProps extends ButtonProps {
  animationType?: "scale" | "ripple" | "none"
}

export function AnimatedButton({
  children,
  className,
  variant,
  size,
  animationType = "scale",
  onClick,
  ...props
}: AnimatedButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])

  // For ripple animation
  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (animationType !== "ripple") return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setRipples([...ripples, { x, y, id }])

    setTimeout(() => {
      setRipples((ripples) => ripples.filter((ripple) => ripple.id !== id))
    }, 600)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleRipple(e)
    if (onClick) onClick(e)
  }

  // Clean up ripples on unmount
  useEffect(() => {
    return () => {
      setRipples([])
    }
  }, [])

  // For scale animation, we'll use CSS
  if (animationType === "scale") {
    return (
      <Button
        className={cn("transition-transform hover:scale-105 active:scale-95", className)}
        variant={variant}
        size={size}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Button>
    )
  }

  // For ripple animation
  if (animationType === "ripple") {
    return (
      <Button
        className={cn("relative overflow-hidden", className)}
        variant={variant}
        size={size}
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
      </Button>
    )
  }

  // Default case - no animation
  return (
    <Button className={className} variant={variant} size={size} onClick={onClick} {...props}>
      {children}
    </Button>
  )
}

