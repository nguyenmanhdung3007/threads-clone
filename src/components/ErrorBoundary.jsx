import React from "react";
import * as Sentry from "@sentry/react";
import { Button } from "./ui/button";
import { Link } from "react-router";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service

    // đọc thêm https://docs.sentry.io/platforms/javascript/guides/react/features/error-boundary/
    Sentry.captureReactException(error, errorInfo);
  }

  clickHandle() {}

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
          <h1 className="mb-4 text-3xl font-semibold text-red-600">
            Something went wrong 😢
          </h1>

          <p className="mb-6 max-w-xl text-gray-700">
            An unexpected error has occurred while loading this page.
          </p>

          <div className="flex gap-3 items-center">
            <Button>Back to Home</Button>

            <Button variant="outline">Contact Us</Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
