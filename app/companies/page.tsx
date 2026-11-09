import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { ExternalLink, Building2, MapPin, Mail, ArrowRight } from 'lucide-react';

export default async function CompaniesPage() {
  const currentUser = await getCurrentUser();
  const companies = db.getCompanies();
  const jobs = db.getJobs();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentRole={currentUser?.role} />

      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">
            Campus Hiring Partners
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold mt-2 tracking-tight">
            Recruiting Companies
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Leading conglomerates, product innovators, multinational consultancies, and high-growth technology start-ups that recruit from our institution.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => {
            const companyJobs = jobs.filter((j) => j.companyId === company.id);

            return (
              <div
                key={company.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                        company.approvalStatus === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {company.approvalStatus}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{company.name}</h3>
                  <span className="text-xs text-indigo-600 font-medium block mb-2">
                    {company.industry}
                  </span>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-3 leading-relaxed">
                    {company.description}
                  </p>

                  <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs text-slate-600 mb-4">
                    <div className="flex items-center">
                      <Mail className="w-3.5 h-3.5 mr-2 text-slate-400" />
                      <span>{company.hrEmail}</span>
                    </div>
                    <div className="flex items-center">
                      <Building2 className="w-3.5 h-3.5 mr-2 text-slate-400" />
                      <span>HR Lead: {company.hrName}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">
                    {companyJobs.length} Active {companyJobs.length === 1 ? 'Drive' : 'Drives'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <Link
                      href={`/student/opportunities`}
                      className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}

