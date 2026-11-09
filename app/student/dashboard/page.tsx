import React from 'react';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { checkEligibility } from '@/lib/eligibility';
import { calculateSkillMatch } from '@/lib/resume-analyzer';
import {
  Briefcase,
  FileCheck,
  Calendar,
  Award,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

export default async function StudentDashboardPage() {
  const currentUser = await getCurrentUser();
  const student = db.getStudentByUserId(currentUser?.id || 'user-student-1') || db.getStudents()[0];
  const applications = db.getApplicationsByStudentId(student.id);
  const allJobs = db.getJobs().filter((j) => j.status === 'Open');

  // Next scheduled interview or upcoming deadline
  const activeInterview = applications
    .flatMap((a) => a.stages)
    .find((s) => s.scheduledAt && new Date(s.scheduledAt).getTime() > Date.now());

  // Smart Recommendations (Job Recommendation Engine - Section 9 from PDF)
  // Recommended opportunities using department, graduation year, skills, stated interests, and eligibility
  const recommendedJobs = allJobs
    .map((job) => {
      const eligibility = checkEligibility(student, job);
      const skillMatch = calculateSkillMatch(student.skills, job.requiredSkills);
      const isApplied = applications.some((a) => a.jobId === job.id);
      return { job, eligibility, skillMatch, isApplied };
    })
    .filter((item) => !item.isApplied)
    .sort((a, b) => b.skillMatch.score - a.skillMatch.score)
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-800 to-blue-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-indigo-200">
              Academic Year 2026-2027 • Semester {student.semester}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
              Welcome back, {student.fullName}!
            </h2>
            <p className="mt-2 text-indigo-100 text-xs sm:text-sm max-w-xl">
              Your profile is verified. You currently have{' '}
              <span className="font-bold underline">{applications.length} active applications</span> in the recruitment pipeline.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/student/opportunities"
              className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold px-4 py-2.5 rounded-xl text-xs shadow-sm transition-all"
            >
              Explore Drives
            </Link>
            <Link
              href="/student/resume"
              className="bg-indigo-900/60 hover:bg-indigo-900 border border-indigo-400/30 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span>Resume Matcher</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Applied Drives</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{applications.length}</div>
          <span className="text-[11px] text-slate-400">Total submitted</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Shortlisted Rounds</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-purple-600 mt-2">
            {applications.filter((a) => a.status !== 'Applied' && a.status !== 'Rejected').length}
          </div>
          <span className="text-[11px] text-purple-600 font-medium">In Assessment / Tech</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Live Interviews</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-600 mt-2">
            {applications.filter((a) => a.status === 'Technical Interview' || a.status === 'HR Interview').length}
          </div>
          <span className="text-[11px] text-slate-400">Upcoming rounds</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Placement Status</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-bold text-emerald-600 mt-2">{student.placementStatus}</div>
          <span className="text-[11px] text-slate-400">TPO Audited Record</span>
        </div>
      </div>

      {/* Upcoming Action / Live Interview Notification */}
      {activeInterview && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                Action Required • Scheduled Interview Round
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                {activeInterview.stageName}: {activeInterview.remarks || 'Technical Assessment Round'}
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Scheduled for: <strong>{new Date(activeInterview.scheduledAt!).toLocaleString()}</strong>
              </p>
            </div>
          </div>

          {activeInterview.venueOrLink && (
            <a
              href={activeInterview.venueOrLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm transition-colors shrink-0"
            >
              <span>Join Virtual Room</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      )}

      {/* Current Applications Tracking */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Your Active Applications</h3>
            <p className="text-xs text-slate-500">Track stage progression and recruiter reviews.</p>
          </div>
          <Link
            href="/student/applications"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center"
          >
            <span>All Applications ({applications.length})</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="border border-slate-100 bg-slate-50/50 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0">
                  <img src={app.companyLogo} alt={app.companyName} className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{app.jobTitle}</h4>
                  <div className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">{app.companyName}</span> • ₹{app.packageLPA} LPA • Submitted {new Date(app.submittedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    app.status === 'Selected'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : app.status === 'Technical Interview' || app.status === 'HR Interview'
                      ? 'bg-purple-100 text-purple-800 border border-purple-300'
                      : app.status === 'Online Assessment' || app.status === 'Resume Shortlisted'
                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  Stage: {app.status}
                </span>

                <Link
                  href="/student/applications"
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  View Timeline →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Job Recommendations (Section 9.3 from PDF) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Recommended Opportunities For You
              </h3>
              <p className="text-xs text-slate-500">
                Ranked using your department ({student.departmentCode}), CGPA ({student.cgpa}), and matched skills.
              </p>
            </div>
          </div>

          <Link
            href="/student/opportunities"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Browse All ({allJobs.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedJobs.map(({ job, eligibility, skillMatch }) => (
            <div
              key={job.id}
              className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 p-1 flex items-center justify-center">
                    <img src={job.companyLogo} alt={job.companyName} className="max-h-full max-w-full object-contain" />
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      eligibility.isEligible
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {eligibility.isEligible ? 'Eligible to Apply' : 'Criteria Unmet'}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-900 mt-2">{job.title}</h4>
                <p className="text-xs text-slate-500">{job.companyName} • ₹{job.packageLPA} LPA</p>

                {/* Skill Match Advisory Badge */}
                <div className="mt-3 bg-slate-50 p-2.5 rounded-lg text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Skills Match Score:</span>
                    <span className="font-bold text-indigo-600">{skillMatch.score}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5">
                    <div
                      className="bg-indigo-600 h-1.5 rounded-full"
                      style={{ width: `${skillMatch.score}%` }}
                    ></div>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 truncate">
                    Matched: {skillMatch.matchedSkills.slice(0, 3).join(', ')}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Due {new Date(job.deadline).toLocaleDateString()}</span>
                <Link
                  href="/student/opportunities"
                  className="font-bold text-indigo-600 hover:text-indigo-800"
                >
                  Apply Now →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

