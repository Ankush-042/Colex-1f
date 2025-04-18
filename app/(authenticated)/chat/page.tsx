"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Plus, Hash } from "lucide-react"

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState("general")
  const [input, setInput] = useState("")

  const handleSendMessage = () => {
    if (input.trim()) {
      // Here you would typically send the message to your backend
      console.log(`Sending message to ${activeChat}: ${input}`)
      setInput("")
    }
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold">Chat Streams</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Stream
        </Button>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-1"
        >
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle>Streams</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <Tabs orientation="vertical" value={activeChat} onValueChange={setActiveChat}>
                  <TabsList className="w-full">
                    {chatStreams.map((stream) => (
                      <TabsTrigger key={stream.id} value={stream.id} className="justify-start w-full">
                        <Hash className="mr-2 h-4 w-4" />
                        {stream.name}
                        {stream.unread > 0 && (
                          <Badge variant="destructive" className="ml-auto">
                            {stream.unread}
                          </Badge>
                        )}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-3"
        >
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle>{chatStreams.find((stream) => stream.id === activeChat)?.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-auto">
              <ScrollArea className="h-[450px]">
                {chatMessages[activeChat]?.map((message, index) => (
                  <div key={index} className="flex items-start space-x-4 mb-4">
                    <Avatar>
                      <AvatarImage src={message.avatar} />
                      <AvatarFallback>{message.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{message.author}</p>
                      <p>{message.content}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <div className="flex w-full space-x-2">
                <Input
                  placeholder="Type your message here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

const chatStreams = [
  { id: "general", name: "General", unread: 0 },
  { id: "mathematics", name: "Mathematics", unread: 3 },
  { id: "physics", name: "Physics", unread: 1 },
  { id: "computer-science", name: "Computer Science", unread: 0 },
  { id: "biology", name: "Biology", unread: 2 },
]

const chatMessages = {
  general: [
    {
      author: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40&text=JD",
      content: "Hello everyone! How's your day going?",
    },
    {
      author: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40&text=JS",
      content: "Hi John! It's going well, thanks for asking. How about you?",
    },
    {
      author: "Alice Johnson",
      avatar: "/placeholder.svg?height=40&width=40&text=AJ",
      content: "Hello all! I'm new here. Excited to join this community!",
    },
  ],
  mathematics: [
    {
      author: "Prof. Smith",
      avatar: "/placeholder.svg?height=40&width=40&text=PS",
      content: "Today we'll be discussing linear algebra. Any questions before we start?",
    },
    {
      author: "Student1",
      avatar: "/placeholder.svg?height=40&width=40&text=S1",
      content: "Yes, could you explain the concept of eigenvectors again?",
    },
    { author: "Prof. Smith", avatar: "/placeholder.svg?height=40&width=40&text=PS", content: "Eigenvectors are..." },
  ],
  physics: [
    {
      author: "Dr. Brown",
      avatar: "/placeholder.svg?height=40&width=40&text=DB",
      content: "Let's talk about quantum mechanics. Who can explain the double-slit experiment?",
    },
    {
      author: "Student2",
      avatar: "/placeholder.svg?height=40&width=40&text=S2",
      content: "The double-slit experiment demonstrates the wave-particle duality of matter and light...",
    },
  ],
  "computer-science": [
    {
      author: "Tech Guru",
      avatar: "/placeholder.svg?height=40&width=40&text=TG",
      content: "What programming languages are you all currently learning?",
    },
    {
      author: "Coder1",
      avatar: "/placeholder.svg?height=40&width=40&text=C1",
      content: "I'm focusing on Python and JavaScript right now.",
    },
    {
      author: "Coder2",
      avatar: "/placeholder.svg?height=40&width=40&text=C2",
      content: "I'm diving deep into Rust. It's challenging but rewarding!",
    },
  ],
  biology: [
    {
      author: "BioProf",
      avatar: "/placeholder.svg?height=40&width=40&text=BP",
      content: "Today's topic: The structure and function of DNA. Any initial thoughts?",
    },
    {
      author: "Student3",
      avatar: "/placeholder.svg?height=40&width=40&text=S3",
      content: "DNA is often described as the blueprint of life, right?",
    },
    {
      author: "BioProf",
      avatar: "/placeholder.svg?height=40&width=40&text=BP",
      content: "That's a good start! Let's explore that idea further...",
    },
  ],
}

