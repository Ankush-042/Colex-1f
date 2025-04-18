"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { BookOpen, Brain, MessageCircle, Play, Shield, Star, Users } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function LandingPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <nav className="container mx-auto flex items-center justify-between p-6">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <BookOpen className="h-8 w-8" />
            </motion.div>
            <motion.span
              className="text-2xl font-bold"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Collex
            </motion.span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#testimonials">Testimonials</NavLink>
            <NavLink href="#about">About</NavLink>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" className="text-white hover:bg-white/20">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild className="bg-white text-indigo-700 hover:bg-white/90">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </nav>

        <div className="container mx-auto px-6 py-20 md:py-32">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Learn Together, <br />
                <span className="text-yellow-300">Grow Together</span>
              </h1>
              <p className="text-xl mb-8 text-white/80 max-w-lg">
                Collex is the ultimate collaborative learning platform that connects students, provides AI tutoring, and
                offers a vast digital library of resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-yellow-500 text-black hover:bg-yellow-400">
                  <Link href="/signup">Get Started Free</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  <Link href="#how-it-works" className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    See How It Works
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white/20">
                <div className="aspect-video bg-indigo-900/50 flex items-center justify-center">
                  {isVideoPlaying ? (
                    <video
                      autoPlay
                      controls
                      className="w-full h-full object-cover"
                      src="/placeholder.svg?height=720&width=1280&text=Collex+Demo+Video"
                    />
                  ) : (
                    <>
                      <img
                        src="/placeholder.svg?height=720&width=1280&text=Collex+Platform+Preview"
                        alt="Collex Platform Preview"
                        className="w-full h-full object-cover opacity-80"
                      />
                      <Button
                        size="lg"
                        className="absolute rounded-full w-20 h-20 bg-white text-indigo-700 hover:bg-white/90 hover:scale-105 transition-transform"
                        onClick={() => setIsVideoPlaying(true)}
                      >
                        <Play className="h-8 w-8" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Floating elements */}
              <FloatingElement
                className="absolute -top-8 -right-8 bg-green-500"
                icon={<Users className="h-6 w-6" />}
                text="Collaborative Learning"
                delay={0.5}
              />
              <FloatingElement
                className="absolute -bottom-8 -left-8 bg-blue-500"
                icon={<Brain className="h-6 w-6" />}
                text="AI Tutoring"
                delay={0.7}
              />
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="Why Choose Collex?"
            subtitle="Discover the features that make Collex the ultimate learning platform"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <FeatureCard
              icon={<MessageCircle className="h-10 w-10 text-indigo-600" />}
              title="Q&A Platform"
              description="Ask questions, get answers from peers and experts, and build your knowledge collaboratively."
              delay={0.1}
            />
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-indigo-600" />}
              title="Digital Library"
              description="Access thousands of books, resources, and study materials to enhance your learning."
              delay={0.2}
            />
            <FeatureCard
              icon={<Brain className="h-10 w-10 text-indigo-600" />}
              title="AI Tutor"
              description="Get personalized help from our AI tutor that adapts to your learning style and needs."
              delay={0.3}
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-indigo-600" />}
              title="Group Study"
              description="Create or join study groups, share resources, and collaborate with peers."
              delay={0.4}
            />
            <FeatureCard
              icon={<Star className="h-10 w-10 text-indigo-600" />}
              title="Gamification"
              description="Earn badges, climb leaderboards, and get rewarded for your contributions and progress."
              delay={0.5}
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-indigo-600" />}
              title="Premium Features"
              description="Unlock advanced features for an enhanced learning experience."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="How Collex Works"
            subtitle="Your journey to collaborative learning in four simple steps"
          />

          <div className="mt-16">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="order-2 md:order-1"
              >
                <img
                  src="/placeholder.svg?height=600&width=800&text=Dashboard+Preview"
                  alt="Collex Dashboard"
                  className="rounded-xl shadow-xl w-full"
                />
              </motion.div>

              <div className="order-1 md:order-2">
                <StepItem
                  number="01"
                  title="Create Your Account"
                  description="Sign up with your email or social media accounts and set up your profile with your interests and academic background."
                  delay={0.1}
                />
                <StepItem
                  number="02"
                  title="Explore the Platform"
                  description="Browse the Q&A section, digital library, and connect with other students who share your academic interests."
                  delay={0.2}
                />
                <StepItem
                  number="03"
                  title="Engage and Collaborate"
                  description="Ask questions, provide answers, join study groups, and participate in discussions to enhance your learning."
                  delay={0.3}
                />
                <StepItem
                  number="04"
                  title="Track Your Progress"
                  description="Monitor your learning journey, earn badges, and climb the leaderboards as you contribute to the community."
                  delay={0.4}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="What Our Users Say"
            subtitle="Join thousands of students who are already transforming their learning experience"
            light
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="Ankush Shirsathe"
              role="Computer Science Student"
              image="/placeholder.svg?height=200&width=200&text=AS"
              quote="Collex has completely transformed how I study. The AI tutor helped me understand complex programming concepts that I was struggling with for weeks!"
              delay={0.1}
            />
            <TestimonialCard
              name="Madhri Sen"
              role="Engineering Major"
              image="/placeholder.svg?height=200&width=200&text=MS"
              quote="The collaborative features are amazing! I found a study group for my thermodynamics class and we've been helping each other ace our exams."
              delay={0.2}
            />
            <TestimonialCard
              name="Priya Patel"
              role="Medical Student"
              image="/placeholder.svg?height=200&width=200&text=PP"
              quote="The digital library has rare medical textbooks that I couldn't find anywhere else. Collex has become an essential part of my medical education."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-12 text-white text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Learning Experience?</h2>
            <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto">
              Join thousands of students who are already using Collex to enhance their education through collaboration
              and AI-powered learning.
            </p>
            <Button asChild size="lg" className="bg-white text-indigo-700 hover:bg-white/90">
              <Link href="/signup">Get Started Today</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Collex</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Q&A Platform
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Digital Library
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    AI Tutor
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Group Study
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Collex. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Component for navigation links with hover animation
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-white/80 hover:text-white transition-colors relative group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
    </Link>
  )
}

// Component for floating elements with animation
function FloatingElement({
  className,
  icon,
  text,
  delay = 0,
}: {
  className: string
  icon: React.ReactNode
  text: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={cn("rounded-lg p-3 text-white shadow-lg flex items-center gap-3", className)}
    >
      {icon}
      <span className="font-medium">{text}</span>
    </motion.div>
  )
}

// Component for section headings
function SectionHeading({
  title,
  subtitle,
  light = false,
}: {
  title: string
  subtitle: string
  light?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center max-w-3xl mx-auto"
    >
      <h2 className={cn("text-3xl md:text-4xl font-bold mb-4", light ? "text-white" : "text-gray-900")}>{title}</h2>
      <p className={cn("text-xl", light ? "text-white/80" : "text-gray-600")}>{subtitle}</p>
    </motion.div>
  )
}

// Component for feature cards
function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
    >
      <div className="rounded-full bg-indigo-100 w-16 h-16 flex items-center justify-center mb-6">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

// Component for step items
function StepItem({
  number,
  title,
  description,
  delay = 0,
}: {
  number: string
  title: string
  description: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="flex gap-6 mb-8"
    >
      <div className="flex-shrink-0">
        <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
          {number}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  )
}

// Component for testimonial cards
function TestimonialCard({
  name,
  role,
  image,
  quote,
  delay = 0,
}: {
  name: string
  role: string
  image: string
  quote: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg"
    >
      <div className="flex items-center gap-4 mb-4">
        <img src={image || "/placeholder.svg"} alt={name} className="w-12 h-12 rounded-full object-cover" />
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-white/70 text-sm">{role}</p>
        </div>
      </div>
      <p className="italic text-white/90">&ldquo;{quote}&rdquo;</p>
    </motion.div>
  )
}

