import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/shared/components/ui/card';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg space-y-8">
        <div className="flex flex-col items-center text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">TradeX</h1>
          <p className="text-sm text-muted-foreground italic">Join the Elite Trading Network</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription>
              Initialize your trading profile to start your journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground text-center w-full pt-4 border-t">
              Already have an account?{" "}
              <Link 
                href="/login" 
                className="font-semibold text-primary hover:underline underline-offset-4"
              >
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
