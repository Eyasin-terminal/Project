import React, { useState } from 'react';
import { Check, Copy, Sparkles, X, Mail, Award, ArrowRight, ShieldCheck, Briefcase } from 'lucide-react';
import { RESUME_BULLET_POINTS, AUDIT_METRICS } from '../data/projectData';

interface RecruiterFastTrackProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecruiterFastTrack: React.FC<RecruiterFastTrackProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = () => {
    const allText = RESUME_BULLET_POINTS.map(
      (cat) => `[${cat.role}]\n` + cat.bullets.map((b) => `• ${b}`).join('\n')
    ).join('\n\n');
    navigator.clipboard.writeText(allText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-5 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 bg-indigo-950/80 border border-indigo-700/60 rounded-md text-indigo-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                Recruiter 30-Second Fast Track
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-50">
              The Executive Pitch: Why This Project Proves Senior Analytical Acumen
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 30-Second Scannable Executive Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wide">
              01. The Problem
            </span>
            <h3 className="text-sm font-semibold text-slate-100 mt-1 mb-2">
              Corrupted Sales Data
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              12,450 transactions had critical logic flaws: 9.15% showed deliveries before purchases, $0 unbacked checkouts, and customer ID duplication.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wide">
              02. The BI Decision
            </span>
            <h3 className="text-sm font-semibold text-slate-100 mt-1 mb-2">
              Commercial Logic Over Deletion
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              A junior analyst would delete 9% of rows. Eyasin preserved <strong className="text-slate-200">{AUDIT_METRICS.flaggedRevenuePreserved}</strong> in valid revenue by engineering dual validation flags and isolating scanner clock drift.
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wide">
              03. The High-Impact Win
            </span>
            <h3 className="text-sm font-semibold text-slate-100 mt-1 mb-2">
              Diagnosed Web Race Condition
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Discovered a 100% correlation between duplicate IDs and Nintendo Switch flash sales on the website, delivering actionable technical root causes to Web Engineering.
            </p>
          </div>
        </div>

        {/* What This Proves About Eyasin */}
        <div className="bg-indigo-950/30 border border-indigo-900/60 rounded-xl p-5 mb-8">
          <h3 className="text-sm font-semibold text-indigo-300 flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-indigo-400" />
            <span>Why Eyasin Is Ready For Your BI / Data Team</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Understands "The So What":</strong> Connects data anomalies directly to financial statements and customer lifetime value (CLV).</span>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Cross-Functional Communicator:</strong> Produces clean executive summaries for C-suite and reproducible bug tickets for engineers.</span>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Relational Rigor:</strong> Mastered data normalization, XLOOKUP / INDEX-MATCH dimension joins, and non-destructive audit logs.</span>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Self-Directed Investigator:</strong> Formulates multi-variable correlation hypotheses instead of waiting for hand-holding.</span>
            </div>
          </div>
        </div>

        {/* ATS-Optimized Resume Bullets (Ready to Copy) */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-200">
                Pre-Formatted Resume Bullets for Eyasin's File
              </h3>
              <p className="text-xs text-slate-400">
                Tailored for BI Analyst, Data QA, or Analytics Engineer roles
              </p>
            </div>
            <button
              onClick={handleCopyAll}
              className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {copiedAll ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied All!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy All Bullets</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-4">
            {RESUME_BULLET_POINTS.map((group, gIdx) => (
              <div key={gIdx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                <span className="text-xs font-semibold text-slate-300 block mb-2">
                  {group.role}
                </span>
                <ul className="space-y-2">
                  {group.bullets.map((bullet, bIdx) => {
                    const globalIdx = gIdx * 10 + bIdx;
                    return (
                      <li
                        key={bIdx}
                        className="group flex items-start justify-between gap-3 text-xs text-slate-300 leading-relaxed hover:text-slate-100 transition-colors"
                      >
                        <span className="flex items-start gap-2">
                          <span className="text-indigo-400 font-bold shrink-0">•</span>
                          <span>{bullet}</span>
                        </span>
                        <button
                          onClick={() => handleCopy(bullet, globalIdx)}
                          className="opacity-60 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-all shrink-0 cursor-pointer"
                          title="Copy this bullet"
                        >
                          {copiedIndex === globalIdx ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Contact */}
        <div className="border-t border-slate-800 pt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Ready to discuss this case study?</span>
            <a
              href="mailto:eyasin.113t@gmail.com?subject=Interview%20Inquiry%20-%20GameZone%20BI%20Audit%20Portfolio"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-indigo-400 hover:bg-indigo-300 rounded-lg transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Eyasin (eyasin.113t@gmail.com)</span>
            </a>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
