import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import {
  GraduationCap,
  Briefcase,
  Building2,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Clock,
  MapPin,
  FileCheck
} from 'lucide-react';

export default async function HomePage() {
  const currentUser = await getCurrentUser();
  const jobs = db.getJobs();
  const companies = db.getCompanies();
  const stats = db.getStats();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentRole={currentUser?.role} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-950 text-white pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Recruitment Management Engine 2026</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Digitizing the Entire{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                Placement Lifecycle
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-300 leading-relaxed">
              A unified, role-based platform connecting students, recruitment officers, and top corporate employers with automated eligibility checking, ATS pipelines, and real-time recruitment analytics.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/student/opportunities"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-500/25 transition-all hover:scale-105"
              >
                <span>Browse Campus Drives</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/statistics"
                className="inline-flex items-center space-x-2 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold px-6 py-3.5 rounded-xl backdrop-blur-sm transition-all"
              >
                <span>View Placement Reports</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 backdrop-blur-md">
              <div className="text-indigo-400 text-sm font-semibold flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span>Highest Package</span>
              </div>
              <div className="text-3xl font-extrabold text-white mt-2">₹{stats.highestPackageLPA} LPA</div>
              <div className="text-xs text-slate-400 mt-1">Google & Tech Titans</div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 backdrop-blur-md">
              <div className="text-blue-400 text-sm font-semibold flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Average Package</span>
              </div>
              <div className="text-3xl font-extrabold text-white mt-2">₹{stats.averagePackageLPA} LPA</div>
              <div className="text-xs text-slate-400 mt-1">Across all branches</div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 backdrop-blur-md">
              <div className="text-emerald-400 text-sm font-semibold flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Total Offers</span>
              </div>
              <div className="text-3xl font-extrabold text-white mt-2">{stats.placedStudents}+</div>
              <div className="text-xs text-slate-400 mt-1">82.5% placement rate</div>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 backdrop-blur-md">
              <div className="text-purple-400 text-sm font-semibold flex items-center space-x-2">
                <Building2 className="w-4 h-4" />
                <span>Recruiting Partners</span>
              </div>
              <div className="text-3xl font-extrabold text-white mt-2">{stats.participatingCompanies}+</div>
              <div className="text-xs text-slate-400 mt-1">Tier-1 & Dream companies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Portal Gateways */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Role-Based Portals
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Each stakeholder interacts with dedicated tools customized to their responsibilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Student */}
            <div className="group rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-blue-400 transition-all bg-gradient-to-b from-blue-50/40 to-white flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Student Portal</h3>
              <p className="text-xs text-slate-600 mb-4 flex-1">
                Maintain verified academic profiles, upload resumes, check automated eligibility, and track multi-stage job applications.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 mb-6">
                <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500 mr-1.5" /> Automated Eligibility Engine</li>
                <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500 mr-1.5" /> Resume Skills Extractor</li>
                <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-blue-500 mr-1.5" /> Live Stage Progression</li>
              </ul>
              <Link
                href="/student/dashboard"
                className="mt-auto inline-flex items-center justify-between w-full py-2.5 px-4 rounded-lg bg-blue-600 text-white font-medium text-xs hover:bg-blue-700 transition-colors"
              >
                <span>Enter Student Portal</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* TPO */}
            <div className="group rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-purple-400 transition-all bg-gradient-to-b from-purple-50/40 to-white flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">TPO Officer Console</h3>
              <p className="text-xs text-slate-600 mb-4 flex-1">
                Verify student CGPA and backlog records, approve company drives, coordinate interview stages, and generate placement records.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 mb-6">
                <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-purple-500 mr-1.5" /> Student Profile Verification</li>
                <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-purple-500 mr-1.5" /> Company & Drive Approvals</li>
                <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-purple-500 mr-1.5" /> Department Reports & CSV Export</li>
              </ul>
              <Link
                href="/tpo/dashboard"
                className="mt-auto inline-flex items-center justify-between w-full py-2.5 px-4 rounded-lg bg-purple-600 text-white font-medium text-xs hover:bg-purple-700 transition-colors"
              >
                <span>Enter TPO Console</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Recruiter */}
            <div className="group rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-amber-400 transition-all bg-gradient-to-b from-amber-50/40 to-white flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Recruiter ATS Portal</h3>
              <p className="text-xs text-slate-600 mb-4 flex-1">
                Post job requirements, inspect shortlisted applicant resumes, schedule technical rounds, and submit final selections.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 mb-6">
                <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mr-1.5" /> Job Creation with Criteria</li>
                <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mr-1.5" /> Resume Keyword Scoring</li>
                <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mr-1.5" /> Kanban Stage Tracking</li>
              </ul>
              <Link
                href="/recruiter/dashboard"
                className="mt-auto inline-flex items-center justify-between w-full py-2.5 px-4 rounded-lg bg-amber-600 text-white font-medium text-xs hover:bg-amber-700 transition-colors"
              >
                <span>Enter Recruiter Portal</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Admin */}
            <div className="group rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-rose-400 transition-all bg-gradient-to-b from-rose-50/40 to-white flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Super Admin Console</h3>
              <p className="text-xs text-slate-600 mb-4 flex-1">
                Manage academic departments, institutional batches, user role credentials, security parameters, and immutable audit logs.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 mb-6">
                <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-rose-500 mr-1.5" /> User & Role Management</li>
                <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-rose-500 mr-1.5" /> Department Structure</li>
                <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-rose-500 mr-1.5" /> Full Audit Activity Log</li>
              </ul>
              <Link
                href="/admin/dashboard"
                className="mt-auto inline-flex items-center justify-between w-full py-2.5 px-4 rounded-lg bg-rose-600 text-white font-medium text-xs hover:bg-rose-700 transition-colors"
              >
                <span>Enter Admin Console</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Recruitment Workflow Sequence (Section 2 from PDF) */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">
              Section 2: Research & Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              How the Campus Recruitment Workflow Operates
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              The standardized end-to-end recruitment pipeline designed to prevent manual errors and ensure complete transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { step: '01', title: 'Student Reg & Profile', desc: 'Academics, CGPA, backlogs & resume' },
              { step: '02', title: 'TPO Verification', desc: 'Authority verifies student records' },
              { step: '03', title: 'Job Criteria Setup', desc: 'Package, cut-offs & departments' },
              { step: '04', title: 'Auto Eligibility', desc: 'Instant server validation check' },
              { step: '05', title: 'ATS Interviews', desc: 'Assessments & multi-stage rounds' },
              { step: '06', title: 'Final Placement', desc: 'Offer letters & institutional stats' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm relative flex flex-col">
                <span className="text-xs font-black text-indigo-500 mb-2">{item.step}</span>
                <h4 className="text-sm font-bold text-slate-800 mb-1">{item.title}</h4>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Live Job Vacancies */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Live Opportunities
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Active Campus Recruitment Drives
              </h2>
            </div>
            <Link
              href="/student/opportunities"
              className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              <span>View All Vacancies</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.slice(0, 6).map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-1.5">
                        {job.employmentType}
                      </span>
                      <h3 className="font-bold text-base text-slate-900 leading-snug">
                        {job.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-600">{job.companyName}</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 p-1 flex items-center justify-center overflow-hidden shrink-0">
                      <img src={job.companyLogo} alt={job.companyName} className="max-h-full max-w-full object-contain" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                    {job.description}
                  </p>

                  <div className="space-y-2 mb-4 bg-slate-50 p-3 rounded-xl text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Package CTC:</span>
                      <span className="font-bold text-slate-900">₹{job.packageLPA} LPA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Min CGPA:</span>
                      <span className="font-medium text-slate-700">{job.minCGPA.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Allowed Backlogs:</span>
                      <span className="font-medium text-slate-700">{job.maxBacklogs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Eligible Branches:</span>
                      <span className="font-medium text-indigo-600 truncate max-w-[150px]">
                        {job.eligibleDepartmentCodes.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    Due {new Date(job.deadline).toLocaleDateString()}
                  </span>
                  <Link
                    href={`/student/opportunities#${job.id}`}
                    className="font-semibold text-indigo-600 hover:text-indigo-800 flex items-center"
                  >
                    <span>Check Eligibility</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruiter Logos Banner */}
      <section className="py-12 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-6">
            Trusted by 75+ Leading Corporate Hiring Partners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-80">
            {companies.map((c) => (
              <div key={c.id} className="flex items-center space-x-2 grayscale hover:grayscale-0 transition-all">
                <div className="w-8 h-8 rounded bg-white p-1 flex items-center justify-center">
                  <img src={c.logo} alt={c.name} className="max-h-full max-w-full object-contain" />
                </div>
                <span className="text-sm font-semibold text-slate-300">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

