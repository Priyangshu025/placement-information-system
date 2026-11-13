'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  Briefcase,
  Users,
  CheckSquare,
  Award,
} from 'lucide-react';

interface RecruiterSidebarProps {
  companyName: string;
  totalApplicants: number;
}

export default function RecruiterSidebar({
  companyName,
  totalApplicants,
}: RecruiterSidebarProps) {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/recruiter/dashboard', icon: LayoutDashboard },
    { name: 'Post & Manage Jobs', href: '/recruiter/job-postings', icon: Briefcase },
    {
      name: 'Applicant Review',
      href: '/recruiter/applicants',
      icon: Users,
      badge: totalApplicants > 0 ? `${totalApplicants} Apps` : undefined,
    },
    { name: 'ATS Shortlisting Pipeline', href: '/recruiter/shortlisting', icon: CheckSquare },
    { name: 'Selection Results', href: '/recruiter/recruitment-results', icon: Award },
    { name: 'Company Profile', href: '/recruiter/company-profile', icon: Building2 },
  ];

  return (
    <aside className="w-full md:w-64 bg-surface border-r border-border-subtle shrink-0 flex flex-col justify-between">
      <div>
        {/* Recruiter Badge Header */}
        <div className="p-5 border-b border-border-subtle flex items-center space-x-3">
          <div className="w-9 h-9 rounded-control bg-accent-soft text-accent font-bold flex items-center justify-center text-xs">
            <Building2 className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xs font-semibold text-ink truncate">{companyName}</h3>
            <span className="text-[10px] uppercase font-semibold text-accent tracking-wider block">
              Recruiter ATS Portal
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
                  <span className="bg-accent-soft text-accent text-[10px] font-medium px-2 py-0.5 rounded-control border border-accent/20">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-border-subtle text-[11px] text-ink-tertiary text-center">
        Campus PIS • Recruiter ATS
      </div>
    </aside>
  );
}
