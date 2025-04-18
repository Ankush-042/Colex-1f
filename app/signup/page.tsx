"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Github, ChromeIcon as Google, Mail } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("signup")

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-600 to-purple-700">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="flex items-center gap-2 text-white mb-8">
          <BookOpen className="h-6 w-6" />
          <span className="text-xl font-bold">Collex</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Tabs defaultValue="signup" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="login">Log In</TabsTrigger>
            </TabsList>

            <TabsContent value="signup">
              <SignUpForm />
            </TabsContent>

            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      <footer className="container mx-auto px-4 py-6 text-center text-white/70">
        <p>© {new Date().getFullYear()} Collex. All rights reserved.</p>
      </footer>
    </div>
  )
}

function SignUpForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Join Collex and start your collaborative learning journey</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First name</Label>
            <Input id="first-name" placeholder="John" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" placeholder="Doe" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="john.doe@example.com" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="school">School/College</Label>
          <Input id="school" placeholder="University of Example" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="referral">Referral Code (Optional)</Label>
          <Input id="referral" placeholder="Enter code if you have one" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Create Account</Button>

        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Google className="h-4 w-4" />
            <span>Google</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

function LoginForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Log in to your Collex account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input id="login-email" type="email" placeholder="john.doe@example.com" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password">Password</Label>
            <Link href="/forgot-password" className="text-sm text-indigo-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input id="login-password" type="password" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Log In</Button>

        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Google className="h-4 w-4" />
            <span>Google</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

