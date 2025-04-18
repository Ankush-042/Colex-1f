"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollReveal, AnimatedInput, FeedbackMessage } from "@/components/ui/animations"
import { Bell, Lock, User, Eye, Monitor, Moon, Sun, Volume2 } from "lucide-react"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("account")
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "info">("success")
  const [feedbackMessage, setFeedbackMessage] = useState("")

  const saveSettings = () => {
    setFeedbackType("success")
    setFeedbackMessage("Settings saved successfully!")
    setShowFeedback(true)
    setTimeout(() => setShowFeedback(false), 3000)
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold">Settings</h1>
        {showFeedback && (
          <FeedbackMessage type={feedbackType} message={feedbackMessage} onClose={() => setShowFeedback(false)} />
        )}
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 md:w-auto md:inline-flex">
          <TabsTrigger value="account">
            <User className="mr-2 h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Eye className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy">
            <Lock className="mr-2 h-4 w-4" />
            Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <AnimatedInput label="First Name" defaultValue="John" />
                    <AnimatedInput label="Last Name" defaultValue="Doe" />
                    <AnimatedInput
                      label="Email"
                      type="email"
                      defaultValue="john.doe@example.com"
                      className="md:col-span-2"
                    />
                    <AnimatedInput label="Phone Number" type="tel" defaultValue="+1 (555) 123-4567" />
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Academic Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <AnimatedInput label="Institution" defaultValue="University of Example" />
                    <AnimatedInput label="Field of Study" defaultValue="Computer Science" />
                    <Select defaultValue="undergraduate">
                      <SelectTrigger>
                        <SelectValue placeholder="Education Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="highschool">High School</SelectItem>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                    <AnimatedInput label="Graduation Year" type="number" defaultValue="2024" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={saveSettings}>Save Changes</Button>
              </CardFooter>
            </Card>
          </ScrollReveal>
        </TabsContent>

        <TabsContent value="appearance">
          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize how Collex looks and feels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme</h3>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      onClick={() => setTheme("light")}
                      className="flex items-center"
                    >
                      <Sun className="mr-2 h-4 w-4" />
                      Light
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      onClick={() => setTheme("dark")}
                      className="flex items-center"
                    >
                      <Moon className="mr-2 h-4 w-4" />
                      Dark
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      onClick={() => setTheme("system")}
                      className="flex items-center"
                    >
                      <Monitor className="mr-2 h-4 w-4" />
                      System
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Font Size</h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm">A</span>
                    <Slider defaultValue={[16]} max={24} min={12} step={1} className="flex-1" />
                    <span className="text-lg">A</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Animation Preferences</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="animations">Enable animations</Label>
                      <Switch id="animations" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="transitions">Page transitions</Label>
                      <Switch id="transitions" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="reduced-motion">Reduced motion</Label>
                      <Switch id="reduced-motion" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={saveSettings}>Save Changes</Button>
              </CardFooter>
            </Card>
          </ScrollReveal>
        </TabsContent>

        <TabsContent value="notifications">
          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Control how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-qa">Q&A responses</Label>
                      <Switch id="email-qa" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-messages">Direct messages</Label>
                      <Switch id="email-messages" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-groups">Group study updates</Label>
                      <Switch id="email-groups" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-digest">Weekly digest</Label>
                      <Switch id="email-digest" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">In-App Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="app-qa">Q&A activity</Label>
                      <Switch id="app-qa" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="app-messages">Chat messages</Label>
                      <Switch id="app-messages" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="app-groups">Group updates</Label>
                      <Switch id="app-groups" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="app-discussions">Discussion board activity</Label>
                      <Switch id="app-discussions" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Sound Notifications</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sound-enabled">Enable sounds</Label>
                      <Switch id="sound-enabled" defaultChecked />
                    </div>
                    <div className="flex items-center space-x-4">
                      <Volume2 className="h-4 w-4" />
                      <Slider defaultValue={[70]} max={100} min={0} step={1} className="flex-1" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={saveSettings}>Save Changes</Button>
              </CardFooter>
            </Card>
          </ScrollReveal>
        </TabsContent>

        <TabsContent value="privacy">
          <ScrollReveal>
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Manage your privacy and security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Account Privacy</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="profile-visibility">Public profile</Label>
                      <Switch id="profile-visibility" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="online-status">Show online status</Label>
                      <Switch id="online-status" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="activity-visibility">Show activity status</Label>
                      <Switch id="activity-visibility" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Security</h3>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Lock className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Enable Two-Factor Authentication
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Manage Connected Accounts
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data & Cookies</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="data-collection">Allow data collection for personalization</Label>
                      <Switch id="data-collection" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="cookies">Accept all cookies</Label>
                      <Switch id="cookies" defaultChecked />
                    </div>
                    <Button variant="outline" className="w-full justify-start mt-4">
                      Download My Data
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={saveSettings}>Save Changes</Button>
              </CardFooter>
            </Card>
          </ScrollReveal>
        </TabsContent>
      </Tabs>
    </div>
  )
}

