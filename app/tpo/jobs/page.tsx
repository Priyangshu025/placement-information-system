import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Briefcase, Building2, CheckCircle2, Clock, Users, ArrowRight } from 'lucide-react';

export default async function TpoJobsPage() {
  const jobs = db.getJobs();
  const applications = db.getApplications();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Campus Vacancies & Criteria Management</h2>
          <p className="text-xs text-slate-500 mt-1">
            Review live job descriptions, package offerings, and automated eligibility parameters.
          </p>
        </div>

        <Link
          href="/recruiter/job-postings"
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center space-x-1.5"
        >
          <span>Post New Vacancy</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => {
          const appCount = applications.filter((a) => a.jobId === job.id).length;

          return (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {job.employmentType}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 mt-1">{job.title}</h3>
                    <p className="text-xs font-semibold text-purple-600">{job.companyName}</p>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 p-1 flex items-center justify-center shrink-0">
                    <img src={job.companyLogo} alt={job.companyName} className="max-h-full max-w-full object-contain" />
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs space-y-1.5 mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Package CTC:</span>
                    <span className="font-bold text-slate-900">₹{job.packageLPA} LPA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Min CGPA Required:</span>
                    <span className="font-semibold text-indigo-600">&ge; {job.minCGPA.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Allowed Backlogs:</span>
                    <span className="font-medium text-slate-700">&le; {job.maxBacklogs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Eligible Branches:</span>
                    <span className="font-medium text-purple-700 truncate max-w-[150px]">
                      {job.eligibleDepartmentCodes.join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Applicant Submissions:</span>
                    <span className="font-bold text-emerald-600">{appCount} candidates</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  Deadline: {new Date(job.deadline).toLocaleDateString()}
                </span>

                <Link
                  href="/tpo/applications"
                  className="font-semibold text-purple-600 hover:text-purple-800"
                >
                  View Applicants →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

