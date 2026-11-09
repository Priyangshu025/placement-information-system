'use client';

import React, { useState, useTransition } from 'react';
import { StudentProfile } from '@/lib/types';
import { verifyStudentProfile } from '@/app/actions/pis-actions';
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  FileText,
  Download,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface StudentsClientProps {
  students: StudentProfile[];
}

export default function StudentsClient({ students }: StudentsClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'VERIFIED' | 'UNVERIFIED'>('ALL');
  const [isPending, startTransition] = useTransition();
  const [verifiedId, setVerifiedId] = useState<string | null>(null);

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.regNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.institutionalEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = departmentFilter === 'ALL' || s.departmentCode === departmentFilter;

    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'VERIFIED' && s.isVerified) ||
      (statusFilter === 'UNVERIFIED' && !s.isVerified);

    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleVerify = (studentId: string) => {
    startTransition(async () => {
      const res = await verifyStudentProfile(studentId);
      if (res.success) {
        setVerifiedId(studentId);
        setTimeout(() => setVerifiedId(null), 3000);
      }
    });
  };

  const handleExportCSV = () => {
    const headers = ['Reg Number', 'Full Name', 'Department', 'Semester', 'CGPA', 'Backlogs', 'Graduation Year', 'Verified', 'Placement Status'];
    const rows = filteredStudents.map((s) => [
      s.regNumber,
      `"${s.fullName}"`,
      s.departmentCode,
      s.semester,
      s.cgpa,
      s.activeBacklogs,
      s.graduationYear,
      s.isVerified ? 'YES' : 'NO',
      s.placementStatus,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Students_Cohort_Export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {verifiedId && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Student academic credentials verified and authorized for campus drives.</span>
        </div>
      )}

      {/* Filter and Action Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student name, roll no, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white font-medium"
          >
            <option value="ALL">All Departments</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="AIDS">AIDS</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white font-medium"
          >
            <option value="ALL">All Statuses</option>
            <option value="VERIFIED">Verified Only</option>
            <option value="UNVERIFIED">Pending Verification</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center space-x-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-purple-300" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <span className="text-xs font-bold text-slate-700">
            Showing {filteredStudents.length} Students
          </span>
          <span className="text-[11px] text-slate-400">
            Official Academic Record Registry
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Roll No</th>
                <th className="py-3 px-4">Full Name</th>
                <th className="py-3 px-4">Branch</th>
                <th className="py-3 px-4 text-center">CGPA</th>
                <th className="py-3 px-4 text-center">Backlogs</th>
                <th className="py-3 px-4 text-center">Verification</th>
                <th className="py-3 px-4 text-center">Placement</th>
                <th className="py-3 px-4 text-right">Verification Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-mono font-bold text-slate-800">{s.regNumber}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{s.fullName}</span>
                    <span className="text-[11px] text-slate-400">{s.institutionalEmail}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      {s.departmentCode}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-indigo-600">
                    {s.cgpa.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`font-semibold ${s.activeBacklogs > 0 ? 'text-amber-600' : 'text-slate-500'}`}>
                      {s.activeBacklogs}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {s.isVerified ? (
                      <span className="inline-flex items-center text-emerald-700 font-semibold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-amber-700 font-semibold text-[11px]">
                        <AlertCircle className="w-3.5 h-3.5 mr-1 text-amber-500" />
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        s.placementStatus === 'Placed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {s.placementStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {!s.isVerified ? (
                      <button
                        onClick={() => handleVerify(s.id)}
                        disabled={isPending}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center space-x-1 ml-auto"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verify Profile</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">
                        Audited by {s.verifiedBy?.split(' ')[0]}
                      </span>
                    )}
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

