'use client';

import React, { useTransition } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { switchDemoUser, resetDatabaseToDefault } from '@/app/actions/pis-actions';
import { UserRole } from '@/lib/types';
import { GraduationCap, Briefcase, Building2, ShieldCheck, RefreshCw, ExternalLink } from 'lucide-react';

interface DemoRoleBarProps {
  currentRole: UserRole;
  currentUserName: string;
}

export default function DemoRoleBar({ currentRole, currentUserName }: DemoRoleBarProps) {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const handleRoleSwitch = (role: UserRole) => {
    startTransition(async () => {
      await switchDemoUser(role);
      // Auto-navigate to appropriate portal dashboard if currently inside a portal
      if (role === 'student') router.push('/student/dashboard');
      else if (role === 'tpo') router.push('/tpo/dashboard');
      else if (role === 'recruiter') router.push('/recruiter/dashboard');
      else if (role === 'admin') router.push('/admin/dashboard');
    });
  };

  const handleResetData = () => {
    if (confirm('Reset all demo data (jobs, applications, students) to fresh initial state?')) {
      startTransition(async () => {
        await resetDatabaseToDefault();
        router.refresh();
      });
    }
  };

  return (
    <div className="bg-slate-900 text-white text-xs py-2 px-4 sticky top-0 z-50 shadow-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-500 text-white tracking-wider uppercase">
            PIS Live Demo Mode
          </span>
          <span className="text-slate-300 hidden sm:inline">Active Persona:</span>
          <span className="font-semibold text-emerald-400 capitalize">{currentRole}</span>
          <span className="text-slate-400 text-[11px]">({currentUserName})</span>
        </div>

        {/* Switcher Buttons */}
        <div className="flex items-center flex-wrap gap-1.5">
          <span className="text-slate-400 mr-1 hidden md:inline">Quick Role Switch:</span>

          <button
            onClick={() => handleRoleSwitch('student')}
            disabled={isPending}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded transition-colors ${
              currentRole === 'student'
                ? 'bg-blue-600 text-white font-medium shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-blue-300" />
            <span>Student</span>
          </button>

          <button
            onClick={() => handleRoleSwitch('tpo')}
            disabled={isPending}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded transition-colors ${
              currentRole === 'tpo'
                ? 'bg-purple-600 text-white font-medium shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-purple-300" />
            <span>TPO Officer</span>
          </button>

          <button
            onClick={() => handleRoleSwitch('recruiter')}
            disabled={isPending}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded transition-colors ${
              currentRole === 'recruiter'
                ? 'bg-amber-600 text-white font-medium shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-amber-300" />
            <span>Recruiter</span>
          </button>

          <button
            onClick={() => handleRoleSwitch('admin')}
            disabled={isPending}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded transition-colors ${
              currentRole === 'admin'
                ? 'bg-rose-600 text-white font-medium shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-rose-300" />
            <span>Super Admin</span>
          </button>

          <button
            onClick={handleResetData}
            title="Reset to initial seed state"
            className="flex items-center space-x-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 ml-2"
          >
            <RefreshCw className={`w-3 h-3 text-slate-400 ${isPending ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Reset Seed</span>
          </button>
        </div>
      </div>
    </div>
  );
}

