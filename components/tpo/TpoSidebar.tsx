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
    <aside className="w-full md:w-64 bg-slate-900 text-white shrink-0 flex flex-col justify-between border-r border-slate-800">
      <div>
        {/* TPO Badge Header */}
        <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-bold flex items-center justify-center text-base shadow-md">
            TPO
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-white truncate">Placement Cell</h3>
            <span className="text-[10px] uppercase font-semibold text-purple-400 tracking-wider block">
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
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-purple-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500 text-center">
        Campus PIS • TPO Directorate
      </div>
    </aside>
  );
}

