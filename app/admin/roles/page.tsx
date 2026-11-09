import React from 'react';
import { ShieldCheck, Check, X } from 'lucide-react';

export default function AdminRolesPage() {
  const permissions = [
    { module: 'View Public Drives & Statistics', student: true, tpo: true, recruiter: true, admin: true },
    { module: 'Apply for Campus Vacancy', student: true, tpo: false, recruiter: false, admin: false },
    { module: 'Upload & Parse Resume', student: true, tpo: false, recruiter: false, admin: false },
    { module: 'Verify Student CGPA / Backlogs', student: false, tpo: true, recruiter: false, admin: true },
    { module: 'Onboard & Approve Companies', student: false, tpo: true, recruiter: false, admin: true },
    { module: 'Publish Job Vacancies', student: false, tpo: true, recruiter: true, admin: true },
    { module: 'Shortlist & ATS Stage Changes', student: false, tpo: true, recruiter: true, admin: true },
    { module: 'Schedule Interviews & Meet Links', student: false, tpo: true, recruiter: true, admin: true },
    { module: 'Export Placement Reports (CSV)', student: false, tpo: true, recruiter: true, admin: true },
    { module: 'Manage Departments & Sessions', student: false, tpo: false, recruiter: false, admin: true },
    { module: 'View Immutable Audit Trails', student: false, tpo: false, recruiter: false, admin: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Role-Based Access Control (RBAC) Matrix</h2>
        <p className="text-xs text-slate-500 mt-1">
          Institutional permission policies enforced across client routes and server actions.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <span className="text-xs font-bold text-slate-700">RBAC Enforcement Table</span>
          <span className="text-[11px] text-slate-400">Strict Server-side Token & Role Validation</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">System Operation / Module</th>
                <th className="py-3 px-4 text-center">Student</th>
                <th className="py-3 px-4 text-center">TPO Officer</th>
                <th className="py-3 px-4 text-center">Recruiter</th>
                <th className="py-3 px-4 text-center">Super Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissions.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-800">{p.module}</td>
                  <td className="py-3 px-4 text-center">
                    {p.student ? (
                      <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-slate-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {p.tpo ? (
                      <Check className="w-4 h-4 text-purple-600 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-slate-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {p.recruiter ? (
                      <Check className="w-4 h-4 text-amber-600 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-slate-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {p.admin ? (
                      <Check className="w-4 h-4 text-rose-600 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-slate-300 mx-auto" />
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

