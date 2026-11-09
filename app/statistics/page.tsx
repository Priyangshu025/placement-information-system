import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PlacementCharts from '@/components/PlacementCharts';
import ExportButton from '@/components/ExportButton';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { Award, TrendingUp, Users, Building2, BarChart2 } from 'lucide-react';

export default async function StatisticsPage() {
  const currentUser = await getCurrentUser();
  const stats = db.getStats();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentRole={currentUser?.role} />

      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">
            Placement Analytics & Metrics
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold mt-2 tracking-tight">
            Institutional Placement Statistics
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Transparent recruitment benchmarks, branch-wise placement percentages, salary distributions, and hiring trends for Academic Year 2026-2027.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* KPI Cards (Section 8 of PDF) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Total Students</span>
            <div className="text-2xl font-bold text-slate-900 mt-1">{stats.totalStudents}</div>
            <span className="text-[11px] text-slate-400">Class of 2027</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Registered Pool</span>
            <div className="text-2xl font-bold text-blue-600 mt-1">{stats.registeredStudents}</div>
            <span className="text-[11px] text-slate-400">Profile Verified</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Placed Students</span>
            <div className="text-2xl font-bold text-emerald-600 mt-1">{stats.placedStudents}</div>
            <span className="text-[11px] text-emerald-600 font-medium">82.5% Success Rate</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Hiring Partners</span>
            <div className="text-2xl font-bold text-purple-600 mt-1">{stats.participatingCompanies}+</div>
            <span className="text-[11px] text-slate-400">Participated</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Highest Package</span>
            <div className="text-2xl font-bold text-indigo-600 mt-1">₹{stats.highestPackageLPA} LPA</div>
            <span className="text-[11px] text-indigo-600 font-medium">Google SDE-1</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Average Package</span>
            <div className="text-2xl font-bold text-amber-600 mt-1">₹{stats.averagePackageLPA} LPA</div>
            <span className="text-[11px] text-slate-400">Median ₹8.5 LPA</span>
          </div>
        </div>

        {/* Charts Section */}
        <PlacementCharts stats={stats} />

        {/* Department Breakdown Table */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Departmental Placement Breakdown
              </h3>
              <p className="text-xs text-slate-500">
                Cohort strength, student selections, placement rate, and average salary package.
              </p>
            </div>
            <ExportButton
              filename="Departmental_Placement_Breakdown_2026.csv"
              headers={['Department', 'Enrolled', 'Placed', 'Rate %', 'Avg LPA']}
              data={stats.departmentWise.map((d) => [d.department, d.total, d.placed, d.rate, d.avgLPA])}
              label="Export CSV"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4 text-center">Enrolled</th>
                  <th className="py-3 px-4 text-center">Placed</th>
                  <th className="py-3 px-4 text-center">Placement Rate</th>
                  <th className="py-3 px-4 text-center">Average Package</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stats.departmentWise.map((d) => (
                  <tr key={d.department} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-900">{d.department}</td>
                    <td className="py-3 px-4 text-center text-slate-600">{d.total}</td>
                    <td className="py-3 px-4 text-center font-semibold text-emerald-600">{d.placed}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center space-x-2">
                        <div className="w-16 bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${d.rate}%` }}
                          ></div>
                        </div>
                        <span className="font-semibold text-slate-800">{d.rate}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900">₹{d.avgLPA} LPA</td>
                    <td className="py-3 px-4 text-right">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Active Drive
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

