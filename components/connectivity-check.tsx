"use client"

import { useConnectivityCheck } from "@/lib/connectivity-check"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

export function ConnectivityCheck() {
  const { issues, isChecking, checkConnectivity } = useConnectivityCheck()

  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="outline"
        size="sm"
        onClick={checkConnectivity}
        disabled={isChecking}
        className="bg-white dark:bg-gray-800 shadow-md"
      >
        {isChecking ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Checking...
          </>
        ) : (
          <>
            {issues.filter((i) => !i.resolved).length > 0 ? (
              <span className="text-red-500">Issues Found</span>
            ) : (
              <span className="text-green-500">All Connected</span>
            )}
          </>
        )}
      </Button>
    </div>
  )
}

