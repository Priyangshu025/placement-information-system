'use client';

import React, { useState, useTransition } from 'react';
import { JobPosting, StudentProfile, Application } from '@/lib/types';
import { checkEligibility } from '@/lib/eligibility';
import { calculateSkillMatch } from '@/lib/resume-analyzer';
import { applyForJob } from '@/app/actions/pis-actions';
import {
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Building2,
  Check
} from 'lucide-react';

interface OpportunitiesClientProps {
  student: StudentProfile;
  jobs: JobPosting[];
  existingApplications: Application[];
}

export default function OpportunitiesClient({
  student,
  jobs,
  existingApplications,
}: OpportunitiesClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEligibility, setFilterEligibility] = useState<'all' | 'eligible' | 'applied'>('all');
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const appliedJobIds = new Set(existingApplications.map((a) => a.jobId));

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.requiredSkills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const eligibility = checkEligibility(student, job);
    const isApplied = appliedJobIds.has(job.id);

    if (filterEligibility === 'eligible' && !eligibility.isEligible) return false;
    if (filterEligibility === 'applied' && !isApplied) return false;

    return matchesSearch;
  });

  const handleApply = (job: JobPosting) => {
    setMessage(null);
    startTransition(async () => {
      const res = await applyForJob(job.id);
      if (res.success) {
        setMessage({
          type: 'success',
          text: `Application submitted successfully for ${job.title} at ${job.companyName}.`,
        });
      } else {
        setMessage({
          type: 'error',
          text: res.error || 'Failed to submit application.',
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Banner / Message Alert */}
      {message && (
        <div
          role="status"
          aria-live="polite"
          className={`p-4 rounded-control flex items-center space-x-3 text-xs transition-colors ${
            message.type === 'success'
              ? 'bg-state-success-soft border border-state-success/30 text-state-success'
              : 'bg-state-danger-soft border border-state-danger/30 text-state-danger'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-state-success" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-state-danger" />
          )}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="panel-card p-4 rounded-card flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-ink-tertiary" />
          <input
            type="text"
            placeholder="Search by role, company, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-control border border-border-subtle bg-page/50 text-ink placeholder:text-ink-tertiary focus:outline-none focus:border-accent focus:bg-surface transition-colors"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          <span className="text-xs text-ink-tertiary font-medium hidden sm:inline">Filter:</span>
          <button
            onClick={() => setFilterEligibility('all')}
            className={`px-3 py-1.5 rounded-control text-xs font-medium transition-colors ${
              filterEligibility === 'all'
                ? 'bg-accent text-white shadow-xs'
                : 'bg-surface-muted text-ink-secondary hover:text-ink'
            }`}
          >
            All Drives ({jobs.length})
          </button>
          <button
            onClick={() => setFilterEligibility('eligible')}
            className={`px-3 py-1.5 rounded-control text-xs font-medium transition-colors ${
              filterEligibility === 'eligible'
                ? 'bg-accent text-white shadow-xs'
                : 'bg-surface-muted text-ink-secondary hover:text-ink'
            }`}
          >
            Eligible Only
          </button>
          <button
            onClick={() => setFilterEligibility('applied')}
            className={`px-3 py-1.5 rounded-control text-xs font-medium transition-colors ${
              filterEligibility === 'applied'
                ? 'bg-accent text-white shadow-xs'
                : 'bg-surface-muted text-ink-secondary hover:text-ink'
            }`}
          >
            Applied ({appliedJobIds.size})
          </button>
        </div>
      </div>

      {/* Grid of Job Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.map((job) => {
          const eligibility = checkEligibility(student, job);
          const skillMatch = calculateSkillMatch(student.skills, job.requiredSkills);
          const isApplied = appliedJobIds.has(job.id);

          return (
            <div
              key={job.id}
              id={job.id}
              className={`panel-card rounded-card p-6 flex flex-col justify-between transition-all ${
                isApplied
                  ? 'border-accent/40 bg-accent-soft/20'
                  : eligibility.isEligible
                  ? 'hover:border-accent/40'
                  : 'opacity-85'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1.5">
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-control bg-surface-muted text-ink-secondary border border-border-subtle">
                        {job.employmentType}
                      </span>
                      {isApplied && (
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-control bg-accent-soft text-accent border border-accent/20 flex items-center space-x-1">
                          <Check className="w-3 h-3" />
                          <span>Applied</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-semibold text-ink tracking-tight">{job.title}</h3>
                    <p className="text-xs font-medium text-accent mt-0.5">{job.companyName}</p>
                  </div>

                  <div className="w-12 h-12 rounded-control bg-page border border-border-subtle p-1.5 flex items-center justify-center shrink-0">
                    <img src={job.companyLogo} alt={job.companyName} className="max-h-full max-w-full object-contain" />
                  </div>
                </div>

                <p className="text-xs text-ink-muted mb-4 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                {/* Eligibility Criteria Checklist Card */}
                <div className="bg-page rounded-control p-3.5 mb-4 text-xs space-y-2.5 border border-border-subtle">
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-ink-secondary text-[11px] uppercase tracking-wider font-semibold">
                      Automated Eligibility
                    </span>
                    <span
                      className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-control text-[11px] font-medium ${
                        eligibility.isEligible
                          ? 'bg-state-success-soft text-state-success border border-state-success/30'
                          : 'bg-state-danger-soft text-state-danger border border-state-danger/30'
                      }`}
                    >
                      {eligibility.isEligible ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-state-success" />
                          <span>Eligible</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 text-state-danger" />
                          <span>Not Eligible</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Checklist items */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1.5 border-t border-border-subtle">
                    <div className="flex items-center space-x-1.5">
                      {eligibility.checks.cgpa.passed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-state-success shrink-0" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-state-danger shrink-0" />
                      )}
                      <span className="tabular-nums">
                        CGPA {student.cgpa.toFixed(2)} (Req: &ge; {job.minCGPA.toFixed(1)})
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      {eligibility.checks.backlogs.passed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-state-success shrink-0" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-state-danger shrink-0" />
                      )}
                      <span className="tabular-nums">
                        Backlogs: {student.activeBacklogs} (Max: {job.maxBacklogs})
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      {eligibility.checks.department.passed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-state-success shrink-0" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-state-danger shrink-0" />
                      )}
                      <span>
                        Branch: {student.departmentCode} ({job.eligibleDepartmentCodes.join('/')})
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      {eligibility.checks.verification.passed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-state-success shrink-0" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-state-danger shrink-0" />
                      )}
                      <span>TPO Verified: {student.isVerified ? 'Yes' : 'No'}</span>
                    </div>
                  </div>

                  {/* Ineligibility reasons */}
                  {!eligibility.isEligible && (
                    <div className="pt-2 border-t border-border-subtle text-[11px] text-state-danger space-y-0.5">
                      {eligibility.reasons.map((r, i) => (
                        <div key={i} className="flex items-center space-x-1">
                          <span>•</span>
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Skills Match Advisory */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-ink-tertiary flex items-center font-medium">
                      <Sparkles className="w-3 h-3 text-accent mr-1" />
                      Skill match advisory:
                    </span>
                    <span className="font-semibold text-ink tabular-nums">{skillMatch.score}% match</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {job.requiredSkills.map((req) => {
                      const hasSkill = skillMatch.matchedSkills.includes(req);
                      return (
                        <span
                          key={req}
                          className={`text-[10px] px-2 py-0.5 rounded-control font-medium ${
                            hasSkill
                              ? 'bg-accent-soft text-accent border border-accent/20'
                              : 'bg-surface-muted text-ink-tertiary border border-border-subtle'
                          }`}
                        >
                          {hasSkill ? '✓ ' : ''}{req}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-ink text-sm tabular-nums">₹{job.packageLPA} LPA</span>
                  <span className="text-ink-tertiary text-[11px] block">
                    Deadline: {new Date(job.deadline).toLocaleDateString()}
                  </span>
                </div>

                {isApplied ? (
                  <button
                    disabled
                    className="px-4 py-2 rounded-control bg-surface-muted text-ink-tertiary font-medium cursor-not-allowed text-xs border border-border-subtle"
                  >
                    Already Applied
                  </button>
                ) : eligibility.isEligible ? (
                  <button
                    onClick={() => handleApply(job)}
                    disabled={isPending}
                    className="btn-primary text-xs py-2 px-4 rounded-control flex items-center space-x-1.5"
                  >
                    <span>{isPending ? 'Submitting...' : 'Apply Now'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    disabled
                    title={eligibility.reasons.join('; ')}
                    className="px-4 py-2 rounded-control bg-surface-muted text-ink-tertiary font-medium cursor-not-allowed text-xs border border-border-subtle"
                  >
                    Ineligible to Apply
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
