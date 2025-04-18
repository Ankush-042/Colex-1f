"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Brain,
  Send,
  Lightbulb,
  BookOpen,
  Clock,
  ChevronRight,
  Loader2,
  Sparkles,
  History,
  Bookmark,
  Settings,
} from "lucide-react"

export default function AITutorPage() {
  const [messages, setMessages] = useState([
    { id: "welcome", role: "assistant", content: "Hello! I'm your AI tutor. How can I help you today?" },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [mounted, setMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    setMounted(true)
    scrollToBottom()
  }, [messages])

  // Render a simple loading state during SSR and initial hydration
  if (!mounted) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading AI Tutor...</p>
        </div>
      </div>
    )
  }

  const handleSendMessage = () => {
    if (input.trim()) {
      // Add user message with unique ID
      const userMessageId = `user-${Date.now()}`
      setMessages((prev) => [...prev, { id: userMessageId, role: "user", content: input }])
      setInput("")

      // Simulate AI typing
      setIsTyping(true)

      // Simulate AI response after a delay
      setTimeout(() => {
        setIsTyping(false)
        const aiMessageId = `ai-${Date.now()}`
        setMessages((prev) => [
          ...prev,
          {
            id: aiMessageId,
            role: "assistant",
            content: `I understand your question about "${input.trim()}". Let me help you with that...`,
          },
        ])
      }, 1500)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-lg text-white shadow-lg hover:rotate-3 hover:scale-110 transition-transform duration-200">
            <Brain className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
            AI Tutor
          </h1>
        </div>
        <Button
          variant="outline"
          className="border-purple-300 hover:border-purple-500 gap-2 transition-colors hover:scale-105 active:scale-95 transition-transform"
        >
          <History className="h-4 w-4 text-purple-500" />
          Session History
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-[600px] flex flex-col shadow-xl border-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/10 opacity-50"></div>
            <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/20 backdrop-blur-sm relative">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 bg-gradient-to-r from-purple-500 to-purple-600 text-white border-2 border-white">
                  <AvatarImage src="/placeholder.svg?height=32&width=32&text=AI" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Chat with AI Tutor
                    <Sparkles className="h-4 w-4 text-yellow-400" />
                  </CardTitle>
                  <CardDescription>Ask any question about your studies</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden p-0 relative">
              <ScrollArea className="h-[450px] p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mb-4`}
                  >
                    <div className={`flex items-end ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <Avatar
                        className={`${message.role === "user" ? "ml-2" : "mr-2"} ${
                          message.role === "assistant"
                            ? "bg-gradient-to-r from-purple-500 to-purple-600"
                            : "bg-gradient-to-r from-blue-500 to-blue-600"
                        } text-white border-2 border-white shadow-md`}
                      >
                        <AvatarImage
                          src={
                            message.role === "user"
                              ? "/placeholder.svg?height=32&width=32&text=You"
                              : "/placeholder.svg?height=32&width=32&text=AI"
                          }
                        />
                        <AvatarFallback>{message.role === "user" ? "You" : "AI"}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`rounded-2xl p-4 max-w-md shadow-md ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                            : "bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-800"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start mb-4">
                    <div className="flex items-end">
                      <Avatar className="mr-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white border-2 border-white shadow-md">
                        <AvatarImage src="/placeholder.svg?height=32&width=32&text=AI" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div className="rounded-2xl p-4 bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-800 shadow-md">
                        <div className="flex items-center gap-1">
                          <div
                            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </ScrollArea>
            </CardContent>
            <CardFooter className="border-t p-3 relative">
              <div className="flex w-full space-x-2">
                <Input
                  placeholder="Type your question here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="border-purple-200 focus:border-purple-500 dark:border-purple-800 dark:focus:border-purple-500 shadow-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isTyping}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-md hover:scale-105 active:scale-95 transition-transform"
                >
                  {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="h-[600px] shadow-xl border-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/10 opacity-50"></div>
            <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-600/20 backdrop-blur-sm relative">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-500" />
                Learning Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <Tabs defaultValue="concepts" className="mt-2">
                <TabsList className="grid w-full grid-cols-3 bg-background/80 backdrop-blur-sm border">
                  <TabsTrigger
                    value="concepts"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-primary-foreground transition-all duration-300"
                  >
                    Concepts
                  </TabsTrigger>
                  <TabsTrigger
                    value="exercises"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-primary-foreground transition-all duration-300"
                  >
                    Exercises
                  </TabsTrigger>
                  <TabsTrigger
                    value="resources"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-primary-foreground transition-all duration-300"
                  >
                    Resources
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="concepts" className="mt-4">
                  <div className="space-y-4">
                    <LearningTool
                      icon={Lightbulb}
                      title="Key Theories"
                      description="Explore fundamental concepts and theories"
                      color="from-yellow-500 to-yellow-600"
                    />
                    <LearningTool
                      icon={Brain}
                      title="Problem-Solving Strategies"
                      description="Learn effective approaches to solve complex problems"
                      color="from-blue-500 to-blue-600"
                    />
                    <LearningTool
                      icon={BookOpen}
                      title="Glossary"
                      description="Reference key terms and definitions"
                      color="from-green-500 to-green-600"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="exercises" className="mt-4">
                  <div className="space-y-4">
                    <LearningTool
                      icon={Brain}
                      title="Practice Problems"
                      description="Test your knowledge with interactive exercises"
                      color="from-indigo-500 to-indigo-600"
                    />
                    <LearningTool
                      icon={Clock}
                      title="Quizzes"
                      description="Challenge yourself with timed quizzes"
                      color="from-red-500 to-red-600"
                    />
                    <LearningTool
                      icon={Sparkles}
                      title="Interactive Simulations"
                      description="Visualize concepts through interactive models"
                      color="from-orange-500 to-orange-600"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="resources" className="mt-4">
                  <div className="space-y-4">
                    <LearningTool
                      icon={BookOpen}
                      title="Recommended Readings"
                      description="Curated articles and books for deeper learning"
                      color="from-purple-500 to-purple-600"
                    />
                    <LearningTool
                      icon={Bookmark}
                      title="Video Tutorials"
                      description="Visual explanations of complex topics"
                      color="from-pink-500 to-pink-600"
                    />
                    <LearningTool
                      icon={Settings}
                      title="External Links"
                      description="Additional resources from trusted sources"
                      color="from-gray-500 to-gray-600"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function LearningTool({ icon: Icon, title, description, color }) {
  return (
    <div className="p-4 rounded-lg border border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-colors shadow-sm hover:translate-x-1 hover:scale-[1.02] transition-transform duration-200">
      <div className="flex items-center gap-3">
        <div className={`bg-gradient-to-r ${color} p-2 rounded-full shadow-md`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <ChevronRight className="h-5 w-5 text-purple-500 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  )
}

