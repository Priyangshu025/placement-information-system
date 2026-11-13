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
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  }, [isPlaced]);

  const triggerCelebration = () => {
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.5 },
    });
  };

  return (
    <div className="space-y-6">
      {/* Placed celebration banner if placed */}
      {isPlaced ? (
        <div className="bg-accent text-white rounded-feature p-8 border border-accent relative overflow-hidden shadow-xs">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-control bg-white/15 text-white text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Officially Placed</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Congratulations, {student.fullName}
              </h3>
              <p className="mt-2 text-white/80 text-xs sm:text-sm max-w-xl leading-relaxed">
                You have officially achieved campus placement. Your confirmed offer is logged with the Training & Placement Cell.
              </p>
            </div>

            <button
              onClick={triggerCelebration}
              className="bg-white text-ink hover:bg-page font-medium px-4 py-2.5 rounded-control text-xs shadow-xs transition-colors shrink-0 flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Celebrate Again</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="panel-card rounded-card p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-control bg-accent-soft text-accent flex items-center justify-center mx-auto">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-ink">Placement In Progress</h3>
          <p className="text-xs text-ink-muted max-w-md mx-auto leading-relaxed">
            You are actively participating in recruitment drives. Once a company extends an official offer and updates the recruiter console, it will appear here.
          </p>
          <div className="pt-2">
            <Link
              href="/student/opportunities"
              className="btn-primary text-xs py-2 px-4 rounded-control inline-flex items-center space-x-1.5"
            >
              Browse Open Drives
            </Link>
          </div>
        </div>
      )}

      {/* Confirmed Offer Records */}
      {myPlacements.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-ink">Confirmed Placement Records</h3>
          {myPlacements.map((plc) => (
            <div
              key={plc.id}
              className="panel-card rounded-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-control bg-page border border-border-subtle text-accent flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-base font-semibold text-ink">{plc.companyName}</h4>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-control bg-state-success-soft text-state-success border border-state-success/30">
                      Offer Accepted
                    </span>
                  </div>
                  <p className="text-xs font-medium text-accent mt-0.5">{plc.jobTitle}</p>
                  <div className="flex items-center space-x-3 text-xs text-ink-muted mt-1">
                    <span>Academic Year: {plc.academicYear}</span>
                    <span>•</span>
                    <span>Placed on {new Date(plc.placementDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                <div className="text-left md:text-right">
                  <span className="text-[11px] text-ink-tertiary block font-medium">Offered CTC Package</span>
                  <span className="text-2xl font-bold text-ink tabular-nums">₹{plc.packageLPA} LPA</span>
                </div>

                <button
                  onClick={() => alert(`Downloading verified Offer Letter for ${plc.companyName}...`)}
                  className="btn-primary text-xs py-2 px-4 rounded-control flex items-center space-x-2"
                >
                  <Download className="w-3.5 h-3.5" />
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
