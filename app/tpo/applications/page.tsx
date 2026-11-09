import React from 'react';
import { db } from '@/lib/db';
import TpoApplicationsClient from '@/components/tpo/TpoApplicationsClient';

export default async function TpoApplicationsPage() {
  const applications = db.getApplications();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Application Submissions & ATS Review</h2>
        <p className="text-xs text-slate-500 mt-1">
          Coordinate recruitment stages, advance student applicant statuses, and schedule campus interviews.
        </p>
      </div>

      <TpoApplicationsClient applications={applications} />
    </div>
  );
}

