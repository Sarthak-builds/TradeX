'use client';

import * as React from 'react';
import { useAuthStore } from '@/features/auth/store/authStore';
import { redirect } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, user } = useAuthStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent flash of unauthenticated content
  if (!mounted) return null;

  if (!isAuthenticated || !user) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar or Navigation placeholder */}
      <aside className="hidden border-r bg-muted/40 md:block md:w-64">
        {/* Navigation content will go here */}
      </aside>
      
      <main className="flex-1 flex flex-col">
        {/* Placeholder for future DemoBanner and Header */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-6">
          <h1 className="text-lg font-semibold tracking-tight">TradeX Terminal</h1>
        </header>
        
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
      
      {/* Placeholder for future WalkthroughModal */}
    </div>
  );
}
