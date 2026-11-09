import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import NotificationsClient from '@/components/student/NotificationsClient';

export default async function StudentNotificationsPage() {
  const currentUser = await getCurrentUser();
  const notifications = db.getNotificationsByUserId(currentUser?.id || 'user-student-1');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Student Notifications</h2>
        <p className="text-xs text-slate-500 mt-1">
          Stay notified about interview call letters, profile validations, and new recruitment notices.
        </p>
      </div>

      <NotificationsClient notifications={notifications} />
    </div>
  );
}

