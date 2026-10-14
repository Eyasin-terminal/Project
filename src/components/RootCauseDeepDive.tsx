import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Search, 
  Cpu, 
  Clock, 
  TrendingDown, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  FileCode,
  Flame,
  Zap,
  HelpCircle
} from 'lucide-react';
import { AUDIT_METRICS } from '../data/projectData';

export const RootCauseDeepDive: React.FC = () => {
  // Case 1 interactive state
  const [analystDecision, setAnalystDecision] = useState<'naive' | 'senior'>('senior');

  // Case 2 interactive correlation state
  const [selectedProduct, setSelectedProduct] = useState<string>('Nintendo Switch');
  const [selectedChannel, setSelectedChannel] = useState<string>('Website');

  // Compute collision likelihood in the interactive correlation simulator
  const isBugTriggered = selectedProduct === 'Nintendo Switch' && selectedChannel === 'Website';

  return (
    <section id="root-cause" className="py-16 border-b border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">
            <span>Core Differentiator · Analytical Skepticism</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Section 4 of Audit</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
            Root Cause Analysis: Beyond Simple Cleaning
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl leading-relaxed">
            Standard data cleaning stops at removing nulls. Senior BI analytics diagnoses <strong>systemic business failures</strong> and isolates technical bugs before they infect C-suite strategy.
          </p>
        </div>

        {/* 2 Landmark Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* CASE STUDY 1: Time Travel Operational Glitch */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4 mb-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>CASE 01 · 9.15% OF MASTER DATASET</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100">
                    The "Time Travel" Operational Glitch
                  </h3>
                </div>
                <span className="text-xs font-mono bg-amber-950/60 border border-amber-800/80 text-amber-300 px-2.5 py-1 rounded-md shrink-0 tabular-nums">
                  1,139 Orders
                </span>
              </div>

              {/* The Discovery */}
              <p className="text-xs text-slate-300 leading-relaxed mb-5">
                During preliminary data profiling, <strong className="text-amber-300">9.15% of records</strong> showed shipping and delivery timestamps preceding the customer's purchase date. A naive query like <code className="bg-slate-950 px-1 py-0.5 rounded text-amber-200">AVG(Delivery_Date - Purchase_Date)</code> yielded an absurd <strong className="text-rose-400">1.4 days</strong> due to negative time distortion.
              </p>

              {/* Interactive Decision Simulator: Junior vs Senior */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 mb-5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block mb-3">
                  Interactive Decision Simulator: Test the Strategic Trade-Off
                </span>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button
                    onClick={() => setAnalystDecision('naive')}
                    className={`p-2.5 rounded-lg text-left text-xs transition-all cursor-pointer border ${
                      analystDecision === 'naive'
                        ? 'bg-rose-950/30 border-rose-500/60 text-rose-200 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="font-semibold block mb-0.5">Junior Option:</span>
                    <span className="text-[11px] font-mono text-slate-400">DELETE WHERE Ship &lt; Order</span>
                  </button>

                  <button
                    onClick={() => setAnalystDecision('senior')}
                    className={`p-2.5 rounded-lg text-left text-xs transition-all cursor-pointer border ${
                      analystDecision === 'senior'
                        ? 'bg-emerald-950/30 border-emerald-500/60 text-emerald-200 shadow-sm'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="font-semibold block mb-0.5">Eyasin's Approach:</span>
                    <span className="text-[11px] font-mono text-emerald-400">FLAG Is_Valid_Logistics</span>
                  </button>
                </div>

                {/* Outcome Display */}
                {analystDecision === 'naive' ? (
                  <div className="space-y-2 text-xs border-t border-slate-800/80 pt-3 text-rose-300">
                    <div className="flex items-center justify-between">
                      <span>Revenue Erased from Books:</span>
                      <strong className="font-mono tabular-nums text-rose-400">-$382,400.00</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Executive Risk:</span>
                      <strong className="text-slate-200">Severely Understates Q3 Sales Performance</strong>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2">
                      ❌ Deleting 9% of rows to make the dates look pretty destroys real commercial transactions that actually occurred and generated cash.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 text-xs border-t border-slate-800/80 pt-3 text-emerald-300">
                    <div className="flex items-center justify-between">
                      <span>Revenue Protected & Verified:</span>
                      <strong className="font-mono tabular-nums text-emerald-400">+$382,400.00 (100% Intact)</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Audited True Delivery SLA:</span>
                      <strong className="font-mono tabular-nums text-emerald-400">3.8 Days (Accurate)</strong>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2">
                      ✅ Created dual consumption models: Financial team retains complete revenue, while Supply Chain team calculates transit lead times on verified rows only.
                    </p>
                  </div>
                )}
              </div>

              {/* Root Cause Conclusion */}
              <div className="text-xs text-slate-300 bg-slate-950/50 p-3.5 rounded-lg border border-slate-800">
                <span className="font-semibold text-indigo-300 block mb-1">
                  Operational Diagnosis:
                </span>
                Warehouse handheld barcode scanners in the Seattle hub were configured to UTC time zone while the e-commerce purchase DB was configured to US Pacific (PDT), creating an artificial backward 7-hour timestamp skew combined with batch upload lags.
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Remediation: Flagged & Escalated to Ops</span>
              <span className="text-emerald-400">Audit Status: Resolved</span>
            </div>
          </div>

          {/* CASE STUDY 2: The Nintendo Switch Concurrency Bug */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4 mb-5">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-rose-400 mb-1">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>CASE 02 · 100% CORRELATED ENGINEERING BUG</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-100">
                    The "Nintendo Switch" Concurrency Race Condition
                  </h3>
                </div>
                <span className="text-xs font-mono bg-rose-950/60 border border-rose-800/80 text-rose-300 px-2.5 py-1 rounded-md shrink-0 tabular-nums">
                  87 Collisions
                </span>
              </div>

              {/* The Discovery */}
              <p className="text-xs text-slate-300 leading-relaxed mb-5">
                During identity auditing, <strong className="text-rose-400">distinct User_IDs were sharing identical Order_IDs</strong>. While most analysts would assume random user input typos, Eyasin investigated the data cross-tabs and proved an astonishing <strong className="text-rose-300">100% correlation</strong>.
              </p>

              {/* Interactive Correlation Tester */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 mb-5">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block mb-3">
                  Interactive Correlation Lab: Test Eyasin's Hypothesis
                </span>

                <div className="space-y-3 mb-4">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">1. Select Product:</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                      {['Nintendo Switch', 'PlayStation 5', 'Xbox Series X', 'Accessories'].map((prod) => (
                        <button
                          key={prod}
                          onClick={() => setSelectedProduct(prod)}
                          className={`px-2 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer truncate ${
                            selectedProduct === prod
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                          }`}
                        >
                          {prod}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">2. Select Purchase Channel:</label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {['Website', 'Physical Store'].map((ch) => (
                        <button
                          key={ch}
                          onClick={() => setSelectedChannel(ch)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                            selectedChannel === ch
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                          }`}
                        >
                          {ch}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bug Trigger Result */}
                <div className={`p-3 rounded-lg border text-xs transition-all ${
                  isBugTriggered
                    ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold flex items-center gap-1.5">
                      {isBugTriggered ? (
                        <>
                          <Zap className="w-3.5 h-3.5 text-rose-400" />
                          <span className="text-rose-400">CRITICAL BUG TRIGGERED (100% MATCH)</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
                          <span>0 Collisions Detected (0.00%)</span>
                        </>
                      )}
                    </span>
                    <span className="font-mono tabular-nums">
                      {isBugTriggered ? '87 Collisions / 87 Tested' : '0 Anomalies'}
                    </span>
                  </div>
                  <p className="text-[11px] opacity-90">
                    {isBugTriggered
                      ? 'Every single duplicate Order ID in the entire 12,450-row company database occurred strictly on the Website channel during the midnight Nintendo Switch flash sale!'
                      : 'No race conditions found on this combination. Store POS registers and other consoles did not experience the collision.'}
                  </p>
                </div>
              </div>

              {/* Technical Root Cause */}
              <div className="text-xs text-slate-300 bg-slate-950/50 p-3.5 rounded-lg border border-slate-800">
                <span className="font-semibold text-indigo-300 block mb-1">
                  Technical Root Cause Diagnosed:
                </span>
                During the high-traffic web flash sale, the checkout server lacked row-level database locks. When multiple users clicked "Complete Purchase" within milliseconds, the web backend assigned the same sequence ID before committing the transaction!
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Remediation: Appended -A / -B & Ticket #ENG-4912</span>
              <span className="text-rose-400">Engineering Escalation</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
