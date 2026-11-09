'use client';

import React, { useTransition } from 'react';
import { Application, ApplicationStage } from '@/lib/types';
import { advanceApplicationStage } from '@/app/actions/pis-actions';
import { CheckCircle2, ChevronRight, Sparkles, Building2, User } from 'lucide-react';

interface KanbanClientProps {
  applications: Application[];
}

const STAGES: ApplicationStage[] = [
  'Applied',
  'Resume Shortlisted',
  'Online Assessment',
  'Technical Interview',
  'HR Interview',
  'Selected',
];

export default function KanbanClient({ applications }: KanbanClientProps) {
  const [isPending, startTransition] = useTransition();

  const handleAdvance = (appId: string, currentStage: ApplicationStage) => {
    const currentIndex = STAGES.indexOf(currentStage);
    if (currentIndex >= STAGES.length - 1) return;

    const nextStage = STAGES[currentIndex + 1];

    startTransition(async () => {
      await advanceApplicationStage(
        appId,
        nextStage,
        `Advanced from ${currentStage} to ${nextStage} via ATS Board.`
      );
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500">
        Click the forward button on any candidate card to advance them into the subsequent recruitment stage.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageApps = applications.filter((a) => a.status === stage);

          return (
            <div
              key={stage}
              className="bg-slate-200/60 rounded-2xl p-3 flex flex-col min-w-[220px]"
            >
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="font-bold text-xs text-slate-800">{stage}</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-600 shadow-2xs">
                  {stageApps.length}
                </span>
              </div>

              <div className="space-y-2.5 flex-1">
                {stageApps.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs hover:shadow-sm transition-all text-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900 truncate">{app.studentName}</span>
                        <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded">
                          {app.studentDepartment}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">{app.studentRegNo}</div>
                      <div className="text-[11px] text-indigo-600 font-semibold mt-1 truncate">
                        CGPA: {app.studentCGPA.toFixed(2)}
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">
                        {app.jobTitle}
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">
                        {new Date(app.submittedAt).toLocaleDateString()}
                      </span>

                      {stage !== 'Selected' && (
                        <button
                          onClick={() => handleAdvance(app.id, app.status)}
                          disabled={isPending}
                          className="px-2 py-1 rounded bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-[10px] flex items-center space-x-0.5"
                          title="Advance to next round"
                        >
                          <span>Next</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                      {stage === 'Selected' && (
                        <span className="text-[10px] font-bold text-emerald-600 flex items-center">
                          <CheckCircle2 className="w-3 h-3 mr-0.5" />
                          <span>Hired</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {stageApps.length === 0 && (
                  <div className="h-28 flex items-center justify-center text-slate-400 text-xs italic border border-dashed border-slate-300 rounded-xl">
                    No candidates
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

