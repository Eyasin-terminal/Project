import React from 'react';
import { Sparkles, FileText, ExternalLink, Mail } from 'lucide-react';

interface NavbarProps {
  onOpenFastTrack: () => void;
  onOpenAnalystNote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenFastTrack, onOpenAnalystNote }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single text element, no adjacent badges) */}
        <a 
          href="#top" 
          className="text-base font-semibold tracking-tight text-slate-100 hover:text-indigo-400 transition-colors whitespace-nowrap shrink-0"
        >
          Eyasin <span className="text-slate-400 font-normal">/ BI Analyst</span>
        </a>

        {/* Zone 2: 4-5 clean single-line nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-400">
          <a href="#overview" className="hover:text-slate-200 transition-colors whitespace-nowrap shrink-0">
            Overview
          </a>
          <a href="#data-inspector" className="hover:text-slate-200 transition-colors whitespace-nowrap shrink-0">
            Data Inspector
          </a>
          <a href="#root-cause" className="hover:text-slate-200 transition-colors whitespace-nowrap shrink-0">
            Root Cause Lab
          </a>
          <a href="#executive-findings" className="hover:text-slate-200 transition-colors whitespace-nowrap shrink-0">
            Board Insights
          </a>
          <a href="#issue-log" className="hover:text-slate-200 transition-colors whitespace-nowrap shrink-0">
            Issue Log
          </a>
          <button
            onClick={onOpenAnalystNote}
            className="hover:text-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Handoff Note</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenFastTrack}
            className="px-4 py-2 text-xs font-semibold text-slate-900 bg-indigo-400 hover:bg-indigo-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 shadow-sm shadow-indigo-900/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>Recruiter 30s Pitch</span>
          </button>
        </div>
      </div>
    </header>
  );
};
