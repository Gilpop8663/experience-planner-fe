import React from "react";
import ErrorFallback from "./ErrorFallback";
/**
 * ErrorBoundary 컴포넌트의 프로퍼티를 정의합니다.
 * @interface ErrorBoundaryProps
 */
interface ErrorBoundaryProps {
  children: JSX.Element;
}

/**
 * ErrorBoundary의 state 프로퍼티를 정의합니다.
 * @interface ErrorBoundaryState
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null; // 에러 객체를 저장
}

/**
 * 에러를 처리하고 대체 UI를 표시하는 React 컴포넌트입니다.
 * @class ErrorBoundary
 * @extends {React.Component<ErrorBoundaryProps, ErrorBoundaryState>}
 */
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error caught by componentDidCatch:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
