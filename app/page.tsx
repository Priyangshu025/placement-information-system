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
  Clock,
  ArrowUpRight
} from 'lucide-react';

export default async function HomePage() {
  const currentUser = await getCurrentUser();
  const jobs = db.getJobs();
  const companies = db.getCompanies();
  const stats = db.getStats();

  return (
    <div className="flex flex-col min-h-screen bg-page text-ink">
      <Navbar currentRole={currentUser?.role} />

      {/* Hero Section — Calm, Editorial, Apple-Store-Inspired Clarity */}
      <section className="pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-border-subtle bg-surface">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-reading mx-auto text-center">
            <span className="inline-block text-[12px] font-semibold text-accent tracking-wider uppercase bg-accent-soft px-3 py-1 rounded-control mb-5">
              Campus Placement Information System
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-semibold tracking-tight text-ink leading-[1.15]">
              Turn campus recruitment into structured, verifiable outcomes.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-ink-secondary leading-relaxed">
              A calm, centralized workspace connecting students, training and placement officers, and corporate recruiters with automated eligibility evaluation, transparent ATS pipelines, and reliable institutional reports.
            </p>

            <div className="mt-8 flex flex-wrap justify-center items-center gap-3">
              <Link
                href="/student/opportunities"
                className="btn-primary space-x-2 text-sm px-5 py-2.5"
              >
                <span>Browse Campus Vacancies</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/statistics"
                className="btn-secondary space-x-2 text-sm px-5 py-2.5"
              >
                <span>Placement Analytics</span>
              </Link>
            </div>
          </div>

          {/* Key Metrics Strip — Clean, Tabular, High-Contrast */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="panel-card p-5 bg-surface">
              <span className="text-[12px] text-ink-tertiary font-medium block">
                Highest CTC Package
              </span>
              <div className="text-2xl sm:text-3xl font-semibold text-ink mt-1.5 tabular-nums">
                ₹{stats.highestPackageLPA} LPA
              </div>
              <span className="text-[11px] text-ink-secondary mt-1 block">
                Tier-1 Technology Engineering
              </span>
            </div>

            <div className="panel-card p-5 bg-surface">
              <span className="text-[12px] text-ink-tertiary font-medium block">
                Average Compensation
              </span>
              <div className="text-2xl sm:text-3xl font-semibold text-ink mt-1.5 tabular-nums">
                ₹{stats.averagePackageLPA} LPA
              </div>
              <span className="text-[11px] text-ink-secondary mt-1 block">
                Across all engineering branches
              </span>
            </div>

            <div className="panel-card p-5 bg-surface">
              <span className="text-[12px] text-ink-tertiary font-medium block">
                Confirmed Offers
              </span>
              <div className="text-2xl sm:text-3xl font-semibold text-accent mt-1.5 tabular-nums">
                {stats.placedStudents}+
              </div>
              <span className="text-[11px] text-ink-secondary mt-1 block">
                82.5% cohort placement rate
              </span>
            </div>

            <div className="panel-card p-5 bg-surface">
              <span className="text-[12px] text-ink-tertiary font-medium block">
                Active Recruiters
              </span>
              <div className="text-2xl sm:text-3xl font-semibold text-ink mt-1.5 tabular-nums">
                {stats.participatingCompanies}+
              </div>
              <span className="text-[11px] text-ink-secondary mt-1 block">
                Verified enterprise hiring partners
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Role Workspaces — Editorial Panels */}
      <section className="py-20 bg-page border-b border-border-subtle">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-reading mb-12">
            <span className="text-[11px] uppercase font-semibold text-accent tracking-wider block mb-1">
              Role Workspaces
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
              Designed for each recruitment stakeholder.
            </h2>
            <p className="text-sm text-ink-secondary mt-2">
              Every persona operates within a dedicated workspace tailored to their responsibilities without clutter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Student */}
            <div className="panel-card p-6 flex flex-col justify-between hover:border-accent transition-colors bg-surface">
              <div>
                <div className="w-10 h-10 rounded-control bg-accent-soft text-accent flex items-center justify-center mb-4">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-ink mb-1">Student Workspace</h3>
                <p className="text-xs text-ink-secondary mb-4 leading-relaxed">
                  Maintain verified academics, parse resume skills, run automated eligibility checks, and track stage-by-stage applications.
                </p>
                <ul className="text-xs text-ink-secondary space-y-1.5 mb-6">
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-accent mr-1.5" /> Automated Eligibility Checks</li>
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-accent mr-1.5" /> Resume Skills Extraction</li>
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-accent mr-1.5" /> Recruitment Stage Tracker</li>
                </ul>
              </div>
              <Link
                href="/student/dashboard"
                className="btn-secondary w-full text-xs justify-between"
              >
                <span>Enter Workspace</span>
                <ArrowRight className="w-3.5 h-3.5 text-ink-secondary" />
              </Link>
            </div>

            {/* TPO */}
            <div className="panel-card p-6 flex flex-col justify-between hover:border-accent transition-colors bg-surface">
              <div>
                <div className="w-10 h-10 rounded-control bg-accent-soft text-accent flex items-center justify-center mb-4">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-ink mb-1">TPO Officer Console</h3>
                <p className="text-xs text-ink-secondary mb-4 leading-relaxed">
                  Verify academic CGPA and backlogs, approve company registrations, coordinate interview schedules, and export official reports.
                </p>
                <ul className="text-xs text-ink-secondary space-y-1.5 mb-6">
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-accent mr-1.5" /> Student Profile Verification</li>
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-accent mr-1.5" /> Company Drive Approvals</li>
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-accent mr-1.5" /> Official CSV & Cohort Exports</li>
                </ul>
              </div>
              <Link
                href="/tpo/dashboard"
                className="btn-secondary w-full text-xs justify-between"
              >
                <span>Enter Console</span>
                <ArrowRight className="w-3.5 h-3.5 text-ink-secondary" />
              </Link>
            </div>

            {/* Recruiter */}
            <div className="panel-card p-6 flex flex-col justify-between hover:border-accent transition-colors bg-surface">
              <div>
                <div className="w-10 h-10 rounded-control bg-accent-soft text-accent flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-ink mb-1">Recruiter ATS</h3>
                <p className="text-xs text-ink-secondary mb-4 leading-relaxed">
                  Post position criteria, review eligible candidate resumes, advance candidates on the ATS board, and submit final selections.
                </p>
                <ul className="text-xs text-ink-secondary space-y-1.5 mb-6">
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-accent mr-1.5" /> Vacancy & Criteria Setup</li>
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-accent mr-1.5" /> Resume Skills Scoring</li>
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-accent mr-1.5" /> Stage Progression Board</li>
                </ul>
              </div>
              <Link
                href="/recruiter/dashboard"
                className="btn-secondary w-full text-xs justify-between"
              >
                <span>Enter ATS</span>
                <ArrowRight className="w-3.5 h-3.5 text-ink-secondary" />
              </Link>
            </div>

            {/* Super Admin */}
            <div className="panel-card p-6 flex flex-col justify-between hover:border-accent transition-colors bg-surface">
              <div>
                <div className="w-10 h-10 rounded-control bg-accent-soft text-accent flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-ink mb-1">Super Admin</h3>
                <p className="text-xs text-ink-secondary mb-4 leading-relaxed">
                  Manage engineering branch mappings, graduating sessions, user roles, security parameters, and immutable audit logs.
                </p>
                <ul className="text-xs text-ink-secondary space-y-1.5 mb-6">
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-accent mr-1.5" /> Role-Based Access Control</li>
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-accent mr-1.5" /> Engineering Department Registry</li>
                  <li className="flex items-center"><CheckCircle2 className="w-3.5 h-3.5 text-accent mr-1.5" /> Immutable Security Logs</li>
                </ul>
              </div>
              <Link
                href="/admin/dashboard"
                className="btn-secondary w-full text-xs justify-between"
              >
                <span>Enter Admin</span>
                <ArrowRight className="w-3.5 h-3.5 text-ink-secondary" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recruitment Workflow Sequence */}
      <section className="py-20 bg-surface border-b border-border-subtle">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-reading mb-12">
            <span className="text-[11px] uppercase font-semibold text-accent tracking-wider block mb-1">
              End-to-End Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
              How campus recruitment operates.
            </h2>
            <p className="text-sm text-ink-secondary mt-2">
              Every stage has explicit state checks, ensuring complete transparency and eliminating bias.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { step: '01', title: 'Registration & Profile', desc: 'Academics, CGPA, backlogs, and resume' },
              { step: '02', title: 'TPO Verification', desc: 'Placement staff audits credentials' },
              { step: '03', title: 'Job Criteria Setup', desc: 'Package, cut-offs, and branches' },
              { step: '04', title: 'Automated Eligibility', desc: 'Instant server-side rule evaluation' },
              { step: '05', title: 'ATS Interviews', desc: 'Assessments, technical, and HR rounds' },
              { step: '06', title: 'Final Selection', desc: 'Offer letters and placement registry' },
            ].map((item) => (
              <div key={item.step} className="panel-card p-4 bg-page">
                <span className="text-xs font-semibold text-accent block mb-2">{item.step}</span>
                <h4 className="text-xs font-semibold text-ink mb-1">{item.title}</h4>
                <p className="text-[11px] text-ink-secondary leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Campus Drives */}
      <section className="py-20 bg-page">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-3">
            <div>
              <span className="text-[11px] uppercase font-semibold text-accent tracking-wider block mb-1">
                Live Opportunities
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
                Current Campus Drives
              </h2>
            </div>
            <Link
              href="/student/opportunities"
              className="text-xs font-medium text-accent hover:text-accent-hover flex items-center"
            >
              <span>View all openings</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.slice(0, 6).map((job) => (
              <div
                key={job.id}
                className="panel-card p-6 flex flex-col justify-between hover:border-accent transition-colors bg-surface"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded-control text-[10px] font-medium bg-accent-soft text-accent mb-2">
                        {job.employmentType}
                      </span>
                      <h3 className="font-semibold text-sm text-ink leading-snug">
                        {job.title}
                      </h3>
                      <p className="text-xs text-ink-secondary">{job.companyName}</p>
                    </div>
                    <div className="w-10 h-10 rounded-control bg-page border border-border-subtle p-1 flex items-center justify-center shrink-0">
                      <img src={job.companyLogo} alt={job.companyName} className="max-h-full max-w-full object-contain" />
                    </div>
                  </div>

                  <p className="text-xs text-ink-secondary line-clamp-2 mb-4 leading-relaxed">
                    {job.description}
                  </p>

                  <div className="bg-surface-muted p-3 rounded-control text-xs space-y-1.5 mb-4 border border-border-subtle">
                    <div className="flex justify-between">
                      <span className="text-ink-tertiary">Offered Package:</span>
                      <span className="font-semibold text-ink">₹{job.packageLPA} LPA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-tertiary">Min CGPA:</span>
                      <span className="text-ink-secondary">{job.minCGPA.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-tertiary">Allowed Backlogs:</span>
                      <span className="text-ink-secondary">{job.maxBacklogs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-tertiary">Eligible Branches:</span>
                      <span className="text-accent font-medium truncate max-w-[140px]">
                        {job.eligibleDepartmentCodes.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
                  <span className="text-ink-tertiary flex items-center text-[11px]">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    Due {new Date(job.deadline).toLocaleDateString()}
                  </span>
                  <Link
                    href={`/student/opportunities#${job.id}`}
                    className="font-medium text-accent hover:text-accent-hover flex items-center text-xs"
                  >
                    <span>Check Eligibility</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruiting Partners Bar */}
      <section className="py-12 bg-surface border-t border-border-subtle">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[11px] uppercase tracking-wider text-ink-tertiary font-medium mb-6">
            Institutional Recruiting Partners
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-90">
            {companies.map((c) => (
              <div key={c.id} className="flex items-center space-x-2 text-ink-secondary hover:text-ink transition-colors">
                <div className="w-6 h-6 rounded bg-white p-0.5 flex items-center justify-center border border-border-subtle">
                  <img src={c.logo} alt={c.name} className="max-h-full max-w-full object-contain" />
                </div>
                <span className="text-xs font-medium">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
