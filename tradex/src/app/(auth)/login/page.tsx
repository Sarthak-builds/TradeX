import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { LoginForm } from '@/features/auth/components/LoginForm';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/shared/components/ui/card';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">TradeX</h1>
          <p className="text-sm text-muted-foreground italic">Next-Gen Asset Exchange</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <LoginForm />
            <div className="flex justify-start">
              <Link 
                href="/forgot-password" 
                className="text-xs text-muted-foreground hover:text-primary transition-colors italic"
              >
                Forgot your password?
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-muted-foreground text-center w-full pt-4 border-t">
              Don&apos;t have an account?{" "}
              <Link 
                href="/signup" 
                className="font-semibold text-primary hover:underline underline-offset-4"
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Essential Market Data - Kept minimal */}
        <div className="flex justify-center gap-8 px-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
           <div className="flex flex-col items-center">
             <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">BTC</span>
             <span className="text-xs font-mono font-medium">67,432</span>
           </div>
           <div className="flex flex-col items-center">
             <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">ETH</span>
             <span className="text-xs font-mono font-medium">3,892</span>
           </div>
           <div className="flex flex-col items-center">
             <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">SOL</span>
             <span className="text-xs font-mono font-medium">142</span>
           </div>
        </div>
      </div>
    </div>
  );
}
