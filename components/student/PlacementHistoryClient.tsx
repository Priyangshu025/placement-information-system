'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { PlacementRecord, StudentProfile } from '@/lib/types';
import { Award, Sparkles, Download, CheckCircle2, Building2, Calendar, FileText } from 'lucide-react';

interface PlacementHistoryClientProps {
  student: StudentProfile;
  placements: PlacementRecord[];
}

export default function PlacementHistoryClient({
  student,
  placements,
}: PlacementHistoryClientProps) {
  const myPlacements = placements.filter((p) => p.studentId === student.id);
  const isPlaced = myPlacements.length > 0 || student.placementStatus === 'Placed';

  useEffect(() => {
    if (isPlaced) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isPlaced]);

  const triggerCelebration = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
    });
  };

  return (
    <div className="space-y-6">
      {/* Placed celebration banner if placed */}
      {isPlaced ? (
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Officially Placed!</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black">
                Congratulations, {student.fullName}!
              </h3>
              <p className="mt-2 text-emerald-100 text-xs sm:text-sm max-w-xl">
                You have officially achieved campus placement. Your confirmed offer is logged with the Training & Placement Cell.
              </p>
            </div>

            <button
              onClick={triggerCelebration}
              className="bg-white text-emerald-800 hover:bg-emerald-50 font-bold px-5 py-3 rounded-2xl text-xs shadow-lg transition-transform hover:scale-105 shrink-0 flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Celebrate Again 🎊</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Placement In Progress</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            You are actively participating in recruitment drives. Once a company extends an official offer and updates the recruiter console, it will appear here.
          </p>
          <div className="pt-2">
            <Link
              href="/student/opportunities"
              className="inline-flex items-center px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-sm hover:bg-indigo-700"
            >
              Browse Open Drives
            </Link>
          </div>
        </div>
      )}

      {/* Confirmed Offer Records */}
      {myPlacements.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">Confirmed Placement Records</h3>
          {myPlacements.map((plc) => (
            <div
              key={plc.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <Building2 className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-lg font-bold text-slate-900">{plc.companyName}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Offer Accepted
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-indigo-600 mt-0.5">{plc.jobTitle}</p>
                  <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
                    <span>Academic Year: {plc.academicYear}</span>
                    <span>•</span>
                    <span>Placed on {new Date(plc.placementDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <div className="text-left md:text-right">
                  <span className="text-[11px] text-slate-400 block font-medium">Offered CTC Package</span>
                  <span className="text-2xl font-black text-slate-900">₹{plc.packageLPA} LPA</span>
                </div>

                <button
                  onClick={() => alert(`Downloading verified Offer Letter for ${plc.companyName}...`)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm transition-colors flex items-center space-x-2"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Download Offer Letter</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

