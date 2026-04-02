'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';

export function useOAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [error, setError] = React.useState<string | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(true);

  React.useEffect(() => {
    const token = searchParams.get('token');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      const message = errorParam === 'access_denied' 
        ? 'Authorization denied by user.' 
        : 'An error occurred during authentication.';
      setError(message);
      setIsProcessing(false);
      return;
    }

    if (token) {
      try {
        const userDataStr = searchParams.get('user');
        
        if (!userDataStr) {
          setError('Incomplete authentication data: missing user profile.');
          setIsProcessing(false);
          return;
        }

        const user = JSON.parse(decodeURIComponent(userDataStr));
        setAuth(user, token);
        
        toast.success('Authenticated successfully!');
        router.push('/dashboard');
      } catch (err) {
        console.error('OAuth Callback Error:', err);
        setError('The server returned malformed authentication data.');
        setIsProcessing(false);
      }
    } else {
      setError('No valid terminal token found.');
      setIsProcessing(false);
    }
  }, [searchParams, setAuth, router]);

  return { error, isProcessing };
}
