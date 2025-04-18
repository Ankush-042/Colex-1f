"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageSquare,
  Send,
  Plus,
  Users,
  Clock,
  Calendar,
  Video,
  Pencil,
  Save,
  FileText,
  Image,
  LinkIcon,
  Share,
  Download,
  MoreHorizontal,
  XCircle,
} from "lucide-react"
import { LucideSearch } from "lucide-react"

export default function CollaborationPage() {
  const [activeTab, setActiveTab] = useState("whiteboard")
  const [message, setMessage] = useState("")
  const [mounted, setMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    // Scroll to bottom of messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  if (!mounted) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading collaboration tools...</p>
        </div>
      </div>
    )
  }

  const sendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to the server
      console.log("Sending message:", message)
      setMessage("")

      // Scroll to bottom of messages
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-xl border bg-gradient-to-r from-purple-500/20 via-purple-500/10 to-background p-1"
      >
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-black/10"></div>
        <div className="relative rounded-lg bg-background/95 p-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Team Collaboration</h1>
              <p className="text-muted-foreground max-w-2xl mt-2">
                Work together in real-time with your team using our collaborative tools
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button>
                <Video className="mr-2 h-4 w-4" />
                Start Meeting
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-4 gap-6"
      >
        {/* Team Info */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Code Chakra</CardTitle>
            <CardDescription>Programming Team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">12 members</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Next meeting: Today, 4:00 PM</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Active Members</h3>
              <div className="flex -space-x-2">
                {activeMembers.map((member, index) => (
                  <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                ))}
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground text-xs border-2 border-background">
                  +3
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Current Challenge</h3>
              <div className="p-3 rounded-md bg-primary/10">
                <p className="text-sm font-medium">Web App Development Challenge</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Due in 3 days</span>
                </div>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    In Progress
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Team Space
            </Button>
          </CardFooter>
        </Card>

        {/* Collaboration Tools */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="whiteboard">
                  <Pencil className="mr-2 h-4 w-4" />
                  Whiteboard
                </TabsTrigger>
                <TabsTrigger value="chat">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Group Chat
                </TabsTrigger>
                <TabsTrigger value="documents">
                  <FileText className="mr-2 h-4 w-4" />
                  Documents
                </TabsTrigger>
              </TabsList>
              <TabsContent value="whiteboard" className="m-0">
                <WhiteboardTool />
              </TabsContent>

              <TabsContent value="chat" className="m-0">
                <ChatTool
                  messagesEndRef={messagesEndRef}
                  message={message}
                  setMessage={setMessage}
                  sendMessage={sendMessage}
                />
              </TabsContent>

              <TabsContent value="documents" className="m-0">
                <DocumentsTool />
              </TabsContent>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0">
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Team Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  variants={item}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <activity.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{activity.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{activity.date}</span>
                        <Clock className="h-3 w-3 text-muted-foreground ml-2" />
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {activity.status === "confirmed" ? (
                      <Badge className="bg-green-500">Confirmed</Badge>
                    ) : activity.status === "pending" ? (
                      <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                        Pending
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-red-500 text-red-500">
                        Cancelled
                      </Badge>
                    )}
                    <Button size="sm">View Details</Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

function WhiteboardTool() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [tool, setTool] = useState("pen")
  const [color, setColor] = useState("#000000")

  return (
    <div className="h-[600px] relative">
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-background/80 backdrop-blur-sm border-b z-10">
        <div className="flex items-center gap-2">
          <Button size="sm" variant={tool === "pen" ? "default" : "outline"} onClick={() => setTool("pen")}>
            <Pencil className="h-4 w-4 mr-1" />
            Pen
          </Button>
          <Button size="sm" variant={tool === "eraser" ? "default" : "outline"} onClick={() => setTool("eraser")}>
            <XCircle className="h-4 w-4 mr-1" />
            Eraser
          </Button>
          <Button size="sm" variant={tool === "text" ? "default" : "outline"} onClick={() => setTool("text")}>
            <MessageSquare className="h-4 w-4 mr-1" />
            Text
          </Button>
          <Button size="sm" variant={tool === "shape" ? "default" : "outline"} onClick={() => setTool("shape")}>
            <div className="h-4 w-4 mr-1 border-2 rounded-sm"></div>
            Shape
          </Button>
          <div className="h-8 mx-2 border-l"></div>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-8 w-8 rounded-md cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline">
            <Share className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button size="sm" variant="outline">
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </div>

      <div ref={canvasRef} className="h-full w-full bg-white p-4 pt-16">
        <div className="h-full w-full border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Pencil className="h-12 w-12 mx-auto mb-2 opacity-20" />
            <p>Collaborative whiteboard</p>
            <p className="text-sm">Draw, sketch, and collaborate in real-time</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChatTool({ messagesEndRef, message, setMessage, sendMessage }) {
  return (
    <div className="h-[600px] flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
              {msg.sender !== "You" && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={msg.avatar} alt={msg.sender} />
                  <AvatarFallback>{msg.sender[0]}</AvatarFallback>
                </Avatar>
              )}
              <div>
                <div className="text-xs text-muted-foreground mb-1">
                  {msg.sender} • {msg.time}
                </div>
                <div
                  className={`p-3 rounded-lg max-w-md ${
                    msg.sender === "You" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
              {msg.sender === "You" && (
                <Avatar className="h-8 w-8 ml-2">
                  <AvatarImage src="/placeholder.svg?height=32&width=32&text=You" alt="You" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex mt-2 gap-2">
          <Button size="sm" variant="outline">
            <Image className="h-4 w-4 mr-1" />
            Image
          </Button>
          <Button size="sm" variant="outline">
            <FileText className="h-4 w-4 mr-1" />
            File
          </Button>
          <Button size="sm" variant="outline">
            <LinkIcon className="h-4 w-4 mr-1" />
            Link
          </Button>
        </div>
      </div>
    </div>
  )
}

function DocumentsTool() {
  return (
    <div className="h-[600px] flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            New Document
          </Button>
          <Button size="sm" variant="outline">
            <Upload className="h-4 w-4 mr-1" />
            Upload
          </Button>
        </div>
        <div className="relative">
          <LucideSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search documents..." className="pl-8 pr-4 w-[250px]" />
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div
              key={doc.id}
              className="p-4 rounded-lg border flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded">
                  <doc.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{doc.title}</h3>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span>Last edited by {doc.lastEditedBy}</span>
                    <span>•</span>
                    <span>{doc.lastEdited}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost">
                  <Share className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

// Sample data with Indian names
const activeMembers = [
  {
    id: 1,
    name: "Arjun Sharma",
    avatar: "/placeholder.svg?height=32&width=32&text=AS",
  },
  {
    id: 2,
    name: "Priya Patel",
    avatar: "/placeholder.svg?height=32&width=32&text=PP",
  },
  {
    id: 3,
    name: "Vikram Singh",
    avatar: "/placeholder.svg?height=32&width=32&text=VS",
  },
  {
    id: 4,
    name: "Neha Gupta",
    avatar: "/placeholder.svg?height=32&width=32&text=NG",
  },
]

const chatMessages = [
  {
    sender: "Arjun Sharma",
    avatar: "/placeholder.svg?height=32&width=32&text=AS",
    content: "Hey team, I've started working on the frontend components for our project.",
    time: "10:15 AM",
  },
  {
    sender: "Priya Patel",
    avatar: "/placeholder.svg?height=32&width=32&text=PP",
    content: "Great! I'm focusing on the database schema. Should have it ready by tomorrow.",
    time: "10:18 AM",
  },
  {
    sender: "Vikram Singh",
    avatar: "/placeholder.svg?height=32&width=32&text=VS",
    content: "I can help with the API endpoints once the schema is ready.",
    time: "10:20 AM",
  },
  {
    sender: "You",
    avatar: "/placeholder.svg?height=32&width=32&text=You",
    content: "Sounds good! I'll work on the authentication system today.",
    time: "10:22 AM",
  },
  {
    sender: "Arjun Sharma",
    avatar: "/placeholder.svg?height=32&width=32&text=AS",
    content: "Perfect! Let's sync up again at 4 PM to check our progress.",
    time: "10:25 AM",
  },
  {
    sender: "Priya Patel",
    avatar: "/placeholder.svg?height=32&width=32&text=PP",
    content: "Works for me. I've also shared some design mockups in the documents section.",
    time: "10:28 AM",
  },
  {
    sender: "You",
    avatar: "/placeholder.svg?height=32&width=32&text=You",
    content: "Thanks Priya, I'll take a look at them.",
    time: "10:30 AM",
  },
]

const documents = [
  {
    id: 1,
    title: "Project Requirements.docx",
    lastEditedBy: "Arjun Sharma",
    lastEdited: "Today at 9:30 AM",
    icon: FileText,
  },
  {
    id: 2,
    title: "UI Design Mockups.fig",
    lastEditedBy: "Priya Patel",
    lastEdited: "Yesterday at 4:15 PM",
    icon: Image,
  },
  {
    id: 3,
    title: "Database Schema.pdf",
    lastEditedBy: "Vikram Singh",
    lastEdited: "May 12, 2023",
    icon: FileText,
  },
  {
    id: 4,
    title: "API Documentation.md",
    lastEditedBy: "You",
    lastEdited: "May 10, 2023",
    icon: FileText,
  },
  {
    id: 5,
    title: "Meeting Notes - May 8.docx",
    lastEditedBy: "Arjun Sharma",
    lastEdited: "May 8, 2023",
    icon: FileText,
  },
]

const teamActivities = [
  {
    id: 1,
    title: "Team Meeting: Project Progress",
    date: "Today",
    time: "4:00 PM - 5:00 PM",
    status: "confirmed",
    icon: Video,
  },
  {
    id: 2,
    title: "Code Review Session",
    date: "Tomorrow",
    time: "2:00 PM - 3:30 PM",
    status: "pending",
    icon: Code,
  },
  {
    id: 3,
    title: "Database Design Workshop",
    date: "May 18, 2023",
    time: "10:00 AM - 12:00 PM",
    status: "confirmed",
    icon: Brain,
  },
]

function Upload({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}

function Code({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

function Brain({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  )
}
