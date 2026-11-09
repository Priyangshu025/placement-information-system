import React from 'react';
import TpoBroadcastClient from '@/components/tpo/TpoBroadcastClient';

export default function TpoNotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Placement Broadcast Center</h2>
        <p className="text-xs text-slate-500 mt-1">
          Issue institutional circulars, interview reminders, and drive notifications across target branches.
        </p>
      </div>

      <TpoBroadcastClient />
    </div>
  );
}

