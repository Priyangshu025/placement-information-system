import React from 'react';
import { db } from '@/lib/db';
import { History, Shield, Download, Search } from 'lucide-react';
import ExportButton from '@/components/ExportButton';

export default async function AdminAuditLogsPage() {
  const auditLogs = db.getAuditLogs();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">System Security & Audit Trail</h2>
          <p className="text-xs text-slate-500 mt-1">
            Immutable log of all administrative verifications, company approvals, stage advances, and policy updates.
          </p>
        </div>

        <ExportButton
          filename={`System_Audit_Trail_${Date.now()}.csv`}
          headers={['Event ID', 'Action', 'Entity Type', 'Entity ID', 'Actor Name', 'Actor Role', 'Details', 'Timestamp']}
          data={auditLogs.map((l) => [
            l.id,
            l.action,
            l.entityType,
            l.entityId,
            `"${l.actorName}"`,
            l.actorRole,
            `"${l.details}"`,
            l.timestamp,
          ])}
          label="Export Audit Trail (CSV)"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
          <span className="text-xs font-bold text-slate-700">Audit Events ({auditLogs.length})</span>
          <span className="text-[11px] text-slate-400">Append-Only Cryptographic Log</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Action Event</th>
                <th className="py-3 px-4">Entity</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Details & Audit Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 text-slate-500 shrink-0">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">
                    <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      {log.entityType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700">
                    <span className="font-bold">{log.actorName}</span>{' '}
                    <span className="text-slate-400">({log.actorRole})</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-sans text-xs">
                    {log.details}
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

