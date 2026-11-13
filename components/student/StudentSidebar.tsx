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
    { name: 'Resume & Extractor', href: '/student/resume', icon: Sparkles },
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
    <aside className="w-full md:w-64 bg-surface border-r border-border-subtle shrink-0 flex flex-col justify-between">
      <div>
        {/* Student card header */}
        <div className="p-5 border-b border-border-subtle flex items-center space-x-3">
          <div className="w-10 h-10 rounded-control bg-accent-soft text-accent font-semibold flex items-center justify-center text-sm">
            {student.fullName[0]}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-semibold text-ink truncate">
              {student.fullName}
            </h3>
            <p className="text-[11px] text-ink-tertiary truncate font-mono">{student.regNumber}</p>
            <span className="text-[10px] font-medium text-accent block">
              {student.departmentCode}
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center justify-between px-3 py-2 rounded-control text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-accent-soft text-accent font-semibold'
                    : 'text-ink-secondary hover:bg-surface-muted hover:text-ink'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-ink-tertiary'}`} />
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="bg-accent text-white text-[10px] font-semibold px-1.5 py-0.2 rounded-control">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-border-subtle text-[11px] text-ink-tertiary text-center">
        Campus PIS • Student Workspace
      </div>
    </aside>
  );
}
