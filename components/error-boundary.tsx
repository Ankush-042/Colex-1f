"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"

interface ErrorBoundaryProps {
  fallback: ReactNode
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error)
    console.error("Component stack:", errorInfo.componentStack)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          {this.props.fallback}
          {this.state.error && <p>Error Message: {this.state.error.message}</p>}
        </div>
      )
    }

    return this.props.children
  }
}
