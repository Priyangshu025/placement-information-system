import React from 'react';
import { Calendar, Plus, Users, Award } from 'lucide-react';

export default function AdminAcademicSessionsPage() {
  const sessions = [
    { year: '2026-2027', name: 'Graduating Batch 2027', status: 'Active (Ongoing Placement Season)', enrolled: 1750, placed: 850 },
    { year: '2025-2026', name: 'Graduating Batch 2026', status: 'Archived (Completed)', enrolled: 1680, placed: 815 },
    { year: '2024-2025', name: 'Graduating Batch 2025', status: 'Archived (Completed)', enrolled: 1610, placed: 780 },
    { year: '2027-2028', name: 'Pre-Final Batch 2028 (Internships)', status: 'Pre-Placement Drives Active', enrolled: 1820, placed: 120 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Academic Sessions & Cohort Batches</h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage academic years, batch enrollment cycles, and recruitment season timeframes.
          </p>
        </div>

        <button
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Academic Session</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sessions.map((sess) => (
          <div
            key={sess.year}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-slate-900 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-rose-600" />
                  <span>Academic Session {sess.year}</span>
                </span>
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    sess.status.includes('Active')
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {sess.status}
                </span>
              </div>

              <h4 className="font-bold text-base text-slate-800 mt-2">{sess.name}</h4>

              <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-500 text-[11px] block">Batch Enrollment</span>
                  <span className="font-bold text-slate-800 text-base">{sess.enrolled} Students</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-500 text-[11px] block">Placement Selections</span>
                  <span className="font-bold text-emerald-600 text-base">{sess.placed} Placed</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">Institutional Cohort</span>
              <span className="font-semibold text-rose-600 hover:text-rose-800 cursor-pointer">
                View Cohort Reports →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
