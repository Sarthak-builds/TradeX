'use client';

import * as React from 'react';
import { Mail, ArrowLeft, RefreshCcw, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/shared/components/ui/card';
import { useResendVerification, useVerifyEmail } from '@/features/auth/api/auth.api';

// Wrap the main content in a component so we can wrap it in Suspense if necessary later
function CheckEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  
  const resendMutation = useResendVerification();
  const verifyMutation = useVerifyEmail();
  const [code, setCode] = React.useState('');

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().length > 0) {
      verifyMutation.mutate(code.trim());
    }
  };

  const handleResend = () => {
    if (email) {
      resendMutation.mutate(email);
    } else {
      toast.error('Email address not found. Please log in or register again.');
    }
  };

  return (
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
            We&apos;ve sent a verification code to your email address. 
            Please enter the code below to activate your TradeX terminal.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleVerifySubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="code"
                type="text"
                placeholder="Enter 6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="text-center tracking-widest text-lg"
                maxLength={6}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={verifyMutation.isPending || code.length === 0}
              className="w-full"
            >
              {verifyMutation.isPending ? (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Verify Code
                </>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button
            onClick={handleResend}
            disabled={resendMutation.isPending}
            variant="outline"
            className="w-full"
          >
            {resendMutation.isPending ? (
              <>
                <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                Resending Code...
              </>
            ) : (
              'Resend Code'
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
  );
}

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <React.Suspense fallback={
        <div className="w-full max-w-md space-y-8 flex justify-center">
          <RefreshCcw className="w-8 h-8 text-primary animate-spin" />
        </div>
      }>
        <CheckEmailContent />
      </React.Suspense>
    </div>
  );
}
