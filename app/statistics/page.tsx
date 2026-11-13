import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PlacementCharts from '@/components/PlacementCharts';
import ExportButton from '@/components/ExportButton';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';

export default async function StatisticsPage() {
  const currentUser = await getCurrentUser();
  const stats = db.getStats();

  return (
    <div className="flex flex-col min-h-screen bg-page">
      <Navbar currentRole={currentUser?.role} />

      <section className="border-b border-border-subtle bg-surface py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-semibold text-accent tracking-wider">
            Placement Analytics & Metrics
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-ink mt-2 tracking-tight">
            Institutional Placement Statistics
          </h1>
          <p className="mt-4 text-ink-muted max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Transparent recruitment benchmarks, branch-wise placement percentages, salary distributions, and hiring trends for Academic Year 2026-2027.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="panel-card rounded-card p-5">
            <span className="text-xs text-ink-muted font-medium">Total Students</span>
            <div className="text-2xl font-bold text-ink mt-1 tabular-nums">{stats.totalStudents}</div>
            <span className="text-[11px] text-ink-tertiary">Class of 2027</span>
          </div>

          <div className="panel-card rounded-card p-5">
            <span className="text-xs text-ink-muted font-medium">Registered Pool</span>
            <div className="text-2xl font-bold text-ink mt-1 tabular-nums">{stats.registeredStudents}</div>
            <span className="text-[11px] text-accent font-medium">Profile Verified</span>
          </div>

          <div className="panel-card rounded-card p-5">
            <span className="text-xs text-ink-muted font-medium">Placed Students</span>
            <div className="text-2xl font-bold text-accent mt-1 tabular-nums">{stats.placedStudents}</div>
            <span className="text-[11px] text-state-success font-medium">82.5% Success Rate</span>
          </div>

          <div className="panel-card rounded-card p-5">
            <span className="text-xs text-ink-muted font-medium">Hiring Partners</span>
            <div className="text-2xl font-bold text-ink mt-1 tabular-nums">{stats.participatingCompanies}+</div>
            <span className="text-[11px] text-ink-tertiary">Participated</span>
          </div>

          <div className="panel-card rounded-card p-5">
            <span className="text-xs text-ink-muted font-medium">Highest Package</span>
            <div className="text-2xl font-bold text-ink mt-1 tabular-nums">₹{stats.highestPackageLPA} LPA</div>
            <span className="text-[11px] text-ink-muted">Google SDE-1</span>
          </div>

          <div className="panel-card rounded-card p-5">
            <span className="text-xs text-ink-muted font-medium">Average Package</span>
            <div className="text-2xl font-bold text-ink mt-1 tabular-nums">₹{stats.averagePackageLPA} LPA</div>
            <span className="text-[11px] text-ink-tertiary">Median ₹8.5 LPA</span>
          </div>
        </div>

        {/* Charts Section */}
        <PlacementCharts stats={stats} />

        {/* Department Breakdown Table */}
        <div className="panel-card rounded-card p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h3 className="text-base font-semibold text-ink">
                Departmental Placement Breakdown
              </h3>
              <p className="text-xs text-ink-muted mt-0.5">
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
              <thead className="bg-page text-ink-secondary font-semibold border-b border-border-subtle">
                <tr>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4 text-center">Enrolled</th>
                  <th className="py-3 px-4 text-center">Placed</th>
                  <th className="py-3 px-4 text-center">Placement Rate</th>
                  <th className="py-3 px-4 text-right">Avg Package</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle text-ink">
                {stats.departmentWise.map((d) => (
                  <tr key={d.department} className="hover:bg-page/50 transition-colors">
                    <td className="py-3 px-4 font-medium">{d.department}</td>
                    <td className="py-3 px-4 text-center tabular-nums text-ink-secondary">{d.total}</td>
                    <td className="py-3 px-4 text-center tabular-nums font-medium text-state-success">{d.placed}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-control text-[11px] font-medium bg-accent-soft text-accent tabular-nums">
                        {d.rate}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right tabular-nums font-semibold text-ink">
                      ₹{d.avgLPA.toFixed(1)} LPA
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
