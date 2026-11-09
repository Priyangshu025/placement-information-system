import React from 'react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import {
  Briefcase,
  Users,
  CheckCircle2,
  Calendar,
  ArrowRight,
  PlusCircle,
  Building2,
  Clock,
  Sparkles
} from 'lucide-react';

export default async function RecruiterDashboardPage() {
  const currentUser = await getCurrentUser();
  const company = db.getCompanies().find((c) => c.recruiterUserId === currentUser?.id) || db.getCompanies()[1];
  const allJobs = db.getJobs().filter((j) => j.companyId === company.id || j.companyName === company.name);
  const companyApps = db.getApplications().filter((a) => a.companyName === company.name);

  const shortlistedCount = companyApps.filter((a) => a.status === 'Resume Shortlisted').length;
  const assessmentCount = companyApps.filter((a) => a.status === 'Online Assessment').length;
  const interviewCount = companyApps.filter((a) => a.status === 'Technical Interview' || a.status === 'HR Interview').length;
  const selectedCount = companyApps.filter((a) => a.status === 'Selected').length;

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-amber-200">
            Enterprise Campus ATS • {company.name}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
            Recruitment Drive Management
          </h2>
          <p className="mt-2 text-amber-100 text-xs sm:text-sm max-w-xl">
            You have <strong>{companyApps.length} active candidate submissions</strong> across {allJobs.length} active campus vacancies.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/recruiter/job-postings"
            className="bg-white text-amber-900 hover:bg-amber-50 font-bold px-4 py-2.5 rounded-xl text-xs shadow-sm transition-all flex items-center space-x-1.5"
          >
            <PlusCircle className="w-4 h-4 text-amber-700" />
            <span>Create New Vacancy</span>
          </Link>
          <Link
            href="/recruiter/shortlisting"
            className="bg-amber-950/60 hover:bg-amber-950 border border-amber-400/30 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition-all"
          >
            Pipeline ATS Tracker
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Published Vacancies</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{allJobs.length} Positions</div>
          <span className="text-[11px] text-slate-400">Open for campus batch</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Total Applicants</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-600 mt-2">{companyApps.length} Candidates</div>
          <span className="text-[11px] text-slate-400">Automated eligibility passed</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Active In Interviews</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-purple-600 mt-2">{interviewCount} Candidates</div>
          <span className="text-[11px] text-purple-600 font-medium">Tech & HR Rounds</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Extended Offers</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-600 mt-2">{selectedCount} Selected</div>
          <span className="text-[11px] text-emerald-600 font-medium">Official hires logged</span>
        </div>
      </div>

      {/* Recruiter Active Vacancies */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Your Active Job Vacancies</h3>
            <p className="text-xs text-slate-500">Criteria configurations and candidate volume.</p>
          </div>
          <Link
            href="/recruiter/job-postings"
            className="text-xs font-semibold text-amber-600 hover:text-amber-800 flex items-center"
          >
            <span>Manage Vacancies</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allJobs.map((job) => {
            const count = companyApps.filter((a) => a.jobId === job.id).length;
            return (
              <div
                key={job.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                      {job.employmentType}
                    </span>
                    <span className="font-bold text-amber-700 text-xs">₹{job.packageLPA} LPA</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{job.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{job.description}</p>

                  <div className="mt-3 text-[11px] text-slate-500 space-y-1">
                    <div>Criteria: Min CGPA {job.minCGPA.toFixed(1)} • Max Backlogs {job.maxBacklogs}</div>
                    <div>Branches: {job.eligibleDepartmentCodes.join(', ')}</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="font-bold text-indigo-600">{count} Applicants</span>
                  <Link
                    href="/recruiter/applicants"
                    className="font-semibold text-amber-600 hover:text-amber-800"
                  >
                    Review Applicants →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

