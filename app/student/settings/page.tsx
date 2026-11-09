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
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Student Portal Settings</h2>
        <p className="text-xs text-slate-500 mt-1">
          Configure notification preferences, privacy visibility, and account security.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Notification preferences */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center">
            <Bell className="w-4 h-4 text-indigo-600 mr-2" />
            <span>Alert & Notification Preferences</span>
          </h3>

          <div className="space-y-3 pt-2">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">Email Alerts for New Job Postings</span>
                <span className="text-[11px] text-slate-500">
                  Receive instant announcements whenever a company matches your branch eligibility.
                </span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">Interview & Test Reminders</span>
                <span className="text-[11px] text-slate-500">
                  Get high-priority alerts 2 hours prior to scheduled assessments or technical interviews.
                </span>
              </div>
              <input
                type="checkbox"
                checked={interviewSMS}
                onChange={(e) => setInterviewSMS(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
            </label>
          </div>
        </div>

        {/* Profile Visibility */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center">
            <Shield className="w-4 h-4 text-emerald-600 mr-2" />
            <span>Data Privacy & Recruiter Discovery</span>
          </h3>

          <div className="space-y-3 pt-2">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">Allow Approved Recruiters to View Resume</span>
                <span className="text-[11px] text-slate-500">
                  Permits verified enterprise hiring teams to shortlist you from the institutional pool.
                </span>
              </div>
              <input
                type="checkbox"
                checked={shareProfileWithRecruiters}
                onChange={(e) => setShareProfileWithRecruiters(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
              />
            </label>
          </div>
        </div>

        {/* Password Security */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center">
            <Lock className="w-4 h-4 text-rose-600 mr-2" />
            <span>Institutional Account Security</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">New Password</label>
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm transition-colors"
        >
          Save All Settings
        </button>
      </form>
    </div>
  );
}

