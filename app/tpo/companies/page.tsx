import React from 'react';
import { db } from '@/lib/db';
import CompaniesClient from '@/components/tpo/CompaniesClient';

export default async function TpoCompaniesPage() {
  const companies = db.getCompanies();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Company Onboarding & Verification</h2>
        <p className="text-xs text-slate-500 mt-1">
          Review corporate recruiter onboarding applications, verify HR contacts, and grant campus drive access.
        </p>
      </div>

      <CompaniesClient companies={companies} />
    </div>
  );
}

