'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GraduationCap, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const [role, setRole] = useState<'student' | 'recruiter'>('student');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  // Student form state
  const [studentForm, setStudentForm] = useState({
    fullName: '',
    regNumber: '',
    email: '',
    phone: '',
    department: 'CSE',
    semester: '7',
    cgpa: '',
    backlogs: '0',
    graduationYear: '2027',
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-page">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full panel-card rounded-feature p-8 sm:p-10 shadow-xs">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-control bg-accent-soft text-accent border border-accent/20 text-xs font-semibold uppercase tracking-wider mb-3">
              <span>Placement Portal Enrollment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              Create an Account
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-ink-muted">
              Register as an enrolled undergraduate student or corporate recruiting partner.
            </p>

            {/* Role Tab Selector */}
            <div className="flex justify-center mt-6">
              <div className="bg-surface-muted p-1 rounded-control flex space-x-1 text-xs font-medium border border-border-subtle">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-control transition-colors ${
                    role === 'student'
                      ? 'bg-surface text-ink font-semibold shadow-xs'
                      : 'text-ink-secondary hover:text-ink'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-accent" />
                  <span>Student Registration</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('recruiter')}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-control transition-colors ${
                    role === 'recruiter'
                      ? 'bg-surface text-ink font-semibold shadow-xs'
                      : 'text-ink-secondary hover:text-ink'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-accent" />
                  <span>Company / Recruiter</span>
                </button>
              </div>
            </div>
          </div>

          {success ? (
            <div className="bg-state-success-soft border border-state-success/30 text-state-success p-8 rounded-card text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-state-success mx-auto" />
              <h3 className="font-semibold text-base text-ink">Registration Submitted Successfully</h3>
              <p className="text-xs text-ink-muted">
                Your profile has been created. Profiles require one-time academic verification by the TPO before you can apply for jobs. Redirecting to login...
              </p>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4 text-xs">
              {role === 'student' ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-ink-secondary mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        required
                        value={studentForm.fullName}
                        onChange={(e) => setStudentForm({ ...studentForm, fullName: e.target.value })}
                        placeholder="e.g. Priya Sharma"
                        className="w-full px-3.5 py-2.5 rounded-control border border-border-subtle bg-page/50 text-ink placeholder:text-ink-tertiary focus:outline-none focus:border-accent focus:bg-surface text-xs transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-ink-secondary mb-1">Registration / Roll No</label>
                      <input
                        type="text"
                        required
                        value={studentForm.regNumber}
                        onChange={(e) => setStudentForm({ ...studentForm, regNumber: e.target.value })}
                        placeholder="e.g. 2023CS0142"
                        className="w-full px-3.5 py-2.5 rounded-control border border-border-subtle bg-page/50 text-ink placeholder:text-ink-tertiary focus:outline-none focus:border-accent focus:bg-surface text-xs transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-ink-secondary mb-1">Institutional Email</label>
                      <input
                        type="email"
                        required
                        value={studentForm.email}
                        onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                        placeholder="student@campus.edu"
                        className="w-full px-3.5 py-2.5 rounded-control border border-border-subtle bg-page/50 text-ink placeholder:text-ink-tertiary focus:outline-none focus:border-accent focus:bg-surface text-xs transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-ink-secondary mb-1">Mobile Contact</label>
                      <input
                        type="tel"
                        required
                        value={studentForm.phone}
                        onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-control border border-border-subtle bg-page/50 text-ink placeholder:text-ink-tertiary focus:outline-none focus:border-accent focus:bg-surface text-xs transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-medium text-ink-secondary mb-1">Department</label>
                      <select
                        value={studentForm.department}
                        onChange={(e) => setStudentForm({ ...studentForm, department: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-control border border-border-subtle bg-surface text-ink focus:outline-none focus:border-accent text-xs"
                      >
                        <option value="CSE">Computer Science (CSE)</option>
                        <option value="IT">Information Tech (IT)</option>
                        <option value="AIDS">AI & Data Science (AIDS)</option>
                        <option value="ECE">Electronics (ECE)</option>
                        <option value="EEE">Electrical (EEE)</option>
                        <option value="MECH">Mechanical (MECH)</option>
                        <option value="CIVIL">Civil (CIVIL)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-medium text-ink-secondary mb-1">Current CGPA</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        required
                        value={studentForm.cgpa}
                        onChange={(e) => setStudentForm({ ...studentForm, cgpa: e.target.value })}
                        placeholder="8.50"
                        className="w-full px-3.5 py-2.5 rounded-control border border-border-subtle bg-page/50 text-ink placeholder:text-ink-tertiary focus:outline-none focus:border-accent focus:bg-surface text-xs transition-colors tabular-nums"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-ink-secondary mb-1">Active Backlogs</label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        required
                        value={studentForm.backlogs}
                        onChange={(e) => setStudentForm({ ...studentForm, backlogs: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-control border border-border-subtle bg-page/50 text-ink placeholder:text-ink-tertiary focus:outline-none focus:border-accent focus:bg-surface text-xs transition-colors tabular-nums"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block font-medium text-ink-secondary mb-1">Company / Organization Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Innovations Corp"
                      className="w-full px-3.5 py-2.5 rounded-control border border-border-subtle bg-page/50 text-ink placeholder:text-ink-tertiary focus:outline-none focus:border-accent focus:bg-surface text-xs transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-ink-secondary mb-1">Industry Sector</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Software / Fintech / EV"
                        className="w-full px-3.5 py-2.5 rounded-control border border-border-subtle bg-page/50 text-ink placeholder:text-ink-tertiary focus:outline-none focus:border-accent focus:bg-surface text-xs transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-ink-secondary mb-1">Official Website</label>
                      <input
                        type="url"
                        required
                        placeholder="https://company.com"
                        className="w-full px-3.5 py-2.5 rounded-control border border-border-subtle bg-page/50 text-ink placeholder:text-ink-tertiary focus:outline-none focus:border-accent focus:bg-surface text-xs transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-ink-secondary mb-1">HR Lead Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jane Doe"
                        className="w-full px-3.5 py-2.5 rounded-control border border-border-subtle bg-page/50 text-ink placeholder:text-ink-tertiary focus:outline-none focus:border-accent focus:bg-surface text-xs transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-ink-secondary mb-1">Corporate Email</label>
                      <input
                        type="email"
                        required
                        placeholder="recruiter@company.com"
                        className="w-full px-3.5 py-2.5 rounded-control border border-border-subtle bg-page/50 text-ink placeholder:text-ink-tertiary focus:outline-none focus:border-accent focus:bg-surface text-xs transition-colors"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-primary w-full py-2.5 px-4 rounded-control text-xs flex items-center justify-center space-x-2"
                >
                  <span>Complete Enrollment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="pt-4 text-center text-ink-muted">
                Already registered?{' '}
                <Link href="/login" className="font-semibold text-accent hover:underline">
                  Sign in here
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
