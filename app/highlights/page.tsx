import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { Award, Star, Sparkles, Building2, ExternalLink } from 'lucide-react';

export default async function HighlightsPage() {
  const currentUser = await getCurrentUser();
  const placements = db.getPlacements();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentRole={currentUser?.role} />

      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider mb-4">
            <Star className="w-3.5 h-3.5 fill-amber-300" />
            <span>Campus Hall of Fame 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Placement Highlights & Star Achievers
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Celebrating outstanding student achievements, record-breaking corporate offers, and marquee hiring milestones.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Top Dream Offers Grid */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
            <Sparkles className="w-5 h-5 text-indigo-600 mr-2" />
            <span>Top Tier Placements & Dream Offers</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {placements.map((plc) => (
              <div
                key={plc.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none"></div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      ₹{plc.packageLPA} LPA
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {plc.academicYear}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900">{plc.studentName}</h3>
                  <span className="text-xs text-indigo-600 font-semibold block mb-2">
                    {plc.departmentCode} • {plc.regNumber}
                  </span>

                  <div className="bg-slate-50 p-3 rounded-xl mb-4 text-xs space-y-1">
                    <div className="font-semibold text-slate-800 flex items-center">
                      <Building2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      <span>{plc.companyName}</span>
                    </div>
                    <div className="text-slate-600">{plc.jobTitle}</div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-100">
                  <span>Offer Confirmed</span>
                  <span className="font-semibold text-emerald-600">Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recruiter Milestones Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
              Season Benchmark
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold mt-1">
              Over 850+ Offers Extended in 2026
            </h3>
            <p className="mt-2 text-indigo-100 text-sm max-w-xl">
              From high-frequency algorithmic fintech to autonomous electric mobility and enterprise cloud architecture, our students excel across critical sectors.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center">
              <div className="text-3xl font-extrabold">₹44 LPA</div>
              <div className="text-xs text-indigo-200 mt-1">Apex Package</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center">
              <div className="text-3xl font-extrabold">95%</div>
              <div className="text-xs text-indigo-200 mt-1">CSE / IT Placed</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

