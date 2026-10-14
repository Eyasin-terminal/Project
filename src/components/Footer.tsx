import React from 'react';
import { Mail, Github, FileSpreadsheet, Shield, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAnalystNote: () => void;
  onOpenFastTrack: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAnalystNote, onOpenFastTrack }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Wordmark & Role */}
          <div className="md:col-span-2">
            <span className="text-sm font-bold text-slate-100 block mb-2">
              Eyasin · BI & Data Quality Analyst
            </span>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mb-4">
              Specializing in enterprise data auditing, commercial logic transformation, and executive business intelligence dashboards. Turning messy datasets into trustworthy strategic assets.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <a
                href="mailto:eyasin.113t@gmail.com?subject=Inquiry%20from%20GameZone%20Audit%20Portfolio"
                className="hover:text-indigo-400 transition-colors flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>eyasin.113t@gmail.com</span>
              </a>
              <span className="text-slate-700">·</span>
              <a
                href="https://github.com/Eyasin_terminal"
                target="_blank"
                rel="noreferrer"
                className="hover:text-indigo-400 transition-colors flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Eyasin_terminal</span>
              </a>
            </div>
          </div>

          {/* Col 2: Project Deliverables */}
          <div>
            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider block mb-3">
              Audit Deliverables
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenFastTrack}
                  className="hover:text-slate-200 transition-colors text-left cursor-pointer"
                >
                  Recruiter 30-Second Fast Track
                </button>
              </li>
              <li>
                <a href="#data-inspector" className="hover:text-slate-200 transition-colors">
                  Interactive Before vs After Grid
                </a>
              </li>
              <li>
                <a href="#root-cause" className="hover:text-slate-200 transition-colors">
                  Root Cause Investigation Cases
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAnalystNote}
                  className="hover:text-slate-200 transition-colors text-left cursor-pointer"
                >
                  Lead Analyst Handoff Note
                </button>
              </li>
              <li>
                <a href="#issue-log" className="hover:text-slate-200 transition-colors">
                  Master Issue Log (CSV Export)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Standards & Repository */}
          <div>
            <span className="text-xs font-semibold text-slate-200 uppercase tracking-wider block mb-3">
              Governance & Framework
            </span>
            <ul className="space-y-2 text-slate-400">
              <li>MS Excel 365 Data Modeling</li>
              <li>ISO 3166-1 Geo Normalization</li>
              <li>Non-Destructive Audit Logging</li>
              <li>License: Apache 2.0 Open Source</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © 2026 Eyasin. GameZone Global Data Integrity & Supply Chain Audit Portfolio.
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 hover:text-slate-300 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
