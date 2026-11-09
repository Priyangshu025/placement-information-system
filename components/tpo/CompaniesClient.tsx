'use client';

import React, { useState, useTransition } from 'react';
import { Company } from '@/lib/types';
import { updateCompanyStatusAction } from '@/app/actions/pis-actions';
import {
  Building2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Mail,
  Phone,
  ShieldCheck,
  Search,
  Plus
} from 'lucide-react';

interface CompaniesClientProps {
  companies: Company[];
}

export default function CompaniesClient({ companies }: CompaniesClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();

  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.hrName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateStatus = (companyId: string, status: 'Approved' | 'Rejected') => {
    startTransition(async () => {
      await updateCompanyStatusAction(companyId, status);
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search companies by name or industry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <span className="text-xs font-semibold text-slate-500">
          Total Employers: {companies.length} ({companies.filter((c) => c.approvalStatus === 'Approved').length} Approved)
        </span>
      </div>

      {/* Grid of Company Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 p-1 flex items-center justify-center">
                  <img src={c.logo} alt={c.name} className="max-h-full max-w-full object-contain" />
                </div>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    c.approvalStatus === 'Approved'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : c.approvalStatus === 'Pending'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200 animate-pulse'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  {c.approvalStatus}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900">{c.name}</h3>
              <p className="text-xs font-semibold text-purple-600 mb-2">{c.industry}</p>
              <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                {c.description}
              </p>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1.5 text-slate-600 mb-4">
                <div className="flex items-center">
                  <Building2 className="w-3.5 h-3.5 mr-2 text-slate-400" />
                  <span>HR Lead: {c.hrName}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-3.5 h-3.5 mr-2 text-slate-400" />
                  <span>{c.hrEmail}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-3.5 h-3.5 mr-2 text-slate-400" />
                  <span>{c.hrPhone}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <a
                href={c.website}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-slate-600 flex items-center"
              >
                <span>Website</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>

              {c.approvalStatus === 'Pending' ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleUpdateStatus(c.id, 'Rejected')}
                    disabled={isPending}
                    className="px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(c.id, 'Approved')}
                    disabled={isPending}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm"
                  >
                    Approve
                  </button>
                </div>
              ) : (
                <span className="text-[11px] text-slate-400">
                  Approved on {new Date(c.registeredAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

