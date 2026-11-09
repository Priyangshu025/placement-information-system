import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import JobPostingsClient from '@/components/recruiter/JobPostingsClient';

export default async function RecruiterJobPostingsPage() {
  const currentUser = await getCurrentUser();
  const company = db.getCompanies().find((c) => c.recruiterUserId === currentUser?.id) || db.getCompanies()[1];
  const jobs = db.getJobs().filter((j) => j.companyId === company.id || j.companyName === company.name);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Campus Job Postings & Criteria</h2>
        <p className="text-xs text-slate-500 mt-1">
          Define role openings, compensation packages, and institutional eligibility thresholds.
        </p>
      </div>

      <JobPostingsClient jobs={jobs} />
    </div>
  );
}

