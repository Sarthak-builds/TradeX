'use client';

import * as React from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { useOAuthCallback } from '@/features/auth/hooks/useOAuthCallback';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';

export default function AuthCallbackPage() {
  const { error, isProcessing } = useOAuthCallback();

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-destructive/20 shadow-destructive/5">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-2">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <CardTitle className="text-xl font-bold">Authentication Error</CardTitle>
            <CardDescription className="text-destructive/80">
              {error}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pt-2">
            <Link href="/login" className="w-full">
              <Button variant="outline" className="w-full">
                Try Again
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Handle loading state
  if (isProcessing) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <div className="space-y-1">
            <h1 className="text-xl font-bold tracking-tight">Authenticating...</h1>
            {/* <p className="text-sm text-muted-foreground">Synchronizing your terminal session.</p> */}
          </div>
        </div>
      </div>
    );
  }

  // If callback succeeds, it will automatically redirect within the hook
  return null;
}
