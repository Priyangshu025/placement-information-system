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
    <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-37px)] bg-page">
      <StudentSidebar
        student={student}
        unreadNotifCount={unreadCount}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-surface border-b border-border-subtle px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <h1 className="text-sm font-semibold text-ink">Student Workspace</h1>
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-control ${
                student.isVerified
                  ? 'bg-accent-soft text-accent'
                  : 'bg-[#FEF3C7] text-state-warning'
              }`}
            >
              {student.isVerified ? '✓ Verified Academic Profile' : '⚠ Audit Pending'}
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <div className="hidden sm:flex items-center space-x-2.5 bg-surface-muted py-1 px-3 rounded-control text-ink-secondary text-[11px]">
              <span>CGPA: <strong className="text-ink">{student.cgpa.toFixed(2)}</strong></span>
              <span>•</span>
              <span>Backlogs: <strong className="text-ink">{student.activeBacklogs}</strong></span>
              <span>•</span>
              <span>Branch: <strong className="text-accent">{student.departmentCode}</strong></span>
            </div>

            <Link
              href="/"
              className="text-xs text-ink-secondary hover:text-ink font-medium"
            >
              Overview Site →
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-content w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
