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
    <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-37px)] bg-slate-100">
      <TpoSidebar
        unverifiedStudentCount={unverifiedStudents}
        pendingCompanyCount={pendingCompanies}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center space-x-3">
            <h1 className="text-lg font-bold text-slate-900">
              Training & Placement Officer (TPO) Console
            </h1>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              Official Administration
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <span className="text-slate-500 hidden sm:inline">
              Logged in as: <strong>{currentUser?.name || 'Dr. K. Ramanathan (TPO)'}</strong>
            </span>
            <Link
              href="/"
              className="text-purple-600 hover:text-purple-800 font-semibold"
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

