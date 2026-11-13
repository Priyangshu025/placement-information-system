'use client';

import React, { useState, useTransition } from 'react';
import { StudentProfile } from '@/lib/types';
import { updateStudentProfile } from '@/app/actions/pis-actions';
import {
  UserCheck,
  GraduationCap,
  ShieldCheck,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  Award,
  Edit2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface ProfileClientProps {
  student: StudentProfile;
}

export default function ProfileClient({ student }: ProfileClientProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(student.phone);
  const [fullName, setFullName] = useState(student.fullName);
  const [isPending, startTransition] = useTransition();
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await updateStudentProfile({
        fullName,
        phone,
      });
      if (res.success) {
        setIsEditing(false);
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    });
  };

  return (
    <div className="space-y-6">
      {savedSuccess && (
        <div className="p-4 rounded-control bg-state-success-soft border border-state-success/30 text-state-success text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-state-success shrink-0" />
          <span>Profile contact details updated successfully.</span>
        </div>
      )}

      {/* Main Profile Header Card */}
      <div className="panel-card rounded-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-control bg-accent-soft text-accent font-bold text-xl flex items-center justify-center shrink-0">
            {student.fullName[0]}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-bold tracking-tight text-ink">{student.fullName}</h3>
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-control ${
                  student.isVerified
                    ? 'bg-state-success-soft text-state-success border border-state-success/30'
                    : 'bg-state-warning-soft text-state-warning border border-state-warning/30'
                }`}
              >
                {student.isVerified ? '✓ TPO Verified' : 'Pending Verification'}
              </span>
            </div>
            <p className="text-xs text-ink-muted mt-0.5">
              Registration No: <span className="font-semibold text-ink font-mono">{student.regNumber}</span> • Batch of {student.graduationYear}
            </p>
            <p className="text-xs text-accent font-medium mt-0.5">
              {student.departmentName} ({student.departmentCode})
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn-secondary text-xs py-2 px-3.5 rounded-control flex items-center space-x-1.5"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>{isEditing ? 'Cancel Edit' : 'Edit Contact Details'}</span>
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSave} className="panel-card bg-accent-soft/20 border-accent/30 rounded-card p-6 text-xs space-y-4">
          <h4 className="font-semibold text-ink text-sm">Update Permitted Contact Information</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-ink-secondary mb-1">Full Legal Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 rounded-control border border-border-subtle focus:outline-none focus:border-accent bg-surface text-ink text-xs"
              />
            </div>
            <div>
              <label className="block font-medium text-ink-secondary mb-1">Contact Mobile</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-control border border-border-subtle focus:outline-none focus:border-accent bg-surface text-ink text-xs"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn-secondary text-xs py-1.5 px-3 rounded-control"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="btn-primary text-xs py-1.5 px-4 rounded-control"
            >
              {isPending ? 'Saving...' : 'Save Updates'}
            </button>
          </div>
        </form>
      )}

      {/* Grid: Academic Record & Institutional Verification */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Official Academic Details (Read-only / verified by institution) */}
        <div className="panel-card rounded-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <h4 className="font-semibold text-sm text-ink flex items-center">
              <GraduationCap className="w-4 h-4 text-accent mr-2" />
              <span>Academic Performance Record</span>
            </h4>
            <span className="text-[10px] text-ink-tertiary">Locked for Audit</span>
          </div>

          <div className="grid grid-cols-2 gap-3.5 text-xs">
            <div className="bg-page p-3.5 rounded-control border border-border-subtle">
              <span className="text-ink-tertiary text-[11px] block font-medium">Cumulative CGPA</span>
              <span className="text-2xl font-bold text-accent mt-1 block tabular-nums">
                {student.cgpa.toFixed(2)}
              </span>
              <span className="text-[10px] text-ink-tertiary">Scale of 10.0</span>
            </div>

            <div className="bg-page p-3.5 rounded-control border border-border-subtle">
              <span className="text-ink-tertiary text-[11px] block font-medium">Active Backlogs</span>
              <span className={`text-2xl font-bold mt-1 block tabular-nums ${student.activeBacklogs > 0 ? 'text-state-warning' : 'text-state-success'}`}>
                {student.activeBacklogs}
              </span>
              <span className="text-[10px] text-ink-tertiary">Audited semester 1-6</span>
            </div>

            <div className="bg-page p-3.5 rounded-control border border-border-subtle">
              <span className="text-ink-tertiary text-[11px] block font-medium">Current Semester</span>
              <span className="text-base font-semibold text-ink mt-1 block">
                Semester {student.semester}
              </span>
              <span className="text-[10px] text-ink-tertiary">4th Year B.Tech</span>
            </div>

            <div className="bg-page p-3.5 rounded-control border border-border-subtle">
              <span className="text-ink-tertiary text-[11px] block font-medium">Graduation Batch</span>
              <span className="text-base font-semibold text-ink mt-1 block">
                {student.graduationYear}
              </span>
              <span className="text-[10px] text-ink-tertiary">Campus Pass-out</span>
            </div>
          </div>

          <div className="text-[11px] text-ink-muted bg-page p-3 rounded-control border border-border-subtle leading-relaxed">
            Note: In accordance with university placement policy, CGPA and backlog modifications can only be recorded by authorized TPO administrators.
          </div>
        </div>

        {/* Verification Status Card */}
        <div className="panel-card rounded-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
            <h4 className="font-semibold text-sm text-ink flex items-center">
              <ShieldCheck className="w-4 h-4 text-accent mr-2" />
              <span>TPO Verification Status</span>
            </h4>
            <span className="text-[10px] font-medium text-state-success">Secure Audit</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-border-subtle">
              <span className="text-ink-secondary">Verification Outcome:</span>
              <span className="font-medium text-state-success">Verified & Approved</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border-subtle">
              <span className="text-ink-secondary">Verified By:</span>
              <span className="font-semibold text-ink">{student.verifiedBy || 'Dr. K. Ramanathan (TPO)'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-border-subtle">
              <span className="text-ink-secondary">Verification Date:</span>
              <span className="font-medium text-ink-muted">
                {student.verifiedAt ? new Date(student.verifiedAt).toLocaleDateString() : '2026-09-01'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-ink-secondary">Institutional Placement Status:</span>
              <span className="font-semibold text-accent">{student.placementStatus}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-control bg-accent-soft/30 border border-accent/20 text-[11px] text-accent leading-relaxed">
            Your credentials have passed verification checks. You have full clearance to participate in campus interviews and online assessments.
          </div>
        </div>
      </div>

      {/* Projects and Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="panel-card rounded-card p-6">
          <h4 className="font-semibold text-sm text-ink mb-3 flex items-center">
            <BookOpen className="w-4 h-4 text-accent mr-2" />
            <span>Key Academic & Personal Projects</span>
          </h4>
          <ul className="space-y-2 text-xs">
            {student.projects.map((proj, idx) => (
              <li key={idx} className="p-3 bg-page rounded-control border border-border-subtle text-ink font-medium">
                • {proj}
              </li>
            ))}
          </ul>
        </div>

        <div className="panel-card rounded-card p-6">
          <h4 className="font-semibold text-sm text-ink mb-3 flex items-center">
            <Award className="w-4 h-4 text-accent mr-2" />
            <span>Verified Certifications</span>
          </h4>
          <ul className="space-y-2 text-xs">
            {student.certifications.map((cert, idx) => (
              <li key={idx} className="p-3 bg-page rounded-control border border-border-subtle text-ink font-medium">
                ✓ {cert}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
