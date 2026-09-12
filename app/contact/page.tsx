'use client';

import React, { useState } from 'react';
import {
  Mail,
  Send,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('Feedback & Feature Request');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-mono font-semibold text-indigo-300">
          <Mail className="h-3.5 w-3.5 text-indigo-400" />
          <span>Direct Studio Communication</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          Contact ColorTools Studio
        </h1>
        <p className="text-base text-zinc-400 leading-relaxed">
          Have an algorithmic suggestion, feature request, partnership inquiry, or need assistance implementing accessible design tokens? Our design technologists are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl border border-white/[0.1] bg-[#12141A] p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-indigo-400" />
              <span>Send a Message</span>
            </h3>
            <span className="text-xs font-mono text-zinc-400">Response time &lt; 24h</span>
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center space-y-4 animate-in fade-in duration-200">
              <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h4 className="text-xl font-bold text-white">Message Received!</h4>
              <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out, <span className="font-semibold text-white">{name}</span>. A member of our design team will review your message and reply to <span className="font-semibold text-white">{email}</span> promptly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] px-4 py-2 text-xs font-semibold text-white transition-colors"
              >
                <span>Send Another Message</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 uppercase font-semibold">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border border-white/[0.1] bg-[#181B24] px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 uppercase font-semibold">
                    Work Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full rounded-xl border border-white/[0.1] bg-[#181B24] px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-400 uppercase font-semibold">
                  Inquiry Topic
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-xl border border-white/[0.1] bg-[#181B24] px-4 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none cursor-pointer"
                >
                  <option value="Feedback & Feature Request">Feedback &amp; Feature Request</option>
                  <option value="Color Science / WCAG Question">Color Science / WCAG Question</option>
                  <option value="Enterprise Design System Integration">Enterprise Design System Integration</option>
                  <option value="General Studio Inquiry">General Studio Inquiry</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-400 uppercase font-semibold">
                  Detailed Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your question, request, or feedback..."
                  className="w-full rounded-xl border border-white/[0.1] bg-[#181B24] px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-500/20 hover:from-indigo-600 hover:to-purple-700 transition-all active:scale-[0.99]"
              >
                <Send className="h-4 w-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Studio Info Sidebar (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-white/[0.1] bg-[#12141A] p-8 shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-white">Studio Channels</h3>

            <div className="space-y-4 text-sm text-zinc-300">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-zinc-500 font-semibold">Email Desk</p>
                  <p className="font-semibold text-white">support@colortools.studio</p>
                  <p className="text-xs text-zinc-400">Direct engineering mailbox</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-zinc-500 font-semibold">Operating Hours</p>
                  <p className="font-semibold text-white">Monday – Friday</p>
                  <p className="text-xs text-zinc-400">08:00 – 18:00 UTC (Global remote)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-zinc-500 font-semibold">Headquarters</p>
                  <p className="font-semibold text-white">San Francisco, CA &amp; Zurich, CH</p>
                  <p className="text-xs text-zinc-400">Distributed design technology studio</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick links card */}
          <div className="rounded-3xl border border-white/[0.1] bg-[#12141A] p-6 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span>Looking for quick answers?</span>
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Check our extensive guide section for answers to common questions regarding WCAG 2.2 calculations and OKLCH color spaces.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <span>Read Studio FAQ</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
