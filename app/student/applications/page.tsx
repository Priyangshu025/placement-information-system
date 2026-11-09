import React from 'react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import {
  FileText,
  Clock,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Building2,
  AlertCircle,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { ApplicationStage } from '@/lib/types';

const PIPELINE_ORDER: ApplicationStage[] = [
  'Applied',
  'Resume Shortlisted',
  'Online Assessment',
  'Technical Interview',
  'HR Interview',
  'Selected',
];

export default async function StudentApplicationsPage() {
  const currentUser = await getCurrentUser();
  const student = db.getStudentByUserId(currentUser?.id || 'user-student-1') || db.getStudents()[0];
  const applications = db.getApplicationsByStudentId(student.id);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">My Job Applications</h2>
        <p className="text-xs text-slate-500 mt-1">
          Monitor your recruitment stages, interview invitations, and status changes in real-time.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No applications submitted yet</h3>
          <p className="text-xs text-slate-400 mt-1 mb-4">
            Browse available opportunities and apply to drives matching your profile.
          </p>
          <Link
            href="/student/opportunities"
            className="inline-flex items-center px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-sm hover:bg-indigo-700"
          >
            <span>Explore Opportunities</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => {
            const currentStageIndex = PIPELINE_ORDER.indexOf(app.status);
            const isSelected = app.status === 'Selected';
            const isRejected = app.status === 'Rejected';

            return (
              <div
                key={app.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 p-1.5 flex items-center justify-center shrink-0">
                      <img
                        src={app.companyLogo}
                        alt={app.companyName}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900">{app.jobTitle}</h3>
                      <div className="text-xs text-slate-500">
                        <span className="font-semibold text-slate-700">{app.companyName}</span> • ₹{app.packageLPA} LPA • Submitted {new Date(app.submittedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div>
                    <span
                      className={`text-xs font-bold px-3 py-1.5 rounded-full inline-flex items-center space-x-1.5 ${
                        isSelected
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : isRejected
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                      }`}
                    >
                      {isSelected && <Sparkles className="w-3.5 h-3.5 text-emerald-600" />}
                      <span>Current Status: {app.status}</span>
                    </span>
                  </div>
                </div>

                {/* Pipeline Stepper Visualizer (Section 2, Step 6 of PDF) */}
                <div className="py-6">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                    Recruitment Stage Pipeline
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {PIPELINE_ORDER.map((stageName, idx) => {
                      const isCompleted = idx <= currentStageIndex && !isRejected;
                      const isCurrent = idx === currentStageIndex && !isRejected;

                      return (
                        <div
                          key={stageName}
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            isCurrent
                              ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-200'
                              : isCompleted
                              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-800'
                              : 'bg-slate-50 border-slate-200 text-slate-400'
                          }`}
                        >
                          <div className="text-[10px] font-semibold text-slate-400">Step {idx + 1}</div>
                          <div
                            className={`text-xs font-bold mt-0.5 ${
                              isCurrent
                                ? 'text-indigo-900'
                                : isCompleted
                                ? 'text-emerald-900'
                                : 'text-slate-500'
                            }`}
                          >
                            {stageName}
                          </div>
                          <div className="text-[10px] mt-1">
                            {isCompleted ? '✓ Passed' : isCurrent ? '● Active' : 'Pending'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Stage logs / remarks history */}
                <div className="bg-slate-50 rounded-xl p-4 text-xs space-y-2.5">
                  <h4 className="font-bold text-slate-700">Audit Stage Timeline & Notes:</h4>
                  <div className="space-y-2">
                    {app.stages.map((stg) => (
                      <div
                        key={stg.id}
                        className="bg-white p-3 rounded-lg border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-slate-900">{stg.stageName}</span>
                            <span className="text-[10px] text-slate-400">
                              Updated by {stg.updatedBy} on {new Date(stg.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                          {stg.remarks && (
                            <p className="text-slate-600 mt-1 text-[11px] italic">
                              "{stg.remarks}"
                            </p>
                          )}
                          {stg.scheduledAt && (
                            <p className="text-amber-800 text-[11px] font-semibold mt-1">
                              📅 Scheduled: {new Date(stg.scheduledAt).toLocaleString()}
                            </p>
                          )}
                        </div>

                        {stg.venueOrLink && (
                          <a
                            href={stg.venueOrLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold shrink-0"
                          >
                            <span>Open Meeting / Portal</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Offer Letter CTA if selected */}
                {isSelected && (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-emerald-700 font-semibold flex items-center">
                      <Sparkles className="w-4 h-4 mr-1 text-emerald-500" />
                      Congratulations! Official placement record created in institutional registry.
                    </span>
                    <Link
                      href="/student/placement-history"
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold"
                    >
                      View Placement Record →
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

