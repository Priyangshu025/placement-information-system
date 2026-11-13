'use client';

import React, { useState } from 'react';
import { Settings, Shield, Bell, Lock, CheckCircle2 } from 'lucide-react';

export default function StudentSettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [interviewSMS, setInterviewSMS] = useState(true);
  const [shareProfileWithRecruiters, setShareProfileWithRecruiters] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="space-y-1">
        <span className="text-xs font-semibold tracking-wider text-accent uppercase">
          Account Preferences
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
          Student Portal Settings
        </h1>
        <p className="text-xs sm:text-sm text-ink-muted">
          Configure notification preferences, privacy visibility, and account security.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-control bg-state-success-soft border border-state-success/30 text-state-success text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-state-success shrink-0" />
          <span>Preferences updated successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Notification preferences */}
        <div className="panel-card rounded-card p-6 space-y-4">
          <h3 className="font-semibold text-sm text-ink flex items-center">
            <Bell className="w-4 h-4 text-accent mr-2" />
            <span>Alert & Notification Preferences</span>
          </h3>

          <div className="space-y-3 pt-1">
            <label className="flex items-center justify-between p-3.5 rounded-control bg-page border border-border-subtle cursor-pointer hover:border-accent/40 transition-colors">
              <div>
                <span className="font-medium text-ink block">Email Alerts for New Job Postings</span>
                <span className="text-[11px] text-ink-muted mt-0.5 block">
                  Receive instant announcements whenever a company matches your branch eligibility.
                </span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 accent-[#245B4A] rounded border-border-subtle"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-control bg-page border border-border-subtle cursor-pointer hover:border-accent/40 transition-colors">
              <div>
                <span className="font-medium text-ink block">Interview & Assessment Reminders</span>
                <span className="text-[11px] text-ink-muted mt-0.5 block">
                  Get high-priority alerts 2 hours prior to scheduled assessments or technical interviews.
                </span>
              </div>
              <input
                type="checkbox"
                checked={interviewSMS}
                onChange={(e) => setInterviewSMS(e.target.checked)}
                className="w-4 h-4 accent-[#245B4A] rounded border-border-subtle"
              />
            </label>
          </div>
        </div>

        {/* Profile Visibility */}
        <div className="panel-card rounded-card p-6 space-y-4">
          <h3 className="font-semibold text-sm text-ink flex items-center">
            <Shield className="w-4 h-4 text-accent mr-2" />
            <span>Data Privacy & Recruiter Discovery</span>
          </h3>

          <div className="space-y-3 pt-1">
            <label className="flex items-center justify-between p-3.5 rounded-control bg-page border border-border-subtle cursor-pointer hover:border-accent/40 transition-colors">
              <div>
                <span className="font-medium text-ink block">Allow Approved Recruiters to View Resume</span>
                <span className="text-[11px] text-ink-muted mt-0.5 block">
                  Permits verified enterprise hiring teams to shortlist you from the institutional pool.
                </span>
              </div>
              <input
                type="checkbox"
                checked={shareProfileWithRecruiters}
                onChange={(e) => setShareProfileWithRecruiters(e.target.checked)}
                className="w-4 h-4 accent-[#245B4A] rounded border-border-subtle"
              />
            </label>
          </div>
        </div>

        {/* Security Notice */}
        <div className="panel-card rounded-card p-6 space-y-4">
          <h3 className="font-semibold text-sm text-ink flex items-center">
            <Lock className="w-4 h-4 text-accent mr-2" />
            <span>Account Security</span>
          </h3>
          <p className="text-xs text-ink-muted leading-relaxed">
            Institutional authentication is synchronized with your university single sign-on (SSO). To change your institutional password, please visit the Campus IT Self-Service portal.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn-primary text-xs py-2 px-5 rounded-control"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
