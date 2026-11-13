import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getCurrentUser } from '@/lib/auth';
import { Target, Award, Shield, CheckCircle2, Building2, Users } from 'lucide-react';

export default async function AboutPage() {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex flex-col min-h-screen bg-page">
      <Navbar currentRole={currentUser?.role} />

      {/* Hero Header */}
      <section className="border-b border-border-subtle bg-surface py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-semibold text-accent tracking-wider">
            Campus Placement Cell
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-ink mt-2 tracking-tight">
            About Our Placement Cell
          </h1>
          <p className="mt-4 text-ink-muted max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Bridging academic excellence and industry leadership through structured career training, automated placement workflows, and strategic corporate partnerships.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Objectives & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="panel-card rounded-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-control bg-accent-soft text-accent flex items-center justify-center mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-ink mb-2">Our Mission</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                To achieve meaningful career outcomes for all eligible graduates by nurturing engineering competencies, offering one-on-one career counseling, and hosting premier global recruiters.
              </p>
            </div>
          </div>

          <div className="panel-card rounded-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-control bg-accent-soft text-accent flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-ink mb-2">Pre-Placement Preparation</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Regular algorithmic problem solving, mock technical interviews, communication workshops, and resume extraction bootcamps conducted from the 5th semester onward.
              </p>
            </div>
          </div>

          <div className="panel-card rounded-card p-6 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-control bg-accent-soft text-accent flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-ink mb-2">Transparent Governance</h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Automated policy-driven shortlisting guaranteeing equal opportunity and eliminating human bias through strict CGPA and backlog criterion evaluation.
              </p>
            </div>
          </div>
        </div>

        {/* Placement Office Leadership */}
        <div>
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">
              Administration
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight mt-1">
              Placement Cell Directorate
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted mt-1">
              Experienced faculty heads and student council leaders dedicated to student career success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="panel-card rounded-card p-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80"
                alt="Dr. K. Ramanathan"
                className="w-20 h-20 rounded-full mx-auto object-cover mb-4 ring-2 ring-border-subtle"
              />
              <h4 className="font-semibold text-sm text-ink">Dr. K. Ramanathan</h4>
              <p className="text-xs font-medium text-accent mt-0.5">Head — Training & Placement (TPO)</p>
              <p className="text-xs text-ink-muted mt-2 leading-relaxed">Ph.D. in Computer Science, 18+ years corporate industry relations.</p>
            </div>

            <div className="panel-card rounded-card p-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80"
                alt="Prof. Meenakshi Iyer"
                className="w-20 h-20 rounded-full mx-auto object-cover mb-4 ring-2 ring-border-subtle"
              />
              <h4 className="font-semibold text-sm text-ink">Prof. Meenakshi Iyer</h4>
              <p className="text-xs font-medium text-accent mt-0.5">Deputy TPO & Corporate Lead</p>
              <p className="text-xs text-ink-muted mt-2 leading-relaxed">Specializes in core engineering and tech product hiring partnerships.</p>
            </div>

            <div className="panel-card rounded-card p-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
                alt="Aditya Roy"
                className="w-20 h-20 rounded-full mx-auto object-cover mb-4 ring-2 ring-border-subtle"
              />
              <h4 className="font-semibold text-sm text-ink">Aditya Roy</h4>
              <p className="text-xs font-medium text-accent mt-0.5">Lead Student Placement Coordinator</p>
              <p className="text-xs text-ink-muted mt-2 leading-relaxed">Senior Undergraduate, President of Campus Recruitment Council.</p>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div className="panel-card rounded-feature p-8 sm:p-10">
          <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="text-xl font-bold text-ink text-center tracking-tight">
              Institutional Placement Charter
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="text-ink-secondary">Strict adherence to "One Student One Dream Offer" policy.</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="text-ink-secondary">Zero tolerance for academic backlog misrepresentation.</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="text-ink-secondary">Real-time candidate notifications for online assessments.</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="text-ink-secondary">100% verified offer letters archived in the university ledger.</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
