import React from 'react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import StudentSidebar from '@/components/student/StudentSidebar';

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const student = db.getStudentByUserId(currentUser?.id || 'user-student-1') || db.getStudents()[0];
  const notifications = db.getNotificationsByUserId(currentUser?.id || 'user-student-1');
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-37px)] bg-slate-50">
      <StudentSidebar
        student={student}
        unreadNotifCount={unreadCount}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <h1 className="text-lg font-bold text-slate-900">Student Portal</h1>
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                student.isVerified
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              {student.isVerified ? '✓ Academic Verified' : '⚠ Verification Pending'}
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <div className="hidden sm:flex items-center space-x-3 bg-slate-100 py-1.5 px-3 rounded-lg text-slate-700">
              <span>CGPA: <strong>{student.cgpa.toFixed(2)}</strong></span>
              <span>•</span>
              <span>Backlogs: <strong>{student.activeBacklogs}</strong></span>
              <span>•</span>
              <span>Branch: <strong>{student.departmentCode}</strong></span>
            </div>

            <Link
              href="/"
              className="text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Public Site →
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

