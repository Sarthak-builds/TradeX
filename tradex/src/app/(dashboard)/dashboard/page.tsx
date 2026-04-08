'use client';

import * as React from 'react';
import { useAuthStore } from '@/features/auth/store/authStore';

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back, {user?.name || 'User'}. Here's your portfolio overview.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Statistics or Quick Actions will go here */}
        <div className="rounded-xl border bg-card p-6 text-card-foreground shadow">
          <div className="p-0">
            <p className="text-sm font-medium text-muted-foreground">Account Balance</p>
            <h3 className="text-2xl font-bold">$12,450.00</h3>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6 text-card-foreground shadow">
          <div className="p-0">
            <p className="text-sm font-medium text-muted-foreground">Active Positions</p>
            <h3 className="text-2xl font-bold">12</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
