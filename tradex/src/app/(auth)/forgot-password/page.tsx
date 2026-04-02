'use client';

import * as React from 'react';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/shared/components/ui/card';
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">TradeX</h1>
          </div>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
              <CardDescription>
                We&apos;ve sent a password reset link to your email. 
                Please follow the instructions to recover your account.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/login" className="w-full">
                <Button variant="ghost" className="w-full text-muted-foreground">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
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
            <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
            <CardDescription>
              Enter your email address and we&apos;ll send you a link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ForgotPasswordForm onSuccess={() => setIsSubmitted(true)} />
          </CardContent>
          <CardFooter>
            <Link href="/login" className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors">
              Remember your password? Log in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
