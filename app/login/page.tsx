'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { loginWithEmail, switchDemoUser } from '@/app/actions/pis-actions';
import { UserRole } from '@/lib/types';
import { GraduationCap, Briefcase, Building2, ShieldCheck, ArrowRight, Lock, Mail, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handlePersonaLogin = (role: UserRole) => {
    setError('');
    startTransition(async () => {
      await switchDemoUser(role);
      if (role === 'student') router.push('/student/dashboard');
      else if (role === 'tpo') router.push('/tpo/dashboard');
      else if (role === 'recruiter') router.push('/recruiter/dashboard');
      else if (role === 'admin') router.push('/admin/dashboard');
    });
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    startTransition(async () => {
      const res = await loginWithEmail(email);
      if (!res.success) {
        setError(res.error || 'Login failed');
      } else {
        const user = res.user!;
        if (user.role === 'student') router.push('/student/dashboard');
        else if (user.role === 'tpo') router.push('/tpo/dashboard');
        else if (user.role === 'recruiter') router.push('/recruiter/dashboard');
        else router.push('/admin/dashboard');
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-page">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 rounded-feature border border-border-subtle bg-surface shadow-xs overflow-hidden">
          {/* Form Side */}
          <div className="p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 rounded-control bg-accent text-white flex items-center justify-center font-bold">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span className="font-semibold text-sm tracking-tight text-ink">Campus PIS</span>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-ink">Sign in to your account</h2>
              <p className="mt-1 text-xs text-ink-muted">
                Enter your institutional or recruiter credentials to access your portal.
              </p>

              {error && (
                <div className="mt-4 p-3 rounded-control bg-state-danger-soft border border-state-danger/30 text-state-danger text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleEmailLogin} className="mt-6 space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-ink-secondary mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-ink-tertiary" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. priya.sharma@campus.edu"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-control border border-border-subtle bg-page/50 text-ink placeholder:text-ink-tertiary focus:outline-none focus:border-accent focus:bg-surface text-xs transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-ink-secondary mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-ink-tertiary" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-control border border-border-subtle bg-page/50 text-ink placeholder:text-ink-tertiary focus:outline-none focus:border-accent focus:bg-surface text-xs transition-colors"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <label className="flex items-center text-ink-muted cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-border-subtle accent-[#245B4A] mr-1.5" />
                    Remember session
                  </label>
                  <a href="#" className="font-medium text-accent hover:underline">Forgot password?</a>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-primary w-full py-2.5 px-4 rounded-control text-xs flex items-center justify-center space-x-2"
                >
                  <span>{isPending ? 'Authenticating...' : 'Sign In'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-border-subtle text-center text-xs text-ink-muted">
              Don't have an account?{' '}
              <Link href="/register" className="font-semibold text-accent hover:underline">
                Create new registration
              </Link>
            </div>
          </div>

          {/* Quick Demo Personas Side */}
          <div className="bg-surface-muted p-8 sm:p-10 flex flex-col justify-between border-t md:border-t-0 md:border-l border-border-subtle">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                Instant Demo Access
              </span>
              <h3 className="text-xl font-bold text-ink mt-1 mb-1 tracking-tight">1-Click Role Login</h3>
              <p className="text-xs text-ink-muted mb-5 leading-relaxed">
                Click any role persona below to instantly enter the respective portal with pre-loaded mock data and active workflow state.
              </p>

              <div className="space-y-2.5">
                <button
                  onClick={() => handlePersonaLogin('student')}
                  disabled={isPending}
                  className="w-full p-3 rounded-control bg-surface hover:bg-page border border-border-subtle flex items-center space-x-3 text-left transition-all hover:border-accent/40"
                >
                  <div className="w-8 h-8 rounded-control bg-accent-soft text-accent flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-ink">Student Persona</div>
                    <div className="text-[11px] text-ink-muted truncate">Priya Sharma • CSE • 8.85 CGPA</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-ink-tertiary" />
                </button>

                <button
                  onClick={() => handlePersonaLogin('tpo')}
                  disabled={isPending}
                  className="w-full p-3 rounded-control bg-surface hover:bg-page border border-border-subtle flex items-center space-x-3 text-left transition-all hover:border-accent/40"
                >
                  <div className="w-8 h-8 rounded-control bg-accent-soft text-accent flex items-center justify-center shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-ink">TPO Placement Officer</div>
                    <div className="text-[11px] text-ink-muted truncate">Dr. K. Ramanathan • Head of Placement</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-ink-tertiary" />
                </button>

                <button
                  onClick={() => handlePersonaLogin('recruiter')}
                  disabled={isPending}
                  className="w-full p-3 rounded-control bg-surface hover:bg-page border border-border-subtle flex items-center space-x-3 text-left transition-all hover:border-accent/40"
                >
                  <div className="w-8 h-8 rounded-control bg-accent-soft text-accent flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-ink">Recruiter (Microsoft)</div>
                    <div className="text-[11px] text-ink-muted truncate">Vikram Seth • Talent Acquisition Lead</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-ink-tertiary" />
                </button>

                <button
                  onClick={() => handlePersonaLogin('admin')}
                  disabled={isPending}
                  className="w-full p-3 rounded-control bg-surface hover:bg-page border border-border-subtle flex items-center space-x-3 text-left transition-all hover:border-accent/40"
                >
                  <div className="w-8 h-8 rounded-control bg-accent-soft text-accent flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-ink">Super Administrator</div>
                    <div className="text-[11px] text-ink-muted truncate">Admin Console • Security & Audits</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-ink-tertiary" />
                </button>
              </div>
            </div>

            <div className="text-[11px] text-ink-tertiary pt-4 border-t border-border-subtle mt-4">
              Role permissions and session tokens are strictly validated on both client and server actions.
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
