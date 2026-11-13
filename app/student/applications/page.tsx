import React from 'react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import {
  FileText,
  Clock,
  CheckCircle2,
  Calendar,
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
      <div className="space-y-1">
        <span className="text-xs font-semibold tracking-wider text-accent uppercase">
          Application Tracking
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
          My Job Applications
        </h1>
        <p className="text-xs sm:text-sm text-ink-muted">
          Monitor your recruitment stages, interview invitations, and status changes in real time.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="panel-card rounded-card p-12 text-center">
          <FileText className="w-12 h-12 text-ink-tertiary mx-auto mb-3" />
          <h3 className="text-base font-semibold text-ink">No applications submitted yet</h3>
          <p className="text-xs text-ink-muted mt-1 mb-5">
            Browse available opportunities and apply to campus recruitment drives matching your profile.
          </p>
          <Link
            href="/student/opportunities"
            className="btn-primary text-xs py-2 px-4 rounded-control inline-flex items-center space-x-1.5"
          >
            <span>Explore Opportunities</span>
            <ChevronRight className="w-3.5 h-3.5" />
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
                className="panel-card rounded-card p-6 transition-all"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-border-subtle">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-12 h-12 rounded-control bg-page border border-border-subtle p-1.5 flex items-center justify-center shrink-0">
                      <img
                        src={app.companyLogo}
                        alt={app.companyName}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base text-ink tracking-tight">{app.jobTitle}</h3>
                      <div className="text-xs text-ink-muted mt-0.5">
                        <span className="font-medium text-accent">{app.companyName}</span> • ₹{app.packageLPA} LPA • Submitted {new Date(app.submittedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-control inline-flex items-center space-x-1.5 ${
                        isSelected
                          ? 'bg-state-success-soft text-state-success border border-state-success/30'
                          : isRejected
                          ? 'bg-state-danger-soft text-state-danger border border-state-danger/30'
                          : 'bg-accent-soft text-accent border border-accent/20'
                      }`}
                    >
                      {isSelected && <Sparkles className="w-3.5 h-3.5 text-state-success" />}
                      <span>Current Status: {app.status}</span>
                    </span>
                  </div>
                </div>

                {/* Pipeline Stepper Visualizer */}
                <div className="py-5">
                  <span className="text-[11px] font-semibold text-ink-tertiary uppercase tracking-wider block mb-3">
                    Recruitment Stage Pipeline
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {PIPELINE_ORDER.map((stageName, idx) => {
                      const isCompleted = idx <= currentStageIndex && !isRejected;
                      const isCurrent = idx === currentStageIndex && !isRejected;

                      return (
                        <div
                          key={stageName}
                          className={`p-3 rounded-control border text-center transition-all ${
                            isCurrent
                              ? 'bg-accent-soft/80 border-accent text-accent font-semibold ring-1 ring-accent/30'
                              : isCompleted
                              ? 'bg-state-success-soft/40 border-state-success/30 text-state-success font-medium'
                              : 'bg-page/60 border-border-subtle text-ink-tertiary'
                          }`}
                        >
                          <div className="text-[10px] font-medium text-ink-tertiary uppercase tracking-wider">
                            Step {idx + 1}
                          </div>
                          <div
                            className={`text-xs mt-0.5 ${
                              isCurrent
                                ? 'text-accent font-semibold'
                                : isCompleted
                                ? 'text-state-success font-medium'
                                : 'text-ink-secondary'
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
                <div className="bg-page rounded-control p-4 text-xs space-y-2.5 border border-border-subtle">
                  <h4 className="font-semibold text-ink text-[11px] uppercase tracking-wider">
                    Audit Stage Timeline & Notes
                  </h4>
                  <div className="space-y-2">
                    {app.stages.map((stg) => (
                      <div
                        key={stg.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 bg-surface rounded-control border border-border-subtle gap-1"
                      >
                        <div className="flex items-center space-x-2">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              stg.status === 'Completed'
                                ? 'bg-state-success'
                                : stg.status === 'Pending'
                                ? 'bg-state-warning'
                                : 'bg-ink-tertiary'
                            }`}
                          />
                          <span className="font-semibold text-ink">{stg.stageName}</span>
                          <span className="text-ink-tertiary">•</span>
                          <span className="text-ink-muted">{stg.remarks || 'No remarks recorded.'}</span>
                        </div>
                        <div className="text-[11px] text-ink-tertiary tabular-nums pl-4 sm:pl-0">
                          {new Date(stg.updatedAt).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
