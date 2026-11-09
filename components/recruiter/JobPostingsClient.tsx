'use client';

import React, { useState, useTransition } from 'react';
import { JobPosting } from '@/lib/types';
import { createJobPosting } from '@/app/actions/pis-actions';
import { Briefcase, Plus, CheckCircle2, Clock, MapPin, Sparkles, Building2 } from 'lucide-react';

interface JobPostingsClientProps {
  jobs: JobPosting[];
}

export default function JobPostingsClient({ jobs }: JobPostingsClientProps) {
  const [showForm, setShowForm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [createdSuccess, setCreatedSuccess] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Bangalore / Hyderabad');
  const [employmentType, setEmploymentType] = useState<'Full-time' | 'Internship' | 'Intern + PPO'>('Full-time');
  const [packageLPA, setPackageLPA] = useState('18.5');
  const [minCGPA, setMinCGPA] = useState('7.5');
  const [maxBacklogs, setMaxBacklogs] = useState('0');
  const [eligibleDepts, setEligibleDepts] = useState<string[]>(['CSE', 'IT', 'AIDS']);
  const [targetGradYear, setTargetGradYear] = useState('2027');
  const [requiredSkills, setRequiredSkills] = useState('Python, Data Structures, Algorithms, SQL');
  const [deadline, setDeadline] = useState('2026-12-31T23:59:59Z');

  const deptOptions = ['CSE', 'IT', 'AIDS', 'ECE', 'EEE', 'MECH', 'CIVIL'];

  const toggleDept = (dept: string) => {
    if (eligibleDepts.includes(dept)) {
      setEligibleDepts(eligibleDepts.filter((d) => d !== dept));
    } else {
      setEligibleDepts([...eligibleDepts, dept]);
    }
  };

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const skillsArray = requiredSkills.split(',').map((s) => s.trim()).filter(Boolean);

      const res = await createJobPosting({
        title,
        description,
        location,
        employmentType,
        packageLPA: parseFloat(packageLPA),
        minCGPA: parseFloat(minCGPA),
        maxBacklogs: parseInt(maxBacklogs),
        eligibleDepartmentCodes: eligibleDepts,
        targetGraduationYear: parseInt(targetGradYear),
        requiredSkills: skillsArray,
        deadline,
      });

      if (res.success) {
        setShowForm(false);
        setCreatedSuccess(true);
        setTitle('');
        setDescription('');
        setTimeout(() => setCreatedSuccess(false), 3000);
      }
    });
  };

  return (
    <div className="space-y-6">
      {createdSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>New campus vacancy published! Eligible students can now see and apply for this role.</span>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h3 className="text-base font-bold text-slate-900">
          Posted Job Openings ({jobs.length})
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>{showForm ? 'Close Form' : 'Create New Vacancy'}</span>
        </button>
      </div>

      {/* Creation Modal / Inline Form (Step 3 of PDF) */}
      {showForm && (
        <form onSubmit={handleCreateJob} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-4 text-xs">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="font-bold text-sm text-slate-900">Publish New Campus Recruitment Vacancy</h4>
            <p className="text-xs text-slate-500">Configure package CTC and automated eligibility parameters.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Position / Job Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Graduate Software Engineer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Employment Type</label>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value as any)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white"
              >
                <option value="Full-time">Full-time</option>
                <option value="Internship">Internship</option>
                <option value="Intern + PPO">Intern + PPO</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Job Description & Responsibilities</label>
            <textarea
              rows={3}
              required
              placeholder="Describe the job role, tech stacks, expectations..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Offered CTC Package (₹ LPA)</label>
              <input
                type="number"
                step="0.1"
                required
                value={packageLPA}
                onChange={(e) => setPackageLPA(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Minimum CGPA Cutoff</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                required
                value={minCGPA}
                onChange={(e) => setMinCGPA(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Max Active Backlogs Allowed</label>
              <input
                type="number"
                min="0"
                max="10"
                required
                value={maxBacklogs}
                onChange={(e) => setMaxBacklogs(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Eligible Engineering Branches</label>
            <div className="flex flex-wrap gap-2 pt-1">
              {deptOptions.map((dept) => {
                const selected = eligibleDepts.includes(dept);
                return (
                  <button
                    key={dept}
                    type="button"
                    onClick={() => toggleDept(dept)}
                    className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-colors ${
                      selected
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {dept}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Required Skills (Comma separated)</label>
              <input
                type="text"
                placeholder="Python, Java, DSA, SQL"
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Application Deadline</label>
              <input
                type="date"
                required
                value={deadline.split('T')[0]}
                onChange={(e) => setDeadline(`${e.target.value}T23:59:59Z`)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-sm"
            >
              {isPending ? 'Publishing...' : 'Publish Campus Vacancy'}
            </button>
          </div>
        </form>
      )}

      {/* Grid of Current Vacancies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {job.employmentType}
                  </span>
                  <h4 className="font-bold text-base text-slate-900 mt-1">{job.title}</h4>
                  <p className="text-xs font-semibold text-amber-700">{job.companyName}</p>
                </div>
                <span className="text-sm font-black text-slate-900">₹{job.packageLPA} LPA</span>
              </div>

              <p className="text-xs text-slate-600 mb-4 line-clamp-2">{job.description}</p>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Min CGPA:</span>
                  <span className="font-semibold text-slate-800">&ge; {job.minCGPA.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Max Backlogs:</span>
                  <span className="font-semibold text-slate-800">&le; {job.maxBacklogs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Branches:</span>
                  <span className="font-semibold text-amber-800">{job.eligibleDepartmentCodes.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
              <span className="font-semibold text-emerald-600">Active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

