'use client';

import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { switchDemoUser, resetDatabaseToDefault } from '@/app/actions/pis-actions';
import { UserRole } from '@/lib/types';
import { GraduationCap, Briefcase, Building2, ShieldCheck, RefreshCw } from 'lucide-react';

interface DemoRoleBarProps {
  currentRole: UserRole;
  currentUserName: string;
}

export default function DemoRoleBar({ currentRole, currentUserName }: DemoRoleBarProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleRoleSwitch = (role: UserRole) => {
    startTransition(async () => {
      await switchDemoUser(role);
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
    <div className="bg-[#171918] text-[#F7F7F5] text-[11px] py-1.5 px-4 sticky top-0 z-50 border-b border-[#2A2E2C]">
      <div className="max-w-content mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-control text-[10px] font-medium bg-[#245B4A] text-white">
            Workspace Mode
          </span>
          <span className="text-[#858B87] hidden sm:inline">Active Persona:</span>
          <span className="font-semibold text-white capitalize">{currentRole}</span>
          <span className="text-[#858B87]">({currentUserName})</span>
        </div>

        {/* Persona Switchers */}
        <div className="flex items-center flex-wrap gap-1">
          <span className="text-[#858B87] mr-1.5 hidden md:inline">Switch Role:</span>

          <button
            onClick={() => handleRoleSwitch('student')}
            disabled={isPending}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-control transition-colors ${
              currentRole === 'student'
                ? 'bg-white text-[#171918] font-semibold'
                : 'text-[#C8CCC9] hover:bg-[#2A2E2C]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student</span>
          </button>

          <button
            onClick={() => handleRoleSwitch('tpo')}
            disabled={isPending}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-control transition-colors ${
              currentRole === 'tpo'
                ? 'bg-white text-[#171918] font-semibold'
                : 'text-[#C8CCC9] hover:bg-[#2A2E2C]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>TPO</span>
          </button>

          <button
            onClick={() => handleRoleSwitch('recruiter')}
            disabled={isPending}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-control transition-colors ${
              currentRole === 'recruiter'
                ? 'bg-white text-[#171918] font-semibold'
                : 'text-[#C8CCC9] hover:bg-[#2A2E2C]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Recruiter</span>
          </button>

          <button
            onClick={() => handleRoleSwitch('admin')}
            disabled={isPending}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-control transition-colors ${
              currentRole === 'admin'
                ? 'bg-white text-[#171918] font-semibold'
                : 'text-[#C8CCC9] hover:bg-[#2A2E2C]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>

          <button
            onClick={handleResetData}
            title="Reset to initial seed data"
            className="flex items-center space-x-1 px-2 py-1 rounded-control text-[#858B87] hover:text-white hover:bg-[#2A2E2C] ml-1.5 transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${isPending ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
