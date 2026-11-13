import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import ResumeManagerClient from '@/components/student/ResumeManagerClient';

export default async function StudentResumePage() {
  const currentUser = await getCurrentUser();
  const student = db.getStudentByUserId(currentUser?.id || 'user-student-1') || db.getStudents()[0];
  const jobs = db.getJobs().filter((j) => j.status === 'Open');

  return (
    <div className="py-2">
      <ResumeManagerClient student={student} jobs={jobs} />
    </div>
  );
}
