"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Plus, Users, Video } from "lucide-react"

export default function GroupStudyPage() {
  const [activeTab, setActiveTab] = useState("my-groups")

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold">Group Study</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Group
        </Button>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="my-groups">My Groups</TabsTrigger>
          <TabsTrigger value="discover">Discover Groups</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="my-groups">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GroupCard {...group} />
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="discover">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {discoverGroups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GroupCard {...group} showJoin />
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming">
          <div className="space-y-4">
            {upcomingSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <SessionCard {...session} />
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function GroupCard({ name, subject, members, avatar, description, showJoin = false }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={avatar} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{name}</CardTitle>
            <Badge>{subject}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
        <div className="mt-4 flex items-center text-sm text-muted-foreground">
          <Users className="mr-2 h-4 w-4" />
          {members} members
        </div>
      </CardContent>
      <CardFooter>
        {showJoin ? (
          <Button className="w-full">Join Group</Button>
        ) : (
          <Button variant="outline" className="w-full">
            View Group
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

function SessionCard({ groupName, subject, date, time, duration }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{groupName}</CardTitle>
        <Badge>{subject}</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            {date}
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            {time} ({duration})
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Video className="mr-2 h-4 w-4" />
          Join Session
        </Button>
      </CardFooter>
    </Card>
  )
}

const myGroups = [
  {
    id: 1,
    name: "Calculus Masters",
    subject: "Mathematics",
    members: 15,
    avatar: "/placeholder.svg?height=40&width=40&text=CM",
    description: "A group dedicated to mastering calculus concepts and problem-solving techniques.",
  },
  {
    id: 2,
    name: "Quantum Explorers",
    subject: "Physics",
    members: 12,
    avatar: "/placeholder.svg?height=40&width=40&text=QE",
    description: "Dive deep into quantum mechanics and explore the mysteries of the universe.",
  },
  {
    id: 3,
    name: "Code Wizards",
    subject: "Computer Science",
    members: 20,
    avatar: "/placeholder.svg?height=40&width=40&text=CW",
    description: "Sharpen your coding skills and tackle challenging programming problems together.",
  },
]

const discoverGroups = [
  {
    id: 4,
    name: "Biology Enthusiasts",
    subject: "Biology",
    members: 18,
    avatar: "/placeholder.svg?height=40&width=40&text=BE",
    description: "Explore the wonders of life sciences and discuss cutting-edge research.",
  },
  {
    id: 5,
    name: "Literature Circle",
    subject: "English Literature",
    members: 10,
    avatar: "/placeholder.svg?height=40&width=40&text=LC",
    description: "Analyze classic and contemporary literature in a friendly, discussion-based environment.",
  },
  {
    id: 6,
    name: "History Buffs",
    subject: "History",
    members: 14,
    avatar: "/placeholder.svg?height=40&width=40&text=HB",
    description: "Delve into historical events and their impact on the modern world.",
  },
]

const upcomingSessions = [
  {
    id: 1,
    groupName: "Calculus Masters",
    subject: "Mathematics",
    date: "May 15, 2023",
    time: "3:00 PM",
    duration: "1 hour",
  },
  {
    id: 2,
    groupName: "Quantum Explorers",
    subject: "Physics",
    date: "May 16, 2023",
    time: "4:30 PM",
    duration: "1.5 hours",
  },
  {
    id: 3,
    groupName: "Code Wizards",
    subject: "Computer Science",
    date: "May 17, 2023",
    time: "6:00 PM",
    duration: "2 hours",
  },
]

