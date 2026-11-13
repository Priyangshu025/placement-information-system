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
  Clock,
  ExternalLink,
  ArrowUpRight
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

  // Smart Recommendations
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
      {/* Welcome Banner — Editorial & Focused */}
      <div className="panel-card p-6 sm:p-8 bg-surface flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-[11px] font-semibold tracking-wider text-accent uppercase bg-accent-soft px-2 py-0.5 rounded-control">
            Academic Session 2026–2027 • Semester {student.semester}
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-ink mt-2 tracking-tight">
            Welcome back, {student.fullName}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-ink-secondary max-w-reading leading-relaxed">
            Your academic credentials are verified. You currently have{' '}
            <strong className="text-ink">{applications.length} active submissions</strong> being reviewed across campus recruitment drives.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/student/opportunities"
            className="btn-primary text-xs !min-h-[38px] !px-4"
          >
            Explore Vacancies
          </Link>
          <Link
            href="/student/resume"
            className="btn-secondary text-xs !min-h-[38px] !px-4"
          >
            Resume Extractor
          </Link>
        </div>
      </div>

      {/* KPI Cards — Clean, Tabular Numerals */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="panel-card p-5 bg-surface">
          <div className="flex items-center justify-between text-ink-tertiary">
            <span className="text-xs font-medium">Applied Vacancies</span>
            <Briefcase className="w-4 h-4 text-ink-tertiary" />
          </div>
          <div className="text-2xl font-semibold text-ink mt-2 tabular-nums">{applications.length}</div>
          <span className="text-[11px] text-ink-secondary mt-1 block">Submissions active</span>
        </div>

        <div className="panel-card p-5 bg-surface">
          <div className="flex items-center justify-between text-ink-tertiary">
            <span className="text-xs font-medium">Shortlisted Rounds</span>
            <FileCheck className="w-4 h-4 text-accent" />
          </div>
          <div className="text-2xl font-semibold text-accent mt-2 tabular-nums">
            {applications.filter((a) => a.status !== 'Applied' && a.status !== 'Rejected').length}
          </div>
          <span className="text-[11px] text-accent mt-1 block font-medium">In Assessment / Interview</span>
        </div>

        <div className="panel-card p-5 bg-surface">
          <div className="flex items-center justify-between text-ink-tertiary">
            <span className="text-xs font-medium">Scheduled Interviews</span>
            <Calendar className="w-4 h-4 text-ink-tertiary" />
          </div>
          <div className="text-2xl font-semibold text-ink mt-2 tabular-nums">
            {applications.filter((a) => a.status === 'Technical Interview' || a.status === 'HR Interview').length}
          </div>
          <span className="text-[11px] text-ink-secondary mt-1 block">Upcoming confirmed</span>
        </div>

        <div className="panel-card p-5 bg-surface">
          <div className="flex items-center justify-between text-ink-tertiary">
            <span className="text-xs font-medium">Placement Status</span>
            <Award className="w-4 h-4 text-ink-tertiary" />
          </div>
          <div className="text-xl font-semibold text-ink mt-2">{student.placementStatus}</div>
          <span className="text-[11px] text-ink-tertiary mt-1 block">TPO Official Record</span>
        </div>
      </div>

      {/* Upcoming Action / Live Interview Notification */}
      {activeInterview && (
        <div className="panel-card p-5 bg-surface border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-9 h-9 rounded-control bg-accent-soft text-accent flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                Scheduled Round Notice
              </span>
              <h4 className="text-sm font-semibold text-ink mt-0.5">
                {activeInterview.stageName}: {activeInterview.remarks || 'Technical Evaluation'}
              </h4>
              <p className="text-xs text-ink-secondary mt-0.5">
                Time: <strong>{new Date(activeInterview.scheduledAt!).toLocaleString()}</strong>
              </p>
            </div>
          </div>

          {activeInterview.venueOrLink && (
            <a
              href={activeInterview.venueOrLink}
              target="_blank"
              rel="noreferrer"
              className="btn-primary text-xs !min-h-[36px] !px-3.5 space-x-1 shrink-0"
            >
              <span>Join Virtual Room</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          )}
        </div>
      )}

      {/* Active Applications Tracking */}
      <div className="panel-card p-6 bg-surface">
        <div className="flex items-center justify-between mb-5 border-b border-border-subtle pb-3">
          <div>
            <h3 className="text-sm font-semibold text-ink">Active Application Pipeline</h3>
            <p className="text-xs text-ink-secondary">Review progress through stages and reviewer updates.</p>
          </div>
          <Link
            href="/student/applications"
            className="text-xs font-medium text-accent hover:text-accent-hover flex items-center"
          >
            <span>All submissions ({applications.length})</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="p-4 rounded-control border border-border-subtle bg-page flex flex-col md:flex-row items-start md:items-center justify-between gap-3 hover:border-accent transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-control bg-surface border border-border-subtle p-1 flex items-center justify-center shrink-0">
                  <img src={app.companyLogo} alt={app.companyName} className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-ink">{app.jobTitle}</h4>
                  <div className="text-[11px] text-ink-secondary">
                    <span className="font-medium text-ink">{app.companyName}</span> • ₹{app.packageLPA} LPA • Submitted {new Date(app.submittedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end text-xs">
                <span className="px-2.5 py-0.5 rounded-control font-medium text-[11px] bg-accent-soft text-accent border border-accent/20">
                  {app.status}
                </span>

                <Link
                  href="/student/applications"
                  className="font-medium text-accent hover:text-accent-hover text-xs flex items-center"
                >
                  <span>Stage Timeline</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Opportunities */}
      <div className="panel-card p-6 bg-surface">
        <div className="flex items-center justify-between mb-5 border-b border-border-subtle pb-3">
          <div>
            <h3 className="text-sm font-semibold text-ink">
              Recommended Campus Vacancies
            </h3>
            <p className="text-xs text-ink-secondary">
              Ranked by your department ({student.departmentCode}), CGPA ({student.cgpa.toFixed(2)}), and skill coverage.
            </p>
          </div>

          <Link
            href="/student/opportunities"
            className="text-xs font-medium text-accent hover:text-accent-hover"
          >
            All vacancies ({allJobs.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recommendedJobs.map(({ job, eligibility, skillMatch }) => (
            <div
              key={job.id}
              className="p-5 rounded-control border border-border-subtle bg-page flex flex-col justify-between hover:border-accent transition-colors"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="w-8 h-8 rounded-control bg-surface border border-border-subtle p-1 flex items-center justify-center">
                    <img src={job.companyLogo} alt={job.companyName} className="max-h-full max-w-full object-contain" />
                  </div>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-control ${
                      eligibility.isEligible
                        ? 'bg-accent-soft text-accent'
                        : 'bg-[#FEE2E2] text-state-danger'
                    }`}
                  >
                    {eligibility.isEligible ? 'Eligible' : 'Criteria Unmet'}
                  </span>
                </div>

                <h4 className="font-semibold text-xs text-ink mt-2">{job.title}</h4>
                <p className="text-[11px] text-ink-secondary">{job.companyName} • ₹{job.packageLPA} LPA</p>

                <div className="mt-3 bg-surface p-2 rounded-control text-xs space-y-1 border border-border-subtle">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-ink-tertiary">Skill Match:</span>
                    <span className="font-semibold text-accent">{skillMatch.score}%</span>
                  </div>
                  <div className="w-full bg-surface-muted rounded-full h-1">
                    <div
                      className="bg-accent h-1 rounded-full"
                      style={{ width: `${skillMatch.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between text-xs">
                <span className="text-ink-tertiary text-[11px]">Due {new Date(job.deadline).toLocaleDateString()}</span>
                <Link
                  href="/student/opportunities"
                  className="font-medium text-accent hover:text-accent-hover text-xs flex items-center"
                >
                  <span>Apply</span>
                  <ArrowRight className="w-3 h-3 ml-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
