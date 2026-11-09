'use client';

import React, { useState } from 'react';
import { Settings, Shield, Sliders, CheckCircle2, Lock, Save } from 'lucide-react';

export default function AdminSystemSettingsPage() {
  const [maxDreamOffers, setMaxDreamOffers] = useState('2');
  const [minAttendancePercent, setMinAttendancePercent] = useState('75');
  const [requireTpoApprovalForJobs, setRequireTpoApprovalForJobs] = useState(true);
  const [requireProfileVerificationToApply, setRequireProfileVerificationToApply] = useState(true);
  const [maxResumeFileSizeMB, setMaxResumeFileSizeMB] = useState('5');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Institutional Platform Policies</h2>
        <p className="text-xs text-slate-500 mt-1">
          Configure campus placement guidelines, maximum offer thresholds, and eligibility safeguards.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>System settings updated and synchronized across all active portals!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Placement Policy */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center">
            <Sliders className="w-4 h-4 text-rose-600 mr-2" />
            <span>Campus Offer Rules & Dream Policy</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Maximum Allowed Dream Offers Per Student
              </label>
              <select
                value={maxDreamOffers}
                onChange={(e) => setMaxDreamOffers(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
              >
                <option value="1">1 Dream Offer (Once placed, student is opted out)</option>
                <option value="2">2 Dream Offers (Allows 1 regular + 1 dream upgrade)</option>
                <option value="3">Unlimited Offers</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Minimum Academic Attendance Percentage Required
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={minAttendancePercent}
                onChange={(e) => setMinAttendancePercent(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>
        </div>

        {/* Verification Safeguards */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center">
            <Shield className="w-4 h-4 text-indigo-600 mr-2" />
            <span>Institutional Verification Safeguards</span>
          </h3>

          <div className="space-y-3 pt-2">
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">Strict TPO Profile Verification Requirement</span>
                <span className="text-[11px] text-slate-500">
                  Block students from applying to jobs until their CGPA and backlogs are verified by authorized staff.
                </span>
              </div>
              <input
                type="checkbox"
                checked={requireProfileVerificationToApply}
                onChange={(e) => setRequireProfileVerificationToApply(e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
              <div>
                <span className="font-bold text-slate-800 block">Require TPO Approval for Recruiter Vacancies</span>
                <span className="text-[11px] text-slate-500">
                  New job postings submitted by recruiters remain in 'Pending' until reviewed by TPO.
                </span>
              </div>
              <input
                type="checkbox"
                checked={requireTpoApprovalForJobs}
                onChange={(e) => setRequireTpoApprovalForJobs(e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
              />
            </label>
          </div>
        </div>

        {/* File & Upload Security */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center">
            <Lock className="w-4 h-4 text-slate-700 mr-2" />
            <span>Document & Resume Storage Limits</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Max Resume File Size (MB)</label>
              <input
                type="number"
                min="1"
                max="25"
                value={maxResumeFileSizeMB}
                onChange={(e) => setMaxResumeFileSizeMB(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Permitted File Types</label>
              <input
                type="text"
                disabled
                value="application/pdf, application/msword (.pdf, .docx)"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-100 text-slate-500"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center space-x-1.5"
        >
          <Save className="w-4 h-4" />
          <span>Save Institutional Policies</span>
        </button>
      </form>
    </div>
  );
}

