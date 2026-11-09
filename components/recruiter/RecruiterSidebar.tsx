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
  PlusCircle,
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
    <aside className="w-full md:w-64 bg-slate-900 text-white shrink-0 flex flex-col justify-between border-r border-slate-800">
      <div>
        {/* Recruiter Badge Header */}
        <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white font-bold flex items-center justify-center text-base shadow-md">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-white truncate">{companyName}</h3>
            <span className="text-[10px] uppercase font-semibold text-amber-400 tracking-wider block">
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
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-600 text-white font-semibold shadow-sm'
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
        Campus PIS • Recruiter ATS v1.0
      </div>
    </aside>
  );
}

