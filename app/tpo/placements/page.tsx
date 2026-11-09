import React from 'react';
import { db } from '@/lib/db';
import { Award, Building2, Download, TrendingUp, Sparkles } from 'lucide-react';
import ExportButton from '@/components/ExportButton';

export default async function TpoPlacementsPage() {
  const placements = db.getPlacements();
  const stats = db.getStats();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Official Placement Registry</h2>
          <p className="text-xs text-slate-500 mt-1">
            Audited records of extended offers, verified compensation packages, and institutional selection master records.
          </p>
        </div>

        <ExportButton
          filename="Placement_Master_Register_2026.csv"
          headers={['Student Name', 'Reg Number', 'Department', 'Company', 'Role', 'Package LPA', 'Placement Date', 'Academic Year']}
          data={placements.map((p) => [
            `"${p.studentName}"`,
            p.regNumber,
            p.departmentCode,
            `"${p.companyName}"`,
            `"${p.jobTitle}"`,
            p.packageLPA,
            new Date(p.placementDate).toLocaleDateString(),
            p.academicYear,
          ])}
          label="Export Placement Register (CSV)"
        />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Total Confirmed Placements</span>
          <div className="text-3xl font-extrabold text-emerald-600 mt-1">{placements.length} Selections</div>
          <span className="text-[11px] text-slate-400">Class of 2026-2027</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Highest Offered CTC</span>
          <div className="text-3xl font-extrabold text-indigo-600 mt-1">₹{stats.highestPackageLPA} LPA</div>
          <span className="text-[11px] text-slate-400">Google SDE-1</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs text-slate-500 font-medium">Campus Average CTC</span>
          <div className="text-3xl font-extrabold text-purple-600 mt-1">₹{stats.averagePackageLPA} LPA</div>
          <span className="text-[11px] text-slate-400">Weighted Average across branches</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <span className="text-xs font-bold text-slate-700">
            Showing {placements.length} Records
          </span>
          <span className="text-[11px] text-slate-400">Verified by TPO Directorate</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Reg No</th>
                <th className="py-3 px-4">Branch</th>
                <th className="py-3 px-4">Recruiting Employer</th>
                <th className="py-3 px-4">Designation</th>
                <th className="py-3 px-4 text-center">Package</th>
                <th className="py-3 px-4">Date Placed</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {placements.map((plc) => (
                <tr key={plc.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900">{plc.studentName}</td>
                  <td className="py-3 px-4 font-mono text-slate-600">{plc.regNumber}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      {plc.departmentCode}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800">{plc.companyName}</td>
                  <td className="py-3 px-4 text-slate-600">{plc.jobTitle}</td>
                  <td className="py-3 px-4 text-center font-bold text-emerald-600 text-sm">
                    ₹{plc.packageLPA} LPA
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {new Date(plc.placementDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Confirmed Offer
                    </span>
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

