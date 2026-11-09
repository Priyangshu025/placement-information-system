import React from 'react';
import { db } from '@/lib/db';
import StudentsClient from '@/components/tpo/StudentsClient';

export default async function TpoStudentsPage() {
  const students = db.getStudents();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Student Profiles & Verification</h2>
        <p className="text-xs text-slate-500 mt-1">
          Review, audit, and officially verify student CGPA, backlogs, and academic credentials for recruitment eligibility.
        </p>
      </div>

      <StudentsClient students={students} />
    </div>
  );
}

