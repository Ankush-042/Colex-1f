"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { LineChart, PieChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("overview")
  const [progressValues, setProgressValues] = useState({
    mathematics: 0,
    physics: 0,
    computerScience: 0,
    biology: 0,
  })
  const [mounted, setMounted] = useState(false)
  const tabsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    // Animate progress bars after component mounts
    const timer = setTimeout(() => {
      if (mounted) {
        setProgressValues({
          mathematics: 78,
          physics: 65,
          computerScience: 92,
          biology: 45,
        })
      }
    }, 300)

    return () => {
      clearTimeout(timer)
      setMounted(false)
    }
  }, [mounted])

  // Safe rendering - prevent "Unexpected Fiber popped" error
  if (!mounted) return null

  return (
    <div ref={tabsRef}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                  <CardDescription>View your progress across different subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Mathematics Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Mathematics</span>
                        <span className="text-sm font-bold text-primary">{progressValues.mathematics}%</span>
                      </div>
                      <Progress
                        value={progressValues.mathematics}
                        className="h-2 transition-all duration-1000 ease-out"
                      />
                    </div>

                    {/* Physics Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Physics</span>
                        <span className="text-sm font-bold text-primary">{progressValues.physics}%</span>
                      </div>
                      <Progress value={progressValues.physics} className="h-2 transition-all duration-1000 ease-out" />
                    </div>

                    {/* Computer Science Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Computer Science</span>
                        <span className="text-sm font-bold text-primary">{progressValues.computerScience}%</span>
                      </div>
                      <Progress
                        value={progressValues.computerScience}
                        className="h-2 transition-all duration-1000 ease-out"
                      />
                    </div>

                    {/* Biology Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Biology</span>
                        <span className="text-sm font-bold text-primary">{progressValues.biology}%</span>
                      </div>
                      <Progress value={progressValues.biology} className="h-2 transition-all duration-1000 ease-out" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Analytics</CardTitle>
                  <CardDescription>In-depth analysis of your learning metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full rounded-md bg-muted/30 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <LineChart className="h-10 w-10 text-primary" />
                      <p>Interactive analytics visualization</p>
                      <div className="grid grid-cols-7 w-full gap-2 mt-4">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                          const heights = [75, 96, 54, 120, 105, 60, 45]
                          return (
                            <div key={day} className="flex flex-col items-center">
                              <div
                                className="bg-primary/80 rounded-t-md w-full"
                                style={{ height: `${heights[i] * 0.01 * 100}px` }}
                              ></div>
                              <span className="text-xs mt-1">{day}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generated Reports</CardTitle>
                  <CardDescription>Access and download your learning reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full rounded-md bg-muted/30 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <PieChart className="h-10 w-10 text-primary" />
                      <p>Report generation interface would render here</p>
                      <p className="text-xs">With export options and scheduling</p>
                      <Button className="mt-4">Generate New Report</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  )
}

