import React from 'react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import RecruiterSidebar from '@/components/recruiter/RecruiterSidebar';

export default async function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const company = db.getCompanies().find((c) => c.recruiterUserId === currentUser?.id) || db.getCompanies()[1]; // Microsoft default
  const applications = db.getApplications().filter((a) => a.companyName === company.name);

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-37px)] bg-page">
      <RecruiterSidebar
        companyName={company.name}
        totalApplicants={applications.length}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-surface border-b border-border-subtle px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <h1 className="text-sm font-semibold text-ink">Corporate Recruiter Portal</h1>
            <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-control bg-accent-soft text-accent border border-accent/20">
              Verified Hiring Partner
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <span className="text-ink-muted hidden sm:inline">
              Company: <strong className="text-ink font-semibold">{company.name}</strong> • Lead: <strong className="text-ink font-semibold">{currentUser?.name || company.hrName}</strong>
            </span>
            <Link
              href="/"
              className="text-accent hover:text-accent-hover font-medium"
            >
              Public Site →
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
