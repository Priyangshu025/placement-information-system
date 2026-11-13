'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  FileText,
  Calendar,
  Award,
  BarChart2,
  Bell,
  CheckCircle2,
} from 'lucide-react';

interface TpoSidebarProps {
  unverifiedStudentCount: number;
  pendingCompanyCount: number;
}

export default function TpoSidebar({
  unverifiedStudentCount,
  pendingCompanyCount,
}: TpoSidebarProps) {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/tpo/dashboard', icon: LayoutDashboard },
    {
      name: 'Student Verification',
      href: '/tpo/students',
      icon: Users,
      badge: unverifiedStudentCount > 0 ? `${unverifiedStudentCount} Unverified` : undefined,
    },
    {
      name: 'Companies Onboarding',
      href: '/tpo/companies',
      icon: Building2,
      badge: pendingCompanyCount > 0 ? `${pendingCompanyCount} Pending` : undefined,
    },
    { name: 'Job Vacancies', href: '/tpo/jobs', icon: Briefcase },
    { name: 'All Applications', href: '/tpo/applications', icon: FileText },
    { name: 'Interview Scheduler', href: '/tpo/interviews', icon: Calendar },
    { name: 'Placement Records', href: '/tpo/placements', icon: Award },
    { name: 'Analytics & Reports', href: '/tpo/reports', icon: BarChart2 },
    { name: 'Announcements', href: '/tpo/notifications', icon: Bell },
  ];

  return (
    <aside className="w-full md:w-64 bg-surface border-r border-border-subtle shrink-0 flex flex-col justify-between">
      <div>
        {/* TPO Badge Header */}
        <div className="p-5 border-b border-border-subtle flex items-center space-x-3">
          <div className="w-9 h-9 rounded-control bg-accent-soft text-accent font-bold flex items-center justify-center text-xs">
            TPO
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-semibold text-ink truncate">Placement Cell</h3>
            <span className="text-[10px] uppercase font-semibold text-accent tracking-wider block">
              Officer Console
            </span>
          </div>
        </div>

        {/* Links */}
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
                    : 'text-ink-secondary hover:bg-page hover:text-ink'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-ink-tertiary'}`} />
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="bg-state-warning-soft text-state-warning text-[10px] font-medium px-2 py-0.5 rounded-control border border-state-warning/30">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-border-subtle text-[11px] text-ink-tertiary text-center">
        Campus PIS • TPO Directorate
      </div>
    </aside>
  );
}
