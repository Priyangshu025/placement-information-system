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
    <div className="flex flex-col min-h-screen bg-page">
      <Navbar />

      <section className="border-b border-border-subtle bg-surface py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase font-semibold text-accent tracking-wider">
            Placement & Career Guidance Cell
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-ink mt-2 tracking-tight">
            Contact Placement Office
          </h1>
          <p className="mt-4 text-ink-muted max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Have questions regarding campus recruitment drives, student eligibility, company onboarding, or interview slots? Reach out to our TPO desk.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-ink tracking-tight">Office Information</h2>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                The Placement Cell is located centrally within the Academic Boulevard. Recruiters and students are welcome during official counseling hours.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4 panel-card p-5 rounded-card">
                <div className="w-10 h-10 rounded-control bg-accent-soft text-accent flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-ink">Campus Location</h4>
                  <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                    Level 3, Career Development & Placement Directorate,<br />
                    Main Academic Block, Tech Campus Boulevard
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 panel-card p-5 rounded-card">
                <div className="w-10 h-10 rounded-control bg-accent-soft text-accent flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-ink">Email Enquiries</h4>
                  <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                    General Inquiries: <span className="font-medium text-ink">tpo@campus.edu</span><br />
                    Corporate Partnerships: <span className="font-medium text-ink">corporate.relations@campus.edu</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 panel-card p-5 rounded-card">
                <div className="w-10 h-10 rounded-control bg-accent-soft text-accent flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-ink">Helpline Numbers</h4>
                  <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                    Placement Office Direct: +91 80 2345 6789<br />
                    TPO Officer Desk: Ext 402 / 405
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 panel-card p-5 rounded-card">
                <div className="w-10 h-10 rounded-control bg-accent-soft text-accent flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-ink">Working Hours</h4>
                  <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                    Monday to Friday: 08:30 AM – 05:30 PM<br />
                    Saturday (During Active Drive Week): 09:00 AM – 01:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="panel-card rounded-feature p-8">
            <h3 className="text-lg font-bold text-ink mb-2">Send an Official Inquiry</h3>
            <p className="text-xs text-ink-muted mb-6">
              Our placement coordinators respond within 24 business hours.
            </p>

            {submitted ? (
              <div className="p-6 rounded-card bg-state-success-soft border border-state-success/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-state-success mx-auto" />
                <h4 className="text-sm font-semibold text-ink">Message Transmitted</h4>
                <p className="text-xs text-ink-muted">
                  Thank you for reaching out. Your inquiry has been forwarded to the Training & Placement Directorate.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-ink-secondary mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3.5 py-2.5 rounded-control border border-border-subtle bg-page/50 text-ink placeholder:text-ink-tertiary focus:outline-none focus:border-accent focus:bg-surface text-xs transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-medium text-ink-secondary mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="e.g. priya.sharma@campus.edu"
                    className="w-full px-3.5 py-2.5 rounded-control border border-border-subtle bg-page/50 text-ink placeholder:text-ink-tertiary focus:outline-none focus:border-accent focus:bg-surface text-xs transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-medium text-ink-secondary mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="e.g. Recruitment Drive Inquiry / Eligibility Query"
                    className="w-full px-3.5 py-2.5 rounded-control border border-border-subtle bg-page/50 text-ink placeholder:text-ink-tertiary focus:outline-none focus:border-accent focus:bg-surface text-xs transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-medium text-ink-secondary mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your detailed query or message here..."
                    className="w-full px-3.5 py-2.5 rounded-control border border-border-subtle bg-page/50 text-ink placeholder:text-ink-tertiary focus:outline-none focus:border-accent focus:bg-surface text-xs transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-2.5 rounded-control text-xs font-medium flex items-center justify-center space-x-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
