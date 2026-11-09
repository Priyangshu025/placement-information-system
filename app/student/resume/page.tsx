import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import ResumeManagerClient from '@/components/student/ResumeManagerClient';

export default async function StudentResumePage() {
  const currentUser = await getCurrentUser();
  const student = db.getStudentByUserId(currentUser?.id || 'user-student-1') || db.getStudents()[0];
  const jobs = db.getJobs().filter((j) => j.status === 'Open');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Resume & Skill Analyzer</h2>
        <p className="text-xs text-slate-500 mt-1">
          Manage your uploaded CV, review automated skill extraction, and benchmark your fit against company vacancies.
        </p>
      </div>

      <ResumeManagerClient student={student} jobs={jobs} />
    </div>
  );
}

