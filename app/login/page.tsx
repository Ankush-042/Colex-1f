"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, Github, ChromeIcon as Google } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { AnimatedButton } from "@/components/ui/animated-button"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const validateForm = () => {
    let isValid = true

    if (!email) {
      setEmailError("Email is required")
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid")
      isValid = false
    } else {
      setEmailError("")
    }

    if (!password) {
      setPasswordError("Password is required")
      isValid = false
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      isValid = false
    } else {
      setPasswordError("")
    }

    return isValid
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    toast({
      title: "Login Successful",
      description: "Welcome back to Collex!",
    })
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <div className="opacity-0 animate-fade-in">
        <Link href="/" className="flex items-center gap-2 text-white mb-8">
          <BookOpen className="h-8 w-8" />
          <span className="text-2xl font-bold">Collex</span>
        </Link>
      </div>

      <div className="w-full max-w-md opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <Card className="border-none shadow-xl">
          <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Log in to your Collex account</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={emailError ? "border-red-500" : ""}
                />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={passwordError ? "border-red-500" : ""}
                />
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <AnimatedButton
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                type="submit"
                disabled={isLoading}
                animationType="ripple"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </AnimatedButton>

              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <AnimatedButton variant="outline" type="button" disabled={isLoading} animationType="scale">
                  <Google className="mr-2 h-4 w-4" />
                  <span>Google</span>
                </AnimatedButton>
                <AnimatedButton variant="outline" type="button" disabled={isLoading} animationType="scale">
                  <Github className="mr-2 h-4 w-4" />
                  <span>GitHub</span>
                </AnimatedButton>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>

      <p className="mt-4 text-white text-sm opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        Don't have an account?{" "}
        <Link href="/signup" className="font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}

