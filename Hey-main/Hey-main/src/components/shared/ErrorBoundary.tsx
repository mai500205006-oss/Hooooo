import { Component, type ErrorInfo, type ReactNode } from 'react';
import { logger } from '@utils/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  featureName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary عام — يُستخدم لتغليف كل Feature رئيسية
 * حتى لو feature واحد وقع، الباقي يفضل شغال.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    logger.error(
      `Error in ${this.props.featureName ?? 'unknown feature'}`,
      { error, info },
      'ErrorBoundary'
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="p-4 rounded-lg border border-rk-border bg-rk-surface text-rk-muted text-sm">
            حصل خطأ في هذا الجزء ({this.props.featureName ?? 'غير معروف'}). باقي النظام شغال طبيعي.
          </div>
        )
      );
    }
    return this.props.children;
  }
}
