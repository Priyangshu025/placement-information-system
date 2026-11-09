import React from 'react';
import { db } from '@/lib/db';
import PlacementCharts from '@/components/PlacementCharts';
import ExportButton from '@/components/ExportButton';
import { BarChart2, Download, TrendingUp, Award, Building2 } from 'lucide-react';

export default async function TpoReportsPage() {
  const stats = db.getStats();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Placement Analytics & Institutional Reports</h2>
          <p className="text-xs text-slate-500 mt-1">
            Comprehensive analysis of hiring conversions, salary percentiles, and departmental employment metrics.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <ExportButton
            filename="Department_Wise_Placement_Report_2026.csv"
            headers={['Department', 'Total Enrolled', 'Placed Students', 'Placement Rate %', 'Average LPA']}
            data={stats.departmentWise.map((d) => [
              d.department,
              d.total,
              d.placed,
              d.rate,
              d.avgLPA,
            ])}
            label="Export Dept Report"
          />
        </div>
      </div>

      {/* Interactive Charts */}
      <PlacementCharts stats={stats} />

      {/* Top Recruiters Leaderboard */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          Marquee Campus Recruiters (Offer Volume & Average CTC)
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Ranking of top corporate employers based on verified selections.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.topRecruiters.map((rec, idx) => (
            <div
              key={rec.name}
              className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">
                  #{idx + 1}
                </span>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{rec.name}</h4>
                  <span className="text-[11px] text-slate-500">{rec.offers} Confirmed Offers</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-indigo-600 block">₹{rec.avgPackage} LPA</span>
                <span className="text-[10px] text-slate-400">Avg Package</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

