import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import PlacementHistoryClient from '@/components/student/PlacementHistoryClient';

export default async function StudentPlacementHistoryPage() {
  const currentUser = await getCurrentUser();
  const student = db.getStudentByUserId(currentUser?.id || 'user-student-1') || db.getStudents()[0];
  const placements = db.getPlacements();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Placement History & Offer Records</h2>
        <p className="text-xs text-slate-500 mt-1">
          Official institutional records of campus selections, confirmed CTC compensation, and downloadable offer letters.
        </p>
      </div>

      <PlacementHistoryClient student={student} placements={placements} />
    </div>
  );
}

