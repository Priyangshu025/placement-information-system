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
      <div className="space-y-1">
        <span className="text-xs font-semibold tracking-wider text-accent uppercase">
          Verified Campus Drives
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
          Campus Placement Opportunities
        </h1>
        <p className="text-xs sm:text-sm text-ink-muted">
          Explore upcoming company drives with automated institutional eligibility criteria and advisory skill benchmarks.
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
