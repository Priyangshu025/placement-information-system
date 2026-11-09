import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import KanbanClient from '@/components/recruiter/KanbanClient';

export default async function RecruiterShortlistingPage() {
  const currentUser = await getCurrentUser();
  const company = db.getCompanies().find((c) => c.recruiterUserId === currentUser?.id) || db.getCompanies()[1];
  const applications = db.getApplications().filter((a) => a.companyName === company.name);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">ATS Candidate Shortlisting Board</h2>
        <p className="text-xs text-slate-500 mt-1">
          Visual Kanban pipeline: track and advance candidates through assessments, interviews, and final offers.
        </p>
      </div>

      <KanbanClient applications={applications} />
    </div>
  );
}

