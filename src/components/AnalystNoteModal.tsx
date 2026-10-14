import React, { useState } from 'react';
import { ANALYST_HANDOFF_NOTE } from '../data/projectData';
import { X, Copy, Check, FileText, Download } from 'lucide-react';

interface AnalystNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalystNoteModal: React.FC<AnalystNoteModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(ANALYST_HANDOFF_NOTE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([ANALYST_HANDOFF_NOTE], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'GameZone_Analyst_Handoff_Note.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 my-8 text-slate-100 max-h-[90vh] flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-indigo-950/80 border border-indigo-700/60 rounded-lg text-indigo-400">
              <FileText className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-100">
                Senior BI Analyst Handoff Note
              </h2>
              <p className="text-xs text-slate-400">
                Official documentation for downstream Power BI / Tableau developers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Monospace Document Container */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-y-auto max-h-[50vh] font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap select-all">
          {ANALYST_HANDOFF_NOTE}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-800 pt-4 mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Note Text</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-slate-100 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .TXT</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
