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
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
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
          text: `Application submitted successfully for ${job.title} at ${job.companyName}!`,
        });
      } else {
        setMessage({
          type: 'error',
          text: res.error || 'Failed to apply.',
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Banner / Message Alert */}
      {message && (
        <div
          className={`p-4 rounded-2xl flex items-center space-x-3 text-xs ${
            message.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border border-rose-200 text-rose-800'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by job title, company, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">Filter:</span>
          <button
            onClick={() => setFilterEligibility('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterEligibility === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Drives ({jobs.length})
          </button>
          <button
            onClick={() => setFilterEligibility('eligible')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterEligibility === 'eligible'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Eligible Only
          </button>
          <button
            onClick={() => setFilterEligibility('applied')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterEligibility === 'applied'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
              className={`bg-white rounded-2xl border transition-all p-6 flex flex-col justify-between ${
                isApplied
                  ? 'border-blue-300 ring-1 ring-blue-100'
                  : eligibility.isEligible
                  ? 'border-slate-200 hover:border-indigo-400 hover:shadow-md'
                  : 'border-slate-200 bg-slate-50/50 opacity-90'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {job.employmentType}
                      </span>
                      {isApplied && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 flex items-center space-x-1">
                          <Check className="w-3 h-3" />
                          <span>Applied</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{job.title}</h3>
                    <p className="text-xs font-semibold text-indigo-600">{job.companyName}</p>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 p-1 flex items-center justify-center shrink-0">
                    <img src={job.companyLogo} alt={job.companyName} className="max-h-full max-w-full object-contain" />
                  </div>
                </div>

                <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                {/* Eligibility Criteria Checklist Card (Section 9.1 of PDF) */}
                <div className="bg-slate-50 rounded-xl p-3.5 mb-4 text-xs space-y-2 border border-slate-100">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-slate-700">Automated Eligibility Evaluation:</span>
                    <span
                      className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        eligibility.isEligible
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {eligibility.isEligible ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Eligible to Apply</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 text-rose-600" />
                          <span>Not Eligible</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Checklist items */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-200/60">
                    <div className="flex items-center space-x-1.5">
                      {eligibility.checks.cgpa.passed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      )}
                      <span>
                        CGPA: {student.cgpa.toFixed(2)} (Req: &ge; {job.minCGPA.toFixed(1)})
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      {eligibility.checks.backlogs.passed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      )}
                      <span>
                        Backlogs: {student.activeBacklogs} (Max: {job.maxBacklogs})
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      {eligibility.checks.department.passed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      )}
                      <span>
                        Branch: {student.departmentCode} ({job.eligibleDepartmentCodes.join('/')})
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      {eligibility.checks.verification.passed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      )}
                      <span>TPO Verified: {student.isVerified ? 'Yes' : 'No'}</span>
                    </div>
                  </div>

                  {/* If ineligible, show reasons */}
                  {!eligibility.isEligible && (
                    <div className="pt-2 border-t border-slate-200/60 text-[11px] text-rose-600 space-y-0.5">
                      {eligibility.reasons.map((r, i) => (
                        <div key={i} className="flex items-center space-x-1">
                          <span>•</span>
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Skills Match Advisory (Section 9.2 of PDF) */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-500 flex items-center">
                      <Sparkles className="w-3 h-3 text-indigo-500 mr-1" />
                      Skill Match Advisory:
                    </span>
                    <span className="font-bold text-slate-800">{skillMatch.score}% Match</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {job.requiredSkills.map((req) => {
                      const hasSkill = skillMatch.matchedSkills.includes(req);
                      return (
                        <span
                          key={req}
                          className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            hasSkill
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-500 border border-slate-200'
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
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 text-sm">₹{job.packageLPA} LPA</span>
                  <span className="text-slate-400 text-[11px] block">
                    Deadline: {new Date(job.deadline).toLocaleDateString()}
                  </span>
                </div>

                {isApplied ? (
                  <button
                    disabled
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-400 font-semibold cursor-not-allowed"
                  >
                    Already Applied
                  </button>
                ) : eligibility.isEligible ? (
                  <button
                    onClick={() => handleApply(job)}
                    disabled={isPending}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm transition-colors flex items-center space-x-1.5"
                  >
                    <span>{isPending ? 'Submitting...' : 'Apply Now'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    disabled
                    title={eligibility.reasons.join('; ')}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-400 font-medium cursor-not-allowed text-xs"
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

