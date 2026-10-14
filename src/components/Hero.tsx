import React from 'react';
import { ArrowDown, Database, ShieldCheck, Cpu, Clock, CheckCircle2, AlertTriangle, Sparkles, Download, GitBranch } from 'lucide-react';
import { AUDIT_METRICS } from '../data/projectData';

interface HeroProps {
  onOpenFastTrack: () => void;
  onExploreData: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenFastTrack, onExploreData }) => {
  return (
    <section id="overview" className="relative pt-12 pb-16 border-b border-slate-800/80">
      {/* Background radial gradient glow for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Unboxed metadata line with typographic separators (Zero-Pill discipline) */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400 mb-5">
          <span className="text-indigo-400 font-semibold tracking-wide uppercase">Portfolio Showcase</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Role: BI Analyst</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Domain: Global E-Commerce & Retail</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Core Tool: MS Excel & Relational Modeling</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>License: Apache 2.0</span>
        </div>

        {/* 2-Column Split: Hero Headline & Value Proposition + Visual Flow Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-12">
          {/* Left Column: Headline, Narrative, and Recruiter-Focused CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-50 tracking-tight leading-[1.15] mb-5 [text-wrap:balance]">
              Data Integrity & Supply Chain Audit for GameZone Global
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 max-w-2xl">
              When executive boards prepare for quarterly strategy, raw retail data often hides catastrophic logic errors. 
              Instead of basic null-checking, I applied <strong className="text-indigo-300 font-semibold">commercial business logic</strong> to uncover systemic operational glitches, protecting <strong className="text-emerald-300 font-semibold">$382K+ in revenue</strong> and establishing a verified Golden Dataset for C-suite decision making.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenFastTrack}
                className="px-5 py-2.5 text-sm font-semibold text-slate-950 bg-indigo-400 hover:bg-indigo-300 rounded-lg transition-colors cursor-pointer flex items-center gap-2 shadow-sm shadow-indigo-950"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>30-Second Recruiter Pitch</span>
              </button>

              <button
                onClick={onExploreData}
                className="px-5 py-2.5 text-sm font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors cursor-pointer flex items-center gap-2"
              >
                <Database className="w-4 h-4 text-indigo-400" />
                <span>Inspect Before vs After Data</span>
              </button>

              <a
                href="#root-cause"
                className="px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5"
              >
                <span>View Root Cause Cases</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Visual Data Pipeline Architecture Diagram */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col justify-between shadow-xl">
            <div className="border-b border-slate-800/80 pb-3 mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-200">Audit Architecture & Data Flow</h3>
                <p className="text-xs text-slate-400">Master Sales + Regional Geocodes to Golden Dataset</p>
              </div>
              <span className="text-xs font-mono text-indigo-400 tabular-nums">12,450 Rows</span>
            </div>

            {/* Pipeline visual steps */}
            <div className="space-y-3 my-auto">
              {/* Step 1 */}
              <div className="bg-slate-950/70 border border-slate-800/90 rounded-lg p-3 flex items-start gap-3">
                <div className="p-2 bg-slate-800 rounded-md shrink-0 mt-0.5">
                  <Database className="w-4 h-4 text-slate-300" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200">1. Ingestion: Corrupted Raw Feeds</span>
                    <span className="text-[11px] font-mono text-rose-400 tabular-nums">1,580 Anomaly Flags</span>
                  </div>
                  <p className="text-[12px] text-slate-400 mt-0.5">
                    Multi-channel POS terminals + Web checkout database. Compromised with negative transit dates & ID collisions.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-slate-950/70 border border-indigo-900/40 rounded-lg p-3 flex items-start gap-3">
                <div className="p-2 bg-indigo-950/80 border border-indigo-800/60 rounded-md shrink-0 mt-0.5">
                  <Cpu className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200">2. Commercial Logic Transformation</span>
                    <span className="text-[11px] font-mono text-indigo-300">4 Core Business Rules</span>
                  </div>
                  <p className="text-[12px] text-slate-400 mt-0.5">
                    Testing business impossibilities: Shipping &gt; Purchase, User uniqueness, $0 fraud detection, and ISO geo-mapping.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-slate-950/70 border border-emerald-900/40 rounded-lg p-3 flex items-start gap-3">
                <div className="p-2 bg-emerald-950/80 border border-emerald-800/60 rounded-md shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200">3. Golden Dataset & Audit Trail</span>
                    <span className="text-[11px] font-mono text-emerald-400 tabular-nums">100% Audit Readiness</span>
                  </div>
                  <p className="text-[12px] text-slate-400 mt-0.5">
                    Non-destructive remediation: revenue protected, operational flags isolated, bug tickets escalated to Web Eng.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom footnote */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
                <span>Issue Log + Downstream Analyst Memo</span>
              </span>
              <span className="text-slate-500">Power BI / Tableau Ready</span>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Strip in a full-width row below the hero split */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-slate-400">Audited Universe</span>
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-slate-100">
              {AUDIT_METRICS.totalRecords.toLocaleString()}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Master sales rows analyzed across 4 global retail regions
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-slate-400">Time-Travel Anomaly</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-amber-300">
              {AUDIT_METRICS.timeTravelPercentage}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              1,139 rows isolated; <strong className="text-slate-200">{AUDIT_METRICS.flaggedRevenuePreserved}</strong> sales revenue preserved
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-slate-400">Race Condition Bug</span>
              <Cpu className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-rose-300">
              100% Correlation
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Diagnosed strictly to Nintendo Switch + Website flash sales
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-slate-400">Audited True Delivery</span>
              <Clock className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-emerald-300">
              {AUDIT_METRICS.averageDeliveryDaysClean}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Corrected flawed 1.4d metric caused by negative delivery dates
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
