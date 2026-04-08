'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store/authStore';
import { Loader2, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';

export default function OAuthSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);
  
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Decode JWT token payload to get user info if possible (split by '.' and decode base64)
      try {
        let user: { id: string; email: string; name?: string; role?: 'admin' | 'user' } = { 
          id: 'user', 
          email: 'user@example.com' 
        }; // Fallback user
        
        if (token.split('.').length === 3) {
          const payloadStr = atob(token.split('.')[1]);
          const payload = JSON.parse(payloadStr);
          
          user = {
            id: payload.id || payload.sub || 'user',
            email: payload.email || 'user@example.com',
            name: payload.name,
            role: payload.role as 'admin' | 'user' | undefined
          };
        }
        
        // Save the token and user to our Zustand store
        setAuth(user, token);
        
        toast.success('OAuth Login Successful!');
        router.push('/dashboard');
      } catch (err) {
        console.error('Error parsing token:', err);
        // Even if parsing fails, we might still have a valid token (e.g. opaque token)
        setAuth({ id: 'oauth-user', email: 'user@example.com' }, token);
        router.push('/dashboard');
      }
    } else {
      const errorParam = searchParams.get('error');
      if (errorParam) {
        setError(`Authentication failed: ${errorParam}`);
      } else {
        setError('No authentication token or error provided in the URL parameters.');
      }
    }
  }, [searchParams, router, setAuth]);

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-destructive/20 shadow-destructive/5">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-2">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <CardTitle className="text-xl font-bold">OAuth Error</CardTitle>
            <CardDescription className="text-destructive/80">
              {error}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pt-2">
            <Link href="/login" className="w-full">
              <Button variant="outline" className="w-full">
                Back to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading state
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center text-center space-y-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight">Completing Authentication...</h1>
          <p className="text-sm text-muted-foreground">Redirecting you to the dashboard.</p>
        </div>
      </div>
    </div>
  );
}
