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
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Form Side */}
          <div className="p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="font-bold text-base tracking-tight text-slate-900">Campus PIS</span>
              </div>

              <h2 className="text-2xl font-extrabold text-slate-900">Sign in to your account</h2>
              <p className="mt-1 text-xs text-slate-500">
                Enter your institutional or recruiter credentials to access your portal.
              </p>

              {error && (
                <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleEmailLogin} className="mt-6 space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. priya.sharma@campus.edu"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <label className="flex items-center text-slate-600">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600 mr-1.5" />
                    Remember session
                  </label>
                  <a href="#" className="font-semibold text-indigo-600 hover:underline">Forgot password?</a>
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <span>{isPending ? 'Authenticating...' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
              Don't have an account?{' '}
              <Link href="/register" className="font-bold text-indigo-600 hover:underline">
                Create new registration
              </Link>
            </div>
          </div>

          {/* Quick Demo Personas Side */}
          <div className="bg-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                Instant Demo Access
              </span>
              <h3 className="text-xl font-bold mt-1 mb-2">1-Click Role Login</h3>
              <p className="text-xs text-slate-400 mb-6">
                Click any role persona below to instantly enter the respective portal with pre-loaded mock data and active workflow state.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => handlePersonaLogin('student')}
                  disabled={isPending}
                  className="w-full p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center space-x-3 text-left transition-all hover:border-blue-500"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white">Student Persona</div>
                    <div className="text-[11px] text-slate-400 truncate">Priya Sharma • CSE • 8.85 CGPA</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => handlePersonaLogin('tpo')}
                  disabled={isPending}
                  className="w-full p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center space-x-3 text-left transition-all hover:border-purple-500"
                >
                  <div className="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white">TPO Placement Officer</div>
                    <div className="text-[11px] text-slate-400 truncate">Dr. K. Ramanathan • Head of Placement</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => handlePersonaLogin('recruiter')}
                  disabled={isPending}
                  className="w-full p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center space-x-3 text-left transition-all hover:border-amber-500"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white">Recruiter (Microsoft)</div>
                    <div className="text-[11px] text-slate-400 truncate">Vikram Seth • Talent Acquisition Lead</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => handlePersonaLogin('admin')}
                  disabled={isPending}
                  className="w-full p-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 flex items-center space-x-3 text-left transition-all hover:border-rose-500"
                >
                  <div className="w-9 h-9 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white">Super Administrator</div>
                    <div className="text-[11px] text-slate-400 truncate">Admin Console • Security & Audits</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 pt-4 border-t border-slate-800">
              Role permissions and session tokens are strictly validated on both client and server actions.
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

