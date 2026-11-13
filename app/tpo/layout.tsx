import React from 'react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import TpoSidebar from '@/components/tpo/TpoSidebar';

export default async function TpoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const students = db.getStudents();
  const companies = db.getCompanies();

  const unverifiedStudents = students.filter((s) => !s.isVerified).length;
  const pendingCompanies = companies.filter((c) => c.approvalStatus === 'Pending').length;

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-37px)] bg-page">
      <TpoSidebar
        unverifiedStudentCount={unverifiedStudents}
        pendingCompanyCount={pendingCompanies}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-surface border-b border-border-subtle px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <h1 className="text-sm font-semibold text-ink">
              Training & Placement Officer (TPO) Console
            </h1>
            <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-control bg-accent-soft text-accent border border-accent/20">
              Official Administration
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <span className="text-ink-muted hidden sm:inline">
              Officer: <strong className="text-ink font-semibold">{currentUser?.name || 'Dr. K. Ramanathan (TPO)'}</strong>
            </span>
            <Link
              href="/"
              className="text-accent hover:text-accent-hover font-medium"
            >
              Public Portal →
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
