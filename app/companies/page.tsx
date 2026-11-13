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
    <div className="flex flex-col min-h-screen bg-page">
      <Navbar currentRole={currentUser?.role} />

      <section className="border-b border-border-subtle bg-surface py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-semibold text-accent tracking-wider">
            Campus Hiring Partners
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-ink mt-2 tracking-tight">
            Recruiting Companies
          </h1>
          <p className="mt-4 text-ink-muted max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Leading conglomerates, product innovators, multinational consultancies, and high-growth technology start-ups that recruit from our institution.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => {
            const companyJobs = jobs.filter((j) => j.companyId === company.id);

            return (
              <div
                key={company.id}
                className="panel-card rounded-card p-6 flex flex-col justify-between hover:border-accent/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-control bg-page border border-border-subtle p-2 flex items-center justify-center">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <span
                      className={`text-[11px] font-medium px-2.5 py-0.5 rounded-control ${
                        company.approvalStatus === 'Approved'
                          ? 'bg-state-success-soft text-state-success border border-state-success/30'
                          : 'bg-state-warning-soft text-state-warning border border-state-warning/30'
                      }`}
                    >
                      {company.approvalStatus}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-ink tracking-tight">{company.name}</h3>
                  <span className="text-xs text-accent font-medium block mb-2">
                    {company.industry}
                  </span>
                  <p className="text-xs text-ink-muted mb-4 line-clamp-3 leading-relaxed">
                    {company.description}
                  </p>

                  <div className="border-t border-border-subtle pt-3 space-y-1.5 text-xs text-ink-muted mb-4">
                    <div className="flex items-center">
                      <Mail className="w-3.5 h-3.5 mr-2 text-ink-tertiary" />
                      <span>{company.hrEmail}</span>
                    </div>
                    <div className="flex items-center">
                      <Building2 className="w-3.5 h-3.5 mr-2 text-ink-tertiary" />
                      <span>HR Lead: {company.hrName}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
                  <span className="font-medium text-ink-secondary">
                    {companyJobs.length} Active {companyJobs.length === 1 ? 'Drive' : 'Drives'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-ink-tertiary hover:text-ink rounded-control hover:bg-page transition-colors"
                      title="Company Website"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <Link
                      href="/student/opportunities"
                      className="inline-flex items-center font-medium text-accent hover:text-accent-hover"
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
      </main>

      <Footer />
    </div>
  );
}
