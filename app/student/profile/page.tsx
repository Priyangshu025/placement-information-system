import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import ProfileClient from '@/components/student/ProfileClient';

export default async function StudentProfilePage() {
  const currentUser = await getCurrentUser();
  const student = db.getStudentByUserId(currentUser?.id || 'user-student-1') || db.getStudents()[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Student Profile & Academic Records</h2>
        <p className="text-xs text-slate-500 mt-1">
          Review verified institutional academic records, contact credentials, and placement qualification flags.
        </p>
      </div>

      <ProfileClient student={student} />
    </div>
  );
}

