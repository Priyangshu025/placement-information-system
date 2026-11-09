import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import OpportunitiesClient from '@/components/student/OpportunitiesClient';

export default async function StudentOpportunitiesPage() {
  const currentUser = await getCurrentUser();
  const student = db.getStudentByUserId(currentUser?.id || 'user-student-1') || db.getStudents()[0];
  const jobs = db.getJobs().filter((j) => j.status === 'Open');
  const applications = db.getApplicationsByStudentId(student.id);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Campus Placement Opportunities</h2>
        <p className="text-xs text-slate-500 mt-1">
          Explore upcoming company drives with automated eligibility checking based on your academic records.
        </p>
      </div>

      <OpportunitiesClient
        student={student}
        jobs={jobs}
        existingApplications={applications}
      />
    </div>
  );
}

