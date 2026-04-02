import * as React from 'react';
import { LoginForm } from '@/features/auth/components/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="relative min-h-screen bg-[#020617] flex items-center justify-center p-6 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] animate-pulse pointer-events-none delay-1000" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="glass p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-3xl bg-slate-900/40">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black gradient-text tracking-tight mb-2">TradeX</h1>
            <p className="text-slate-400 font-medium tracking-wide italic">Next-Gen Asset Exchange</p>
          </div>

          <div className="mt-8 space-y-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h2>
            <p className="text-sm text-slate-400">Enter your credentials to access your terminal.</p>
            
            <LoginForm />

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-sm text-slate-500 font-medium italic">New to the terminal?</span>
              <Link 
                href="/signup" 
                className="text-sm font-bold text-secondary hover:text-secondary/80 transition-colors tracking-wide underline decoration-secondary/30 underline-offset-4"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Stats Mockup */}
        <div className="mt-8 flex justify-between gap-4 px-4 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">BTC / USDT</span>
            <span className="text-xs text-emerald-400 font-mono font-bold tracking-tighter">67,432.10 (+2.4%)</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">ETH / USDT</span>
            <span className="text-xs text-emerald-400 font-mono font-bold tracking-tighter">3,892.45 (+1.8%)</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">SOL / USDT</span>
            <span className="text-xs text-rose-400 font-mono font-bold tracking-tighter">142.12 (-0.5%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
