import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DataInspector } from './components/DataInspector';
import { RootCauseDeepDive } from './components/RootCauseDeepDive';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { IssueLogTable } from './components/IssueLogTable';
import { SkillsMatrix } from './components/SkillsMatrix';
import { RecruiterFastTrack } from './components/RecruiterFastTrack';
import { AnalystNoteModal } from './components/AnalystNoteModal';
import { Footer } from './components/Footer';
import { Sparkles, Download, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

export default function App() {
  const [isFastTrackOpen, setIsFastTrackOpen] = useState(false);
  const [isAnalystNoteOpen, setIsAnalystNoteOpen] = useState(false);

  const handleExploreData = () => {
    const el = document.getElementById('data-inspector');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        onOpenFastTrack={() => setIsFastTrackOpen(true)}
        onOpenAnalystNote={() => setIsAnalystNoteOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Recruiter Floating Sticky Banner (Discreet, helpful for 30s scans) */}
        <div className="bg-indigo-950/40 border-b border-indigo-900/40 py-2.5 px-6">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-indigo-300">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>
                <strong>Recruiter Quick View:</strong> Have 60 seconds? Review the candidate's core business impact and ATS resume points.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFastTrackOpen(true)}
                className="px-3 py-1 font-semibold text-slate-950 bg-indigo-400 hover:bg-indigo-300 rounded-md transition-colors cursor-pointer text-xs"
              >
                Open 30s Executive Pitch
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <Hero
          onOpenFastTrack={() => setIsFastTrackOpen(true)}
          onExploreData={handleExploreData}
        />

        {/* Interactive Before vs After Data Inspector */}
        <DataInspector />

        {/* Root Cause Deep Dive: Time-Travel & Concurrency Cases */}
        <RootCauseDeepDive />

        {/* Executive Dashboard: The 3 Board Questions & Answers */}
        <ExecutiveDashboard />

        {/* Master Audit Issue Log Table */}
        <IssueLogTable />

        {/* Candidate Skills Matrix & Interview Prompts */}
        <SkillsMatrix />

        {/* Recruiter CTA Callout Section */}
        <section className="py-16 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950 border-t border-slate-800/80">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2 block">
              Candidate Availability
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-50 mb-3">
              Looking for a BI Analyst Who Discovers What Others Miss?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed">
              Eyasin combines analytical skepticism with commercial acumen. Ready to conduct rigorous data audits, build automated ETL logic, and deliver executive dashboards for your team.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:eyasin.113t@gmail.com?subject=Interview%20Inquiry%20-%20BI%20Analyst%20Role"
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-indigo-400 hover:bg-indigo-300 rounded-lg transition-colors inline-flex items-center gap-2 shadow-lg shadow-indigo-950/50"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Eyasin for Interview (eyasin.113t@gmail.com)</span>
              </a>
              <button
                onClick={() => setIsFastTrackOpen(true)}
                className="px-5 py-2.5 text-xs sm:text-sm font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>View ATS Resume Bullets</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        onOpenAnalystNote={() => setIsAnalystNoteOpen(true)}
        onOpenFastTrack={() => setIsFastTrackOpen(true)}
      />

      {/* Modals */}
      <RecruiterFastTrack
        isOpen={isFastTrackOpen}
        onClose={() => setIsFastTrackOpen(false)}
      />

      <AnalystNoteModal
        isOpen={isAnalystNoteOpen}
        onClose={() => setIsAnalystNoteOpen(false)}
      />
    </div>
  );
}
