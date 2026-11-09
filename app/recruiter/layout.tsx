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
    <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-37px)] bg-slate-100">
      <RecruiterSidebar
        companyName={company.name}
        totalApplicants={applications.length}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center space-x-3">
            <h1 className="text-lg font-bold text-slate-900">Corporate Recruiter Portal</h1>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              Verified Hiring Partner
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <span className="text-slate-500 hidden sm:inline">
              Company: <strong>{company.name}</strong> • Representative: <strong>{currentUser?.name || company.hrName}</strong>
            </span>
            <Link
              href="/"
              className="text-amber-600 hover:text-amber-800 font-semibold"
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

