'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { UserRole } from '@/lib/types';

interface NavbarProps {
  currentRole?: UserRole;
}

export default function Navbar({ currentRole = 'student' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Cell', href: '/about' },
    { name: 'Companies', href: '/companies' },
    { name: 'Statistics', href: '/statistics' },
    { name: 'Highlights', href: '/highlights' },
    { name: 'Contact', href: '/contact' },
  ];

  const portalHref =
    currentRole === 'student'
      ? '/student/dashboard'
      : currentRole === 'tpo'
      ? '/tpo/dashboard'
      : currentRole === 'recruiter'
      ? '/recruiter/dashboard'
      : '/admin/dashboard';

  const portalLabel =
    currentRole === 'student'
      ? 'Student Portal'
      : currentRole === 'tpo'
      ? 'TPO Portal'
      : currentRole === 'recruiter'
      ? 'Recruiter Portal'
      : 'Admin Portal';

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-9 z-40 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 tracking-tight block leading-tight">
                Campus PIS
              </span>
              <span className="text-[11px] text-slate-500 font-medium tracking-wide uppercase">
                Placement Information System
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href={portalHref}
              className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm hover:shadow transition-all"
            >
              <span>{portalLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              className="text-slate-600 hover:text-slate-900 text-sm font-medium px-3 py-2"
            >
              Login / Register
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
            <Link
              href={portalHref}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-indigo-600 text-white py-2.5 rounded-lg font-medium text-sm"
            >
              Enter {portalLabel}
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center border border-slate-300 text-slate-700 py-2 rounded-lg font-medium text-sm"
            >
              Login / Switch Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

