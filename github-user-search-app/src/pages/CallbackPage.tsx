import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '@/store/authContext';
import { getState, removeState } from '@/services/authService';

export function CallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleCallback } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const processedRef = useRef(false);

  useEffect(() => {
    async function processCallback() {
      // Guard: Only process once
      if (processedRef.current) return;
      processedRef.current = true;

      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const storedState = getState();

      // Validate state to prevent CSRF
      if (!state || state !== storedState) {
        setError('Invalid state parameter. Please try again.');
        setIsProcessing(false);
        return;
      }

      removeState();

      if (!code) {
        setError('No authorization code received.');
        setIsProcessing(false);
        return;
      }

      try {
        await handleCallback(code);
        navigate('/profile', { replace: true });
      } catch {
        setError('Authentication failed. Please try again.');
        setIsProcessing(false);
      }
    }

    processCallback();
  }, [searchParams, handleCallback, navigate]);

  // Show loading state while processing OR if no error yet
  if (isProcessing || !error) {
    return (
      <main className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
        <div className="font-mono text-preset-4 text-neutral-500 dark:text-neutral-200">
          Authenticating...
        </div>
      </main>
    );
  }

  // Only show error after processing completes with an error
  return (
    <main className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center justify-center px-200">
      <div className="bg-neutral-0 dark:bg-neutral-800 rounded-16 shadow-card p-600 max-w-md text-center">
        <h1 className="font-mono text-preset-1 text-red-500 mb-300">
          Authentication Error
        </h1>
        <p className="font-mono text-preset-6 text-neutral-500 dark:text-neutral-200 mb-400">
          {error}
        </p>
        <a
          href="/"
          className="font-mono text-preset-5 text-blue-500 dark:text-blue-300 hover:underline"
        >
          Return to Home
        </a>
      </div>
    </main>
  );
}
