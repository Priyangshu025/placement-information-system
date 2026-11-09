'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">
            Placement & Career Guidance Cell
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold mt-2 tracking-tight">
            Contact Placement Office
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Have questions regarding campus recruitment drives, student eligibility, company onboarding, or interview slots? Reach out to our TPO desk.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Office Information</h2>
              <p className="mt-2 text-sm text-slate-600">
                The Placement Cell is located centrally within the Academic Boulevard. Recruiters and students are welcome during official counseling hours.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Campus Location</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Level 3, Career Development & Placement Directorate,<br />
                    Main Academic Block, Tech Campus Boulevard
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Email Enquiries</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    General Inquiries: <span className="font-semibold text-slate-800">tpo@campus.edu</span><br />
                    Corporate Partnerships: <span className="font-semibold text-slate-800">corporate.relations@campus.edu</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Helpline Numbers</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Placement Office Direct: +91 80 2345 6789<br />
                    TPO Officer Desk: Ext 402 / 405
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Working Hours</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Monday to Friday: 08:30 AM – 05:30 PM<br />
                    Saturday (During Active Drive Week): 09:00 AM – 01:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Send an Official Inquiry</h3>
            <p className="text-xs text-slate-500 mb-6">
              Recruiting managers, HR partners, and students can submit inquiries directly.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base">Inquiry Dispatched</h4>
                <p className="text-xs leading-relaxed">
                  Thank you! Your message has been routed to the Training & Placement Cell. An officer will respond within 1 business day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-emerald-700 underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. Priya Sharma or Recruiter Name"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Institutional or Company Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="name@domain.edu / com"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Inquiry Subject</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. Campus Recruitment Slot Scheduling / Profile Verification"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Detailed Message</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Provide details about your query..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2 shadow-sm transition-colors text-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry to TPO</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

