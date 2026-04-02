'use client';

import * as React from 'react';
import { Mail, ArrowLeft, RefreshCcw, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/shared/components/ui/card';
import { useResendVerification } from '@/features/auth/api/auth.api';

export default function CheckEmailPage() {
  const resendMutation = useResendVerification();

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
            <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
            <CardDescription>
              We&apos;ve sent a verification link to your email address. 
              Please check your inbox to activate your TradeX terminal.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => resendMutation.mutate()}
              disabled={resendMutation.isPending}
              variant="default"
              className="w-full"
            >
              {resendMutation.isPending ? (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                  Resending Link...
                </>
              ) : (
                'Resend Verification Email'
              )}
            </Button>
          </CardContent>
          <CardFooter>
            <Link href="/login" className="w-full">
              <Button 
                variant="ghost" 
                className="w-full text-muted-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <p className="text-center text-[10px] text-muted-foreground font-mono tracking-widest uppercase">
          Terminal Status: <span className="text-amber-500 animate-pulse">Awaiting Verification</span>
        </p>
      </div>
    </div>
  );
}
