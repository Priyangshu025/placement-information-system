import React from 'react';
import Link from 'next/link';
import { GraduationCap, Mail, Phone, MapPin, Shield, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight">Campus PIS</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A comprehensive campus recruitment lifecycle platform connecting students,
              placement officers, and corporate hiring partners.
            </p>
            <div className="flex items-center space-x-3 text-xs text-slate-400">
              <span className="inline-flex items-center text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
                Recruitment Season 2026-27 Active
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-indigo-400 transition-colors">About Placement Cell</Link></li>
              <li><Link href="/companies" className="hover:text-indigo-400 transition-colors">Recruiting Partners</Link></li>
              <li><Link href="/statistics" className="hover:text-indigo-400 transition-colors">Placement Statistics</Link></li>
              <li><Link href="/highlights" className="hover:text-indigo-400 transition-colors">Star Placements</Link></li>
              <li><Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact TPO</Link></li>
            </ul>
          </div>

          {/* Col 3: Role Portals */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/student/dashboard" className="hover:text-indigo-400 transition-colors">Student Portal</Link></li>
              <li><Link href="/tpo/dashboard" className="hover:text-indigo-400 transition-colors">TPO Officer Console</Link></li>
              <li><Link href="/recruiter/dashboard" className="hover:text-indigo-400 transition-colors">Recruiter ATS & Drives</Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-indigo-400 transition-colors">Administration Console</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">
              Training & Placement Cell
            </h4>
            <div className="flex items-start space-x-2 text-xs">
              <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <span>Campus Career Development Block, Level 3, Academic Boulevard</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <Mail className="w-4 h-4 text-slate-500 shrink-0" />
              <span>tpo@campus.edu</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <Phone className="w-4 h-4 text-slate-500 shrink-0" />
              <span>+91 80 2345 6789 / Ext 402</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Campus Placement Information System (PIS). All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-400">Institutional Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400">Terms of Recruitment</span>
            <span>•</span>
            <span className="hover:text-slate-400">Audited Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

