import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import {
  Users,
  Building2,
  Briefcase,
  Award,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';

export default async function TpoDashboardPage() {
  const stats = db.getStats();
  const students = db.getStudents();
  const companies = db.getCompanies();
  const jobs = db.getJobs();
  const applications = db.getApplications();
  const placements = db.getPlacements();

  const unverifiedStudents = students.filter((s) => !s.isVerified);
  const pendingCompanies = companies.filter((c) => c.approvalStatus === 'Pending');

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-purple-300">
            Training & Placement Office • Academic Operations
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
            Recruitment Drive Management Center
          </h2>
          <p className="mt-2 text-purple-200 text-xs sm:text-sm max-w-xl">
            {stats.placedStudents} of {stats.registeredStudents} registered students have secured verified offers.
            Placement season is running at an <strong>82.5% success rate</strong>.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/tpo/students"
            className="bg-white text-purple-900 hover:bg-purple-50 font-bold px-4 py-2.5 rounded-xl text-xs shadow-sm transition-all"
          >
            Review Unverified Students ({unverifiedStudents.length})
          </Link>
          <Link
            href="/tpo/reports"
            className="bg-purple-950/60 hover:bg-purple-950 border border-purple-400/30 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition-all"
          >
            Institutional Reports
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Registered Pool</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{students.length} Profiles</div>
          <span className="text-[11px] text-emerald-600 font-medium">
            {students.filter((s) => s.isVerified).length} Verified by TPO
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Hiring Partners</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-purple-600 mt-2">{companies.length} Companies</div>
          <span className="text-[11px] text-amber-600 font-medium">
            {pendingCompanies.length} Awaiting Approval
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Active Drive Openings</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-indigo-600 mt-2">{jobs.length} Positions</div>
          <span className="text-[11px] text-slate-400">
            {applications.length} Submissions Processed
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Confirmed Placements</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-600 mt-2">{placements.length} Selections</div>
          <span className="text-[11px] text-emerald-600 font-medium">Top ₹44 LPA</span>
        </div>
      </div>

      {/* Actionable Alerts Bar */}
      {(unverifiedStudents.length > 0 || pendingCompanies.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {unverifiedStudents.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {unverifiedStudents.length} Student Profile(s) Require Academic Verification
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Students cannot apply to drives until CGPA and backlog counts are audited.
                  </p>
                </div>
              </div>
              <Link
                href="/tpo/students"
                className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shrink-0"
              >
                Verify Now
              </Link>
            </div>
          )}

          {pendingCompanies.length > 0 && (
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Building2 className="w-5 h-5 text-purple-600 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {pendingCompanies.length} Company Registration Awaiting Onboarding Clearance
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Recruiter must be approved before job postings can be published.
                  </p>
                </div>
              </div>
              <Link
                href="/tpo/companies"
                className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shrink-0"
              >
                Review Company
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Recent Applications & Submissions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Candidate Applications</h3>
            <p className="text-xs text-slate-500">Live applicant flow across active recruitment drives.</p>
          </div>
          <Link
            href="/tpo/applications"
            className="text-xs font-semibold text-purple-600 hover:text-purple-800 flex items-center"
          >
            <span>View All Applications ({applications.length})</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Branch / Roll No</th>
                <th className="py-3 px-4">CGPA</th>
                <th className="py-3 px-4">Target Drive</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Current Stage</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.slice(0, 5).map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900">{app.studentName}</td>
                  <td className="py-3 px-4 text-slate-600">{app.studentDepartment} • {app.studentRegNo}</td>
                  <td className="py-3 px-4 font-semibold text-indigo-600">{app.studentCGPA.toFixed(2)}</td>
                  <td className="py-3 px-4 text-slate-800">{app.jobTitle}</td>
                  <td className="py-3 px-4 font-medium text-slate-700">{app.companyName}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        app.status === 'Selected'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href="/tpo/applications"
                      className="text-xs font-semibold text-purple-600 hover:text-purple-800"
                    >
                      Manage →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

