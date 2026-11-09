import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import {
  ShieldCheck,
  Users,
  Building,
  History,
  CheckCircle2,
  Server,
  Lock,
  ArrowRight
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const users = db.getUsers();
  const departments = db.getDepartments();
  const auditLogs = db.getAuditLogs();
  const stats = db.getStats();

  const studentsCount = users.filter((u) => u.role === 'student').length;
  const tpoCount = users.filter((u) => u.role === 'tpo').length;
  const recruiterCount = users.filter((u) => u.role === 'recruiter').length;
  const adminCount = users.filter((u) => u.role === 'admin').length;

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-800 via-rose-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-rose-200">
            System Administration • Governance & Audits
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
            Platform Master Console
          </h2>
          <p className="mt-2 text-rose-100 text-xs sm:text-sm max-w-xl">
            System running normal. Database state synchronized across {departments.length} engineering branches and {users.length} managed accounts.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/audit-logs"
            className="bg-white text-rose-900 hover:bg-rose-50 font-bold px-4 py-2.5 rounded-xl text-xs shadow-sm transition-all"
          >
            Audit Logs ({auditLogs.length})
          </Link>
          <Link
            href="/admin/system-settings"
            className="bg-rose-950/60 hover:bg-rose-950 border border-rose-400/30 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition-all"
          >
            Platform Policies
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Total Accounts</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{users.length} Users</div>
          <span className="text-[11px] text-slate-400">
            {studentsCount} Students • {tpoCount} TPOs • {recruiterCount} Recruiters
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Academic Depts</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Building className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-purple-600 mt-2">{departments.length} Branches</div>
          <span className="text-[11px] text-slate-400">All configured in database</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">System Security</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-600 mt-2">Active & Secure</div>
          <span className="text-[11px] text-emerald-600 font-medium">RBAC Verification Active</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Audit Events</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-rose-600 mt-2">{auditLogs.length} Events</div>
          <span className="text-[11px] text-slate-400">Full audit trail preserved</span>
        </div>
      </div>

      {/* Recent Audit Activities */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Immutable Audit Trail</h3>
            <p className="text-xs text-slate-500">Every sensitive action, verification, and stage update is recorded.</p>
          </div>
          <Link
            href="/admin/audit-logs"
            className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center"
          >
            <span>All Logs</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="space-y-3 text-xs">
          {auditLogs.slice(0, 5).map((log) => (
            <div
              key={log.id}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900">{log.action}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                    {log.entityType}
                  </span>
                </div>
                <p className="text-slate-600 mt-0.5">{log.details}</p>
                <div className="text-[10px] text-slate-400 mt-1">
                  Actor: <span className="font-medium text-slate-700">{log.actorName}</span> ({log.actorRole})
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-mono shrink-0">
                {new Date(log.timestamp).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

