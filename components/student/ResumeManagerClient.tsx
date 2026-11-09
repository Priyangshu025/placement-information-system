'use client';

import React, { useState, useTransition } from 'react';
import { StudentProfile, JobPosting } from '@/lib/types';
import { extractSkillsFromResume, calculateSkillMatch, COMMON_SKILLS } from '@/lib/resume-analyzer';
import { uploadResumeAction } from '@/app/actions/pis-actions';
import {
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  Trash2,
  RefreshCw,
  Plus
} from 'lucide-react';

interface ResumeManagerClientProps {
  student: StudentProfile;
  jobs: JobPosting[];
}

export default function ResumeManagerClient({
  student,
  jobs,
}: ResumeManagerClientProps) {
  const [selectedJobId, setSelectedJobId] = useState(jobs[0]?.id || '');
  const [isPending, startTransition] = useTransition();
  const [resumeTextSample, setResumeTextSample] = useState(
    `Priya Sharma — Computer Science Undergraduate (CGPA: 8.85).
Experienced in Python, Java, Data Structures, Algorithms, React, Node.js, PostgreSQL, Docker, AWS, and REST APIs.
Built distributed cache system with Raft consensus and campus recruitment engine.`
  );
  const [newSkillInput, setNewSkillInput] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];
  const skillMatch = selectedJob
    ? calculateSkillMatch(student.skills, selectedJob.requiredSkills)
    : { score: 100, matchedSkills: [], missingSkills: [], recommendation: 'Strong Match' };

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const extracted = extractSkillsFromResume(resumeTextSample);
      const res = await uploadResumeAction('Priya_Sharma_Resume_Updated.pdf', extracted);
      if (res.success) {
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      }
    });
  };

  const handleAddManualSkill = () => {
    if (!newSkillInput.trim()) return;
    startTransition(async () => {
      await uploadResumeAction(student.resumeFileName, [newSkillInput.trim()]);
      setNewSkillInput('');
    });
  };

  return (
    <div className="space-y-8">
      {/* Upload & Current Resume Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Resume Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Current Resume on File
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Active Version
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {student.resumeFileName || 'Student_Resume_2026.pdf'}
                </h4>
                <p className="text-[10px] text-slate-400">
                  Last updated {new Date(student.resumeLastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              This resume is automatically attached when you submit applications to open campus drives.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert('Downloading verified institutional resume PDF...');
              }}
              className="inline-flex items-center space-x-1 font-semibold text-indigo-600 hover:text-indigo-800"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
            <span className="text-[10px] text-slate-400">PDF • 245 KB</span>
          </div>
        </div>

        {/* Upload & Resume Parser Simulator (Section 9.2 from PDF) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center">
                <Sparkles className="w-4 h-4 text-indigo-600 mr-1.5" />
                <span>AI Resume Skills Analyzer & Uploader</span>
              </h3>
              <p className="text-xs text-slate-500">
                Upload a new CV or paste text to automatically parse programming languages, cloud stacks, and competencies.
              </p>
            </div>
          </div>

          {uploadSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Resume processed! Extracted skills have been updated in your profile.</span>
            </div>
          )}

          <form onSubmit={handleSimulateUpload} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Paste Resume Text / Project Summaries to Analyze
              </label>
              <textarea
                rows={3}
                value={resumeTextSample}
                onChange={(e) => setResumeTextSample(e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Paste your CV text here..."
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
              <div className="text-[11px] text-slate-400">
                Supports PDF, DOCX • Skills mapped to verified industry taxonomy
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center justify-center space-x-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{isPending ? 'Extracting Skills...' : 'Upload & Parse Resume'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Extracted Verified Skills Tag Cloud */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">Extracted Candidate Skills</h3>
            <p className="text-xs text-slate-500">
              Verified skills detected on your profile used by the Automated Recommendation and ATS matching engines.
            </p>
          </div>

          {/* Add skill input */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Add skill (e.g. PyTorch)"
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleAddManualSkill}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700"
            >
              Add
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {student.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold"
            >
              <span>{skill}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Interactive Job Fit Benchmark (Section 9.2 from PDF) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
              Advisory Skill-Match Engine
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Live Job Fit & Gap Benchmark
            </h3>
            <p className="text-xs text-slate-500">
              Select an open vacancy to simulate recruiter ATS resume screening and identify interview prep topics.
            </p>
          </div>

          <div className="w-full sm:w-72">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Target Vacancy</label>
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="w-full p-2 text-xs rounded-xl border border-slate-300 bg-white font-medium"
            >
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.companyName} — {j.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedJob && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            {/* Match Score Meter */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center flex flex-col items-center justify-center">
              <span className="text-xs font-semibold text-slate-500 mb-1">Overall Match Score</span>
              <div className="text-5xl font-black text-indigo-600 mb-2">{skillMatch.score}%</div>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  skillMatch.score >= 70
                    ? 'bg-emerald-100 text-emerald-800'
                    : skillMatch.score >= 40
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {skillMatch.recommendation}
              </span>
              <p className="text-[11px] text-slate-400 mt-3">
                {selectedJob.companyName} requires {selectedJob.requiredSkills.length} core competencies.
              </p>
            </div>

            {/* Matched Skills */}
            <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-200">
              <h4 className="text-xs font-bold text-emerald-800 flex items-center mb-3">
                <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600" />
                <span>Matched Skills ({skillMatch.matchedSkills.length})</span>
              </h4>
              {skillMatch.matchedSkills.length === 0 ? (
                <p className="text-xs text-slate-400">None detected yet.</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {skillMatch.matchedSkills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-semibold text-xs"
                    >
                      ✓ {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Missing Skills / Interview Prep Advisory */}
            <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-200">
              <h4 className="text-xs font-bold text-amber-900 flex items-center mb-3">
                <AlertCircle className="w-4 h-4 mr-1.5 text-amber-600" />
                <span>Recommended Prep ({skillMatch.missingSkills.length})</span>
              </h4>
              {skillMatch.missingSkills.length === 0 ? (
                <p className="text-xs text-emerald-700 font-semibold">
                  Full skill coverage! You are in great shape for technical rounds.
                </p>
              ) : (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {skillMatch.missingSkills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg bg-white border border-amber-200 text-amber-800 font-medium text-xs"
                      >
                        + {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-amber-800 mt-2 leading-relaxed">
                    Tip: Familiarize yourself with basic terminology and design patterns for these topics before interview day.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

