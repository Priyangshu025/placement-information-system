import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import ApplicantsClient from '@/components/recruiter/ApplicantsClient';

export default async function RecruiterApplicantsPage() {
  const currentUser = await getCurrentUser();
  const company = db.getCompanies().find((c) => c.recruiterUserId === currentUser?.id) || db.getCompanies()[1];
  const applications = db.getApplications().filter((a) => a.companyName === company.name);
  const students = db.getStudents();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Applicant Review & Skills Scoring</h2>
        <p className="text-xs text-slate-500 mt-1">
          Inspect candidate submissions, review resume skill matches, and trigger interview progressions.
        </p>
      </div>

      <ApplicantsClient applications={applications} students={students} />
    </div>
  );
}

