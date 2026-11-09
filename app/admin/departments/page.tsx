import React from 'react';
import { db } from '@/lib/db';
import { Building, Plus, Users, GraduationCap } from 'lucide-react';

export default async function AdminDepartmentsPage() {
  const departments = db.getDepartments();
  const students = db.getStudents();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Academic Engineering Departments</h2>
          <p className="text-xs text-slate-500 mt-1">
            Official branch registry used for automated job eligibility mapping and departmental analytics.
          </p>
        </div>

        <button
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center space-x-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Department</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => {
          const deptStudents = students.filter((s) => s.departmentCode === dept.code);

          return (
            <div
              key={dept.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-sm font-black px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
                    {dept.code}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Department ID: {dept.id}</span>
                </div>

                <h3 className="font-bold text-base text-slate-900 mt-2">{dept.name}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Active academic division accredited for B.Tech & Campus Recruitment.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-semibold flex items-center">
                  <Users className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  <span>{deptStudents.length} Active Students</span>
                </span>
                <span className="font-semibold text-emerald-600">Active</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
