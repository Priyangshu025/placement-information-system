'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, Menu, X, ArrowUpRight } from 'lucide-react';
import { UserRole } from '@/lib/types';

interface NavbarProps {
  currentRole?: UserRole;
}

export default function Navbar({ currentRole = 'student' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Overview', href: '/' },
    { name: 'Placement Cell', href: '/about' },
    { name: 'Recruiters', href: '/companies' },
    { name: 'Analytics', href: '/statistics' },
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
      ? 'Student Workspace'
      : currentRole === 'tpo'
      ? 'TPO Console'
      : currentRole === 'recruiter'
      ? 'Recruiter ATS'
      : 'Admin Console';

  return (
    <nav className="bg-surface/95 backdrop-blur-md sticky top-9 z-40 border-b border-border-subtle">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Product Name */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-control bg-accent-soft text-accent flex items-center justify-center transition-colors group-hover:bg-accent group-hover:text-white">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[15px] font-semibold text-ink tracking-tight block leading-tight">
                Placement Information System
              </span>
              <span className="text-[11px] text-ink-tertiary font-normal tracking-normal">
                Campus recruitment workspace
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-control text-xs font-medium transition-colors ${
                    isActive
                      ? 'text-accent bg-accent-soft font-semibold'
                      : 'text-ink-secondary hover:text-ink hover:bg-surface-muted'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Action Area */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/login"
              className="text-xs font-medium text-ink-secondary hover:text-ink px-2.5 py-1.5 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href={portalHref}
              className="btn-primary space-x-1.5 text-xs !py-1.5 !px-3.5 !min-h-[38px]"
            >
              <span>{portalLabel}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-control text-ink-secondary hover:bg-surface-muted transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border-subtle bg-surface px-4 pt-2 pb-5 space-y-1.5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-control text-sm font-medium text-ink-secondary hover:bg-surface-muted hover:text-ink"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-border-subtle flex flex-col space-y-2">
            <Link
              href={portalHref}
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full text-center"
            >
              Go to {portalLabel}
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-secondary w-full text-center"
            >
              Sign In / Switch Persona
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
