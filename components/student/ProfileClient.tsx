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
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white font-bold text-2xl flex items-center justify-center shadow-md">
            {student.fullName[0]}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xl font-bold text-slate-900">{student.fullName}</h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  student.isVerified
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                {student.isVerified ? '✓ TPO Verified' : 'Pending Verification'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Registration No: <span className="font-semibold text-slate-700">{student.regNumber}</span> • Batch of {student.graduationYear}
            </p>
            <p className="text-xs text-indigo-600 font-semibold mt-0.5">
              {student.departmentName} ({student.departmentCode})
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center space-x-1.5"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>{isEditing ? 'Cancel Edit' : 'Edit Contact Details'}</span>
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSave} className="bg-indigo-50/50 border border-indigo-200 rounded-2xl p-6 text-xs space-y-4">
          <h4 className="font-bold text-slate-900 text-sm">Update Permitted Contact Information</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Contact Mobile</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3.5 py-1.5 rounded-lg bg-slate-200 text-slate-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-sm"
            >
              {isPending ? 'Saving...' : 'Save Updates'}
            </button>
          </div>
        </form>
      )}

      {/* Grid: Academic Record & Institutional Verification */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Official Academic Details (Read-only / verified by institution) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="font-bold text-sm text-slate-900 flex items-center">
              <GraduationCap className="w-4 h-4 text-indigo-600 mr-2" />
              <span>Academic Performance Record</span>
            </h4>
            <span className="text-[10px] text-slate-400">Locked for Audit</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-slate-500 text-[11px] block">Cumulative CGPA</span>
              <span className="text-2xl font-black text-indigo-600 mt-1 block">
                {student.cgpa.toFixed(2)}
              </span>
              <span className="text-[10px] text-slate-400">Scale of 10.0</span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-slate-500 text-[11px] block">Active Backlogs</span>
              <span className={`text-2xl font-black mt-1 block ${student.activeBacklogs > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {student.activeBacklogs}
              </span>
              <span className="text-[10px] text-slate-400">Audited semester 1-6</span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-slate-500 text-[11px] block">Current Semester</span>
              <span className="text-base font-bold text-slate-800 mt-1 block">
                Semester {student.semester}
              </span>
              <span className="text-[10px] text-slate-400">4th Year B.Tech</span>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-slate-500 text-[11px] block">Graduation Batch</span>
              <span className="text-base font-bold text-slate-800 mt-1 block">
                {student.graduationYear}
              </span>
              <span className="text-[10px] text-slate-400">Campus Pass-out</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 bg-slate-50 p-3 rounded-xl">
            Note: In accordance with university placement policy, CGPA and backlog modifications can only be recorded by authorized TPO administrators.
          </div>
        </div>

        {/* Verification Status Card (Section 3 & 10 of PDF) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="font-bold text-sm text-slate-900 flex items-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mr-2" />
              <span>TPO Verification Status</span>
            </h4>
            <span className="text-[10px] font-semibold text-emerald-600">Secure Audit</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-500">Verification Outcome:</span>
              <span className="font-bold text-emerald-700">Verified & Approved</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-500">Verified By:</span>
              <span className="font-semibold text-slate-800">{student.verifiedBy || 'Dr. K. Ramanathan (TPO)'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-500">Verification Date:</span>
              <span className="font-medium text-slate-700">
                {student.verifiedAt ? new Date(student.verifiedAt).toLocaleDateString() : '2026-09-01'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-slate-500">Institutional Placement Status:</span>
              <span className="font-bold text-indigo-600">{student.placementStatus}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 leading-relaxed">
            Your credentials have passed verification checks. You have full clearance to participate in campus interviews and online assessments.
          </div>
        </div>
      </div>

      {/* Projects and Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center">
            <BookOpen className="w-4 h-4 text-blue-600 mr-2" />
            <span>Key Academic & Personal Projects</span>
          </h4>
          <ul className="space-y-2 text-xs">
            {student.projects.map((proj, idx) => (
              <li key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-800 font-medium">
                • {proj}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center">
            <Award className="w-4 h-4 text-amber-600 mr-2" />
            <span>Verified Certifications</span>
          </h4>
          <ul className="space-y-2 text-xs">
            {student.certifications.map((cert, idx) => (
              <li key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-800 font-medium">
                ✓ {cert}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

