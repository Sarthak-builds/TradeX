'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, KeyRound, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/shared/components/ui/card';
import { ResetPasswordForm } from '@/features/auth/components/ResetPasswordForm';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-2">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-destructive">Invalid Reset Link</h1>
          </div>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Error Identifying Account</CardTitle>
              <CardDescription>
                The password reset link is invalid or has expired. 
                Please request a new reset link.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/forgot-password" title="Go to Forgot Password" className="w-full">
                <Button variant="default" className="w-full">
                  Request New Link
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
            <KeyRound className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">TradeX</h1>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>
              Create a new password that is at least 8 characters long
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResetPasswordForm token={token} />
          </CardContent>
          <CardFooter className="flex justify-center">
             <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
               Back to Login
             </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
