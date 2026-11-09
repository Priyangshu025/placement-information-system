'use client';

import React, { useState } from 'react';
import { Bell, Send, CheckCircle2, Users, Radio } from 'lucide-react';

export default function TpoBroadcastClient() {
  const [targetAudience, setTargetAudience] = useState('ALL');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [broadcasted, setBroadcasted] = useState(false);
  const [history, setHistory] = useState([
    {
      id: 'b-1',
      title: 'Google SDE-1 Technical Interviews Scheduled for Nov 12',
      target: 'All Eligible CSE/IT/AIDS Candidates',
      time: '2026-11-05T16:30:00Z',
      deliveredTo: 142,
    },
    {
      id: 'b-2',
      title: 'Mandatory Aptitude & Codility Simulation Test on Weekend',
      target: 'All 7th Semester Students',
      time: '2026-10-28T09:00:00Z',
      deliveredTo: 1750,
    },
  ]);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;

    const newBroadcast = {
      id: `b-${Date.now()}`,
      title,
      target: targetAudience === 'ALL' ? 'All Registered Students' : `Department: ${targetAudience}`,
      time: new Date().toISOString(),
      deliveredTo: targetAudience === 'ALL' ? 1750 : 280,
    };

    setHistory([newBroadcast, ...history]);
    setBroadcasted(true);
    setTitle('');
    setMessage('');
    setTimeout(() => setBroadcasted(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Broadcast Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Broadcast Campus Announcement</h3>
            <p className="text-xs text-slate-500">Dispatch instant in-app alerts and notifications to enrolled students.</p>
          </div>
        </div>

        {broadcasted && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Announcement successfully broadcasted to student notification centers!</span>
          </div>
        )}

        <form onSubmit={handleBroadcast} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Audience</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-medium"
              >
                <option value="ALL">All Registered Students (1,750)</option>
                <option value="CSE">Computer Science & Engineering (CSE)</option>
                <option value="IT">Information Technology (IT)</option>
                <option value="AIDS">Artificial Intelligence & Data Science (AIDS)</option>
                <option value="ECE">Electronics & Communication (ECE)</option>
                <option value="EEE">Electrical & Electronics (EEE)</option>
                <option value="MECH">Mechanical Engineering (MECH)</option>
                <option value="CIVIL">Civil Engineering (CIVIL)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Announcement Subject / Headline</label>
              <input
                type="text"
                required
                placeholder="e.g. Microsoft Pre-Placement Talk Tomorrow at 4 PM"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Detailed Circular Content</label>
            <textarea
              rows={3}
              required
              placeholder="Provide briefing, reporting requirements, schedule, or links..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-sm transition-colors flex items-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Broadcast Announcement</span>
            </button>
          </div>
        </form>
      </div>

      {/* Broadcast History */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-4">Past Broadcast Log</h3>
        <div className="space-y-3">
          {history.map((h) => (
            <div
              key={h.id}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs"
            >
              <div>
                <h4 className="font-bold text-slate-900">{h.title}</h4>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Target: <span className="font-semibold text-purple-700">{h.target}</span> • Delivered to {h.deliveredTo} students
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {new Date(h.time).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

