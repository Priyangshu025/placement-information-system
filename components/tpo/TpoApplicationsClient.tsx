'use client';

import React, { useState, useTransition } from 'react';
import { Application, ApplicationStage } from '@/lib/types';
import { advanceApplicationStage } from '@/app/actions/pis-actions';
import {
  FileText,
  Search,
  CheckCircle2,
  Calendar,
  Clock,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';

interface TpoApplicationsClientProps {
  applications: Application[];
}

export default function TpoApplicationsClient({
  applications,
}: TpoApplicationsClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [companyFilter, setCompanyFilter] = useState('ALL');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [newStage, setNewStage] = useState<ApplicationStage>('Technical Interview');
  const [remarks, setRemarks] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [meetingUrl, setMeetingUrl] = useState('');
  const [isPending, startTransition] = useTransition();

  const companies = Array.from(new Set(applications.map((a) => a.companyName)));

  const filteredApps = applications.filter((a) => {
    const matchesSearch =
      a.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.studentRegNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStage = stageFilter === 'ALL' || a.status === stageFilter;
    const matchesComp = companyFilter === 'ALL' || a.companyName === companyFilter;

    return matchesSearch && matchesStage && matchesComp;
  });

  const handleAdvanceStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    startTransition(async () => {
      await advanceApplicationStage(
        selectedApp.id,
        newStage,
        remarks || undefined,
        scheduledAt || undefined,
        meetingUrl || undefined
      );
      setSelectedApp(null);
      setRemarks('');
      setScheduledAt('');
      setMeetingUrl('');
    });
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by candidate name, roll number, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white font-medium"
          >
            <option value="ALL">All Companies</option>
            {companies.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white font-medium"
          >
            <option value="ALL">All Pipeline Stages</option>
            <option value="Applied">Applied</option>
            <option value="Resume Shortlisted">Resume Shortlisted</option>
            <option value="Online Assessment">Online Assessment</option>
            <option value="Technical Interview">Technical Interview</option>
            <option value="HR Interview">HR Interview</option>
            <option value="Selected">Selected (Offer)</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <span className="text-xs font-bold text-slate-700">
            Total Submissions: {filteredApps.length}
          </span>
          <span className="text-[11px] text-slate-400">
            Click candidate to advance stage or schedule interview
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Branch / CGPA</th>
                <th className="py-3 px-4">Target Job</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Current Stage</th>
                <th className="py-3 px-4">Submitted</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    <div>{app.studentName}</div>
                    <span className="text-[11px] text-slate-400 font-mono">{app.studentRegNo}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      {app.studentDepartment}
                    </span>
                    <span className="ml-2 font-bold text-indigo-600">{app.studentCGPA.toFixed(2)}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-800 font-medium">{app.jobTitle}</td>
                  <td className="py-3 px-4 text-slate-700 font-semibold">{app.companyName}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        app.status === 'Selected'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : app.status === 'Technical Interview' || app.status === 'HR Interview'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {new Date(app.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedApp(app);
                        setNewStage('Technical Interview');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold text-xs transition-colors"
                    >
                      Update Stage →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stage Progression & Schedule Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">
                  Update Candidate Pipeline
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {selectedApp.studentName} ({selectedApp.studentRegNo})
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedApp.jobTitle} • {selectedApp.companyName}
                </p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAdvanceStage} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Next Stage</label>
                <select
                  value={newStage}
                  onChange={(e) => setNewStage(e.target.value as ApplicationStage)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium"
                >
                  <option value="Resume Shortlisted">Resume Shortlisted</option>
                  <option value="Online Assessment">Online Assessment</option>
                  <option value="Technical Interview">Technical Interview</option>
                  <option value="HR Interview">HR Interview</option>
                  <option value="Selected">Selected (Extend Official Offer)</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Interview Date & Time (Optional)</label>
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Meeting URL or Campus Venue</label>
                <input
                  type="text"
                  placeholder="e.g. https://meet.google.com/xyz or Placement Hall Room 204"
                  value={meetingUrl}
                  onChange={(e) => setMeetingUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Evaluator Notes / Remarks</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Cleared coding assessment round with high score."
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-sm"
                >
                  {isPending ? 'Updating...' : 'Commit Status Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

