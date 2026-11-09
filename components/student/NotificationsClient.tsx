'use client';

import React, { useTransition } from 'react';
import Link from 'next/link';
import { NotificationItem } from '@/lib/types';
import { markNotificationReadAction } from '@/app/actions/pis-actions';
import { Bell, Check, Clock, Calendar, Briefcase, Info, ArrowRight } from 'lucide-react';

interface NotificationsClientProps {
  notifications: NotificationItem[];
}

export default function NotificationsClient({
  notifications,
}: NotificationsClientProps) {
  const [isPending, startTransition] = useTransition();

  const handleMarkRead = (id: string) => {
    startTransition(async () => {
      await markNotificationReadAction(id);
    });
  };

  return (
    <div className="space-y-4">
      {notifications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
          <Bell className="w-10 h-10 mx-auto mb-2 text-slate-300" />
          <p className="text-xs font-semibold">No notifications right now.</p>
        </div>
      ) : (
        notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
              notif.isRead
                ? 'bg-white border-slate-200 text-slate-600'
                : 'bg-indigo-50/40 border-indigo-200 text-slate-900 shadow-sm'
            }`}
          >
            <div className="flex items-start space-x-3.5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  notif.category === 'interview'
                    ? 'bg-amber-100 text-amber-700'
                    : notif.category === 'job'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-indigo-100 text-indigo-700'
                }`}
              >
                {notif.category === 'interview' ? (
                  <Calendar className="w-4 h-4" />
                ) : notif.category === 'job' ? (
                  <Briefcase className="w-4 h-4" />
                ) : (
                  <Info className="w-4 h-4" />
                )}
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-bold">{notif.title}</h4>
                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0"></span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {notif.message}
                </p>
                <div className="flex items-center space-x-3 text-[11px] text-slate-400 mt-2">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(notif.createdAt).toLocaleString()}</span>
                  {notif.link && (
                    <>
                      <span>•</span>
                      <Link
                        href={notif.link}
                        className="font-semibold text-indigo-600 hover:text-indigo-800 flex items-center"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3 ml-0.5" />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            {!notif.isRead && (
              <button
                onClick={() => handleMarkRead(notif.id)}
                disabled={isPending}
                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 text-xs shrink-0"
                title="Mark as read"
              >
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

