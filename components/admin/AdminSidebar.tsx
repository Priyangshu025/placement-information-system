'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Building,
  Calendar,
  Settings,
  History,
  Shield,
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'User Management', href: '/admin/users', icon: Users },
    { name: 'Roles & Permissions', href: '/admin/roles', icon: ShieldCheck },
    { name: 'Academic Departments', href: '/admin/departments', icon: Building },
    { name: 'Academic Sessions', href: '/admin/academic-sessions', icon: Calendar },
    { name: 'System Settings', href: '/admin/system-settings', icon: Settings },
    { name: 'Audit & Security Logs', href: '/admin/audit-logs', icon: History },
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-900 text-white shrink-0 flex flex-col justify-between border-r border-slate-800">
      <div>
        {/* Admin Badge Header */}
        <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600 text-white font-bold flex items-center justify-center text-base shadow-md">
            <Shield className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-white truncate">Super Admin</h3>
            <span className="text-[10px] uppercase font-semibold text-rose-400 tracking-wider block">
              Governance Console
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
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-rose-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800 text-[11px] text-slate-500 text-center">
        Campus PIS • Governance & Audits
      </div>
    </aside>
  );
}

