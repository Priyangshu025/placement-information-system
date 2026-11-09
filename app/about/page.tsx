import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getCurrentUser } from '@/lib/auth';
import { CheckCircle2, Target, Award, Users, Shield, BookOpen } from 'lucide-react';

export default async function AboutPage() {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentRole={currentUser?.role} />

      <div className="bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">
            Campus Placement Cell
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold mt-2 tracking-tight">
            About Our Placement Cell
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Bridging the gap between academic brilliance and premier industrial opportunities through dedicated training, automated processes, and strategic corporate partnerships.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Objectives & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Our Mission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To achieve 100% meaningful employment for all eligible graduates by nurturing competencies, offering career counseling, and bringing top global tier-1 recruiters to campus.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Pre-Placement Training</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Regular aptitude training, full-stack mock interviews, algorithmic hackathons, communication workshops, and resume-building bootcamps starting from semester 5.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Transparent Governance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automated rules-driven shortlisting that guarantees equal opportunity and strictly eliminates bias through transparent CGPA and backlog criterion enforcement.
            </p>
          </div>
        </div>

        {/* Placement Office Leadership */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Placement Cell Leadership
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80"
                alt="TPO Officer"
                className="w-24 h-24 rounded-full mx-auto object-cover mb-4 ring-4 ring-indigo-50"
              />
              <h4 className="font-bold text-slate-900">Dr. K. Ramanathan</h4>
              <p className="text-xs font-semibold text-indigo-600">Head — Training & Placement (TPO)</p>
              <p className="text-xs text-slate-500 mt-2">Ph.D. in Computer Science, 18+ years corporate industry relations.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80"
                alt="Assistant TPO"
                className="w-24 h-24 rounded-full mx-auto object-cover mb-4 ring-4 ring-purple-50"
              />
              <h4 className="font-bold text-slate-900">Prof. Meenakshi Iyer</h4>
              <p className="text-xs font-semibold text-purple-600">Deputy TPO & Corporate Lead</p>
              <p className="text-xs text-slate-500 mt-2">Specializes in core engineering and tech product hiring partnerships.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"
                alt="Student Coordinator"
                className="w-24 h-24 rounded-full mx-auto object-cover mb-4 ring-4 ring-emerald-50"
              />
              <h4 className="font-bold text-slate-900">Aditya Roy</h4>
              <p className="text-xs font-semibold text-emerald-600">Lead Student Placement Coordinator</p>
              <p className="text-xs text-slate-500 mt-2">Senior Undergraduate, President of Campus Recruitment Council.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

