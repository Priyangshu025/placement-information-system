import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getCurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { Star, Sparkles, Building2 } from 'lucide-react';

export default async function HighlightsPage() {
  const currentUser = await getCurrentUser();
  const placements = db.getPlacements();

  return (
    <div className="flex flex-col min-h-screen bg-page">
      <Navbar currentRole={currentUser?.role} />

      <section className="border-b border-border-subtle bg-surface py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-control bg-accent-soft text-accent border border-accent/20 text-xs font-semibold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-accent" />
            <span>Campus Hall of Fame 2026</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-ink tracking-tight">
            Placement Highlights & Star Achievers
          </h1>
          <p className="mt-4 text-ink-muted max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Celebrating outstanding student achievements, record-breaking corporate offers, and marquee hiring milestones.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        {/* Top Dream Offers Grid */}
        <div>
          <h2 className="text-xl font-bold text-ink mb-6 flex items-center tracking-tight">
            <Sparkles className="w-5 h-5 text-accent mr-2" />
            <span>Top Tier Placements & Dream Offers</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {placements.map((plc) => (
              <div
                key={plc.id}
                className="panel-card rounded-card p-6 flex flex-col justify-between hover:border-accent/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-control bg-accent-soft text-accent border border-accent/20 tabular-nums">
                      ₹{plc.packageLPA} LPA
                    </span>
                    <span className="text-[11px] text-ink-tertiary font-medium">
                      {plc.academicYear}
                    </span>
                  </div>

                  <h3 className="font-semibold text-base text-ink tracking-tight">{plc.studentName}</h3>
                  <span className="text-xs text-accent font-medium block mb-3">
                    {plc.departmentCode} • {plc.regNumber}
                  </span>

                  <div className="bg-page p-3 rounded-control border border-border-subtle mb-4 text-xs space-y-1">
                    <div className="font-semibold text-ink flex items-center">
                      <Building2 className="w-3.5 h-3.5 mr-1 text-ink-tertiary" />
                      <span>{plc.companyName}</span>
                    </div>
                    <div className="text-ink-muted">{plc.jobTitle}</div>
                  </div>
                </div>

                <div className="text-[11px] text-ink-tertiary flex items-center justify-between pt-2 border-t border-border-subtle">
                  <span>Offer Confirmed</span>
                  <span className="font-medium text-state-success">Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recruiter Milestones Banner */}
        <div className="bg-accent text-white rounded-feature p-8 sm:p-12 border border-accent flex flex-col md:flex-row items-center justify-between gap-8 shadow-xs">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-white/80">
              Season Benchmark
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
              Over 850+ Offers Extended in 2026
            </h3>
            <p className="mt-2 text-white/80 text-sm max-w-xl leading-relaxed">
              From algorithmic high-frequency fintech to autonomous mobility and enterprise cloud architecture, our students excel across critical sectors.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <div className="bg-white/10 rounded-control p-4 text-center border border-white/20 min-w-[120px]">
              <div className="text-2xl sm:text-3xl font-bold tabular-nums">₹44 LPA</div>
              <div className="text-xs text-white/80 mt-1">Apex Package</div>
            </div>
            <div className="bg-white/10 rounded-control p-4 text-center border border-white/20 min-w-[120px]">
              <div className="text-2xl sm:text-3xl font-bold tabular-nums">95%</div>
              <div className="text-xs text-white/80 mt-1">CSE / IT Placed</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
