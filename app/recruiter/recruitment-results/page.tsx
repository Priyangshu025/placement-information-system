import React from 'react';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { Award, CheckCircle2, Building2, Send, Download } from 'lucide-react';
import ExportButton from '@/components/ExportButton';

export default async function RecruiterResultsPage() {
  const currentUser = await getCurrentUser();
  const company = db.getCompanies().find((c) => c.recruiterUserId === currentUser?.id) || db.getCompanies()[1];
  const companyApps = db.getApplications().filter((a) => a.companyName === company.name);
  const selectedHires = companyApps.filter((a) => a.status === 'Selected');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Campus Selections & Offer Extension</h2>
          <p className="text-xs text-slate-500 mt-1">
            Confirmed hires and final selection lists submitted to the institutional Training & Placement Office.
          </p>
        </div>

        <ExportButton
          filename={`${company.name}_Selected_Hires_2026.csv`}
          headers={['Candidate', 'Roll No', 'Department', 'Role', 'Package LPA', 'Status']}
          data={selectedHires.map((h) => [
            `"${h.studentName}"`,
            h.studentRegNo,
            h.studentDepartment,
            `"${h.jobTitle}"`,
            h.packageLPA,
            'OFFER EXTENDED',
          ])}
          label="Export Hires List"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Offers Extended</span>
          <div className="text-3xl font-extrabold text-emerald-600 mt-1">{selectedHires.length} Hires</div>
          <span className="text-[11px] text-slate-400">Class of 2027</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Placement Cell Audit Status</span>
          <div className="text-xl font-bold text-indigo-600 mt-1">Synchronized with Registry</div>
          <span className="text-[11px] text-slate-400">Logged in institutional database</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <span className="text-xs font-bold text-slate-700">Official Candidate Offers ({selectedHires.length})</span>
          <span className="text-[11px] text-slate-400">Recorded for placement conversion</span>
        </div>

        {selectedHires.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No candidates have been marked as 'Selected' yet. Advance candidates from the ATS shortlisting board.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Candidate</th>
                  <th className="py-3 px-4">Roll Number</th>
                  <th className="py-3 px-4">Branch</th>
                  <th className="py-3 px-4">Offered Designation</th>
                  <th className="py-3 px-4 text-center">Package CTC</th>
                  <th className="py-3 px-4 text-right">Offer Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedHires.map((hire) => (
                  <tr key={hire.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-900">{hire.studentName}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{hire.studentRegNo}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                        {hire.studentDepartment}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-800">{hire.jobTitle}</td>
                    <td className="py-3 px-4 text-center font-bold text-emerald-600 text-sm">
                      ₹{hire.packageLPA} LPA
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                        Offer Extended
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

