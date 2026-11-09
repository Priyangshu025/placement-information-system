'use client';

import React, { useState, useTransition } from 'react';
import { Application, ApplicationStage, StudentProfile } from '@/lib/types';
import { advanceApplicationStage } from '@/app/actions/pis-actions';
import { calculateSkillMatch } from '@/lib/resume-analyzer';
import {
  Users,
  Search,
  CheckCircle2,
  XCircle,
  FileText,
  Calendar,
  Sparkles,
  ExternalLink,
  Filter
} from 'lucide-react';

interface ApplicantsClientProps {
  applications: Application[];
  students: StudentProfile[];
}

export default function ApplicantsClient({
  applications,
  students,
}: ApplicantsClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [newStage, setNewStage] = useState<ApplicationStage>('Resume Shortlisted');
  const [remarks, setRemarks] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [venueOrLink, setVenueOrLink] = useState('');
  const [isPending, startTransition] = useTransition();

  const filteredApps = applications.filter((a) => {
    const matchesSearch =
      a.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.studentRegNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    startTransition(async () => {
      await advanceApplicationStage(
        selectedApp.id,
        newStage,
        remarks || undefined,
        scheduledAt || undefined,
        venueOrLink || undefined
      );
      setSelectedApp(null);
      setRemarks('');
      setScheduledAt('');
      setVenueOrLink('');
    });
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search applicants by name, roll no, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white font-medium"
          >
            <option value="ALL">All Stages ({applications.length})</option>
            <option value="Applied">Applied (Pending Review)</option>
            <option value="Resume Shortlisted">Resume Shortlisted</option>
            <option value="Online Assessment">Online Assessment</option>
            <option value="Technical Interview">Technical Interview</option>
            <option value="HR Interview">HR Interview</option>
            <option value="Selected">Selected / Offers</option>
          </select>
        </div>
      </div>

      {/* Applicants Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <span className="text-xs font-bold text-slate-700">
            Total Candidates: {filteredApps.length}
          </span>
          <span className="text-[11px] text-slate-400">
            Click candidate to update stage or inspect resume
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Branch</th>
                <th className="py-3 px-4 text-center">CGPA</th>
                <th className="py-3 px-4">Target Role</th>
                <th className="py-3 px-4 text-center">Skills Fit</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4 text-right">ATS Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApps.map((app) => {
                const student = students.find((s) => s.id === app.studentId);
                const skillScore = student ? calculateSkillMatch(student.skills, ['Python', 'Data Structures', 'SQL', 'System Design']).score : 85;

                return (
                  <tr key={app.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{app.studentName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{app.studentRegNo}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                        {app.studentDepartment}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-indigo-600">
                      {app.studentCGPA.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-slate-800 font-medium">{app.jobTitle}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center space-x-1 font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                        <Sparkles className="w-3 h-3 text-emerald-500" />
                        <span>{skillScore}% Match</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          app.status === 'Selected'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors"
                      >
                        Advance Candidate →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Advance Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                  ATS Recruitment Action
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {selectedApp.studentName} ({selectedApp.studentRegNo})
                </h3>
                <p className="text-xs text-slate-500">{selectedApp.jobTitle}</p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateStage} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Pipeline Stage</label>
                <select
                  value={newStage}
                  onChange={(e) => setNewStage(e.target.value as ApplicationStage)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium"
                >
                  <option value="Resume Shortlisted">Resume Shortlisted</option>
                  <option value="Online Assessment">Online Assessment</option>
                  <option value="Technical Interview">Technical Interview</option>
                  <option value="HR Interview">HR Interview</option>
                  <option value="Selected">Selected (Extend Offer)</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Schedule Date & Time</label>
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Online Meeting Link / Test Platform</label>
                <input
                  type="text"
                  placeholder="https://meet.google.com/xyz or https://codility.com/..."
                  value={venueOrLink}
                  onChange={(e) => setVenueOrLink(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Interviewer Feedback / Stage Notes</label>
                <textarea
                  rows={2}
                  placeholder="Technical evaluation notes..."
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
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-sm"
                >
                  {isPending ? 'Committing...' : 'Confirm Stage Change'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

