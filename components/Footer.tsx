import React from 'react';
import Link from 'next/link';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border-subtle text-ink-secondary text-xs mt-auto">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Product Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2.5 text-ink">
              <div className="w-7 h-7 rounded-control bg-accent-soft text-accent flex items-center justify-center font-bold">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-semibold text-sm tracking-tight">Placement Information System</span>
            </div>
            <p className="text-xs text-ink-secondary leading-relaxed">
              A calm, structured workspace for managing campus recruitment—from student profile verification to automated eligibility checking and placement analytics.
            </p>
            <div className="text-[11px] text-accent font-medium pt-1">
              • Academic Cycle 2026–2027 Active
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-ink font-semibold mb-3 text-[11px] uppercase tracking-wider">
              Workspace
            </h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-ink transition-colors">Overview</Link></li>
              <li><Link href="/about" className="hover:text-ink transition-colors">Placement Cell & Leadership</Link></li>
              <li><Link href="/companies" className="hover:text-ink transition-colors">Recruiting Partners</Link></li>
              <li><Link href="/statistics" className="hover:text-ink transition-colors">Placement Statistics</Link></li>
              <li><Link href="/highlights" className="hover:text-ink transition-colors">Star Placements</Link></li>
              <li><Link href="/contact" className="hover:text-ink transition-colors">Contact Office</Link></li>
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h4 className="text-ink font-semibold mb-3 text-[11px] uppercase tracking-wider">
              Portals
            </h4>
            <ul className="space-y-2">
              <li><Link href="/student/dashboard" className="hover:text-ink transition-colors">Student Workspace</Link></li>
              <li><Link href="/student/resume" className="hover:text-ink transition-colors">Resume & Skills Matcher</Link></li>
              <li><Link href="/tpo/dashboard" className="hover:text-ink transition-colors">TPO Officer Console</Link></li>
              <li><Link href="/recruiter/dashboard" className="hover:text-ink transition-colors">Recruiter ATS</Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-ink transition-colors">Admin Governance</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-2.5">
            <h4 className="text-ink font-semibold mb-3 text-[11px] uppercase tracking-wider">
              Placement Cell
            </h4>
            <div className="flex items-start space-x-2 text-ink-secondary">
              <MapPin className="w-4 h-4 text-ink-tertiary shrink-0 mt-0.5" />
              <span>Career Development Block, Level 3, Academic Boulevard</span>
            </div>
            <div className="flex items-center space-x-2 text-ink-secondary">
              <Mail className="w-4 h-4 text-ink-tertiary shrink-0" />
              <span>tpo@campus.edu</span>
            </div>
            <div className="flex items-center space-x-2 text-ink-secondary">
              <Phone className="w-4 h-4 text-ink-tertiary shrink-0" />
              <span>+91 80 2345 6789 / Ext 402</span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border-subtle text-[11px] text-ink-tertiary flex flex-col md:flex-row justify-between items-center gap-3">
          <p>© 2026 Campus Placement Information System. Built with quiet confidence and clarity.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-ink cursor-pointer">Data Privacy</span>
            <span>•</span>
            <span className="hover:text-ink cursor-pointer">Recruitment Charter</span>
            <span>•</span>
            <span className="hover:text-ink cursor-pointer">Security Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
