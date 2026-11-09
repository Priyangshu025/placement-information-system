import React from 'react';
import { db } from '@/lib/db';
import { Calendar, Clock, ExternalLink, MapPin, Users, Building2 } from 'lucide-react';

export default async function TpoInterviewsPage() {
  const applications = db.getApplications();

  // Find all scheduled rounds
  const scheduledInterviews = applications.flatMap((app) =>
    app.stages
      .filter((s) => s.scheduledAt)
      .map((stg) => ({
        ...stg,
        studentName: app.studentName,
        studentRegNo: app.studentRegNo,
        studentDepartment: app.studentDepartment,
        companyName: app.companyName,
        jobTitle: app.jobTitle,
        applicationId: app.id,
      }))
  ).sort((a, b) => new Date(a.scheduledAt!).getTime() - new Date(b.scheduledAt!).getTime());

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Campus Interview & Assessment Schedule</h2>
        <p className="text-xs text-slate-500 mt-1">
          Calendar agenda of all upcoming virtual interviews, coding tests, and campus venue schedules.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scheduledInterviews.map((slot) => (
          <div
            key={slot.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                  {slot.stageName}
                </span>
                <span className="text-xs text-slate-500 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  {new Date(slot.scheduledAt!).toLocaleDateString()}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900">{slot.studentName}</h3>
              <p className="text-xs text-slate-500 mb-3 font-mono">{slot.studentRegNo} • {slot.studentDepartment}</p>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs space-y-1.5 mb-4">
                <div className="flex items-center text-slate-800 font-semibold">
                  <Building2 className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                  <span>{slot.companyName}</span>
                </div>
                <div className="text-slate-600">{slot.jobTitle}</div>
                {slot.remarks && (
                  <div className="text-[11px] text-purple-700 italic pt-1 border-t border-slate-200/60">
                    "{slot.remarks}"
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
                {new Date(slot.scheduledAt!).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>

              {slot.venueOrLink && (
                <a
                  href={slot.venueOrLink}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold flex items-center space-x-1"
                >
                  <span>Join Session</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

