'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { StudentProfile } from '@/lib/types';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  UserCheck,
  Award,
  Bell,
  Settings,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

interface StudentSidebarProps {
  student: StudentProfile;
  unreadNotifCount: number;
}

export default function StudentSidebar({
  student,
  unreadNotifCount,
}: StudentSidebarProps) {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
    { name: 'Opportunities', href: '/student/opportunities', icon: Briefcase },
    { name: 'My Applications', href: '/student/applications', icon: FileText },
    { name: 'Resume & Matcher', href: '/student/resume', icon: Sparkles },
    { name: 'Profile & Academics', href: '/student/profile', icon: UserCheck },
    { name: 'Placement History', href: '/student/placement-history', icon: Award },
    {
      name: 'Notifications',
      href: '/student/notifications',
      icon: Bell,
      badge: unreadNotifCount > 0 ? unreadNotifCount : undefined,
    },
    { name: 'Settings', href: '/student/settings', icon: Settings },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200 shrink-0 flex flex-col justify-between">
      <div>
        {/* Student card header */}
        <div className="p-6 border-b border-slate-100 flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-500 text-white font-bold flex items-center justify-center text-lg shadow-sm">
            {student.fullName[0]}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-slate-900 truncate">
              {student.fullName}
            </h3>
            <p className="text-xs text-slate-500 truncate">{student.regNumber}</p>
            <span className="text-[10px] font-semibold text-indigo-600 block">
              {student.departmentName}
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="p-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100 text-xs text-slate-400 text-center">
        Campus PIS • Student v1.0
      </div>
    </aside>
  );
}

