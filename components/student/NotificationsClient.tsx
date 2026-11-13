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
        <div className="panel-card rounded-card p-12 text-center text-ink-tertiary">
          <Bell className="w-10 h-10 mx-auto mb-2 text-ink-tertiary/60" />
          <p className="text-xs font-medium">No notifications right now.</p>
        </div>
      ) : (
        notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-5 rounded-card border transition-all flex items-start justify-between gap-4 ${
              notif.isRead
                ? 'bg-surface border-border-subtle text-ink-muted'
                : 'bg-accent-soft/20 border-accent/30 text-ink'
            }`}
          >
            <div className="flex items-start space-x-3.5">
              <div
                className={`w-9 h-9 rounded-control flex items-center justify-center shrink-0 mt-0.5 ${
                  notif.category === 'interview'
                    ? 'bg-state-warning-soft text-state-warning'
                    : notif.category === 'job'
                    ? 'bg-accent-soft text-accent'
                    : 'bg-page text-ink-secondary border border-border-subtle'
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
                  <h4 className="text-sm font-semibold text-ink">{notif.title}</h4>
                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                  )}
                </div>
                <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                  {notif.message}
                </p>
                <div className="flex items-center space-x-3 text-[11px] text-ink-tertiary mt-2">
                  <Clock className="w-3 h-3" />
                  <span className="tabular-nums">{new Date(notif.createdAt).toLocaleString()}</span>
                  {notif.link && (
                    <>
                      <span>•</span>
                      <Link
                        href={notif.link}
                        className="font-medium text-accent hover:text-accent-hover flex items-center"
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
                className="p-1.5 rounded-control text-ink-tertiary hover:text-accent hover:bg-page text-xs shrink-0 transition-colors"
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
