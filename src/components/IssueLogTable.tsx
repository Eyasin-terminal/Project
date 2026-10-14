import React, { useState, useMemo } from 'react';
import { ISSUE_LOG_DATA, IssueLogItem } from '../data/projectData';
import { 
  FileSpreadsheet, 
  Download, 
  Search, 
  Filter, 
  AlertCircle, 
  CheckCircle, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';

export const IssueLogTable: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('ISSUE-01');

  // Filtered issues
  const filteredIssues = useMemo(() => {
    return ISSUE_LOG_DATA.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      return true;
    });
  }, [selectedCategory]);

  // Export Issue Log to real CSV
  const handleExportCSV = () => {
    const headers = ['Issue ID', 'Category', 'Anomaly Name', 'Frequency', 'Percentage', 'Action Taken', 'Root Cause', 'Commercial Impact', 'Remediation Details'];
    const rows = ISSUE_LOG_DATA.map((item) => [
      `"${item.id}"`,
      `"${item.category}"`,
      `"${item.anomalyName}"`,
      `"${item.frequency}"`,
      `"${item.percentage}"`,
      `"${item.actionTaken}"`,
      `"${item.rootCause.replace(/"/g, '""')}"`,
      `"${item.commercialImpact.replace(/"/g, '""')}"`,
      `"${item.remediationDetails.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'GameZone_Data_Audit_Issue_Log.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="issue-log" className="py-16 border-b border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-1">
              <span>Data Governance & Quality Assurance</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Full Audit Trail</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
              The Master Issue Log & Remediation Register
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Every data flaw cataloged with exact frequencies, commercial risks, and engineering actions. Demonstrates non-destructive data engineering standards.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Export Issue Log (CSV)</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-medium text-slate-400 mr-2 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Filter Category:</span>
          </span>
          {['all', 'Logistics Logic', 'Identity Logic', 'Financial Integrity', 'Geographic Data'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Audit Categories' : cat}
            </button>
          ))}
        </div>

        {/* Issue Log List / Table */}
        <div className="space-y-4">
          {filteredIssues.map((issue) => {
            const isExpanded = expandedId === issue.id;

            return (
              <div
                key={issue.id}
                className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-lg transition-all"
              >
                {/* Collapsible Header */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : issue.id)}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-850/60 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded border border-indigo-800/60">
                      {issue.id}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-slate-400 uppercase">
                          {issue.category}
                        </span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-[11px] font-mono tabular-nums text-slate-400">
                          {issue.frequency} ({issue.percentage})
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-100 mt-0.5">
                        {issue.anomalyName}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <span className={`text-xs px-2.5 py-1 rounded font-semibold font-mono ${
                      issue.actionTaken === 'Flagged'
                        ? 'bg-amber-950/50 text-amber-300 border border-amber-800/80'
                        : issue.actionTaken === 'Fixed'
                        ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-800/80'
                        : 'bg-rose-950/50 text-rose-300 border border-rose-800/80'
                    }`}>
                      Action: {issue.actionTaken}
                    </span>
                    <button className="text-slate-400 hover:text-slate-200 p-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-slate-800/80 bg-slate-950/70 p-5 sm:p-6 text-xs space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Root Cause */}
                      <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5">
                        <span className="font-semibold text-indigo-300 block mb-1">
                          Diagnosed Root Cause:
                        </span>
                        <p className="text-slate-300 leading-relaxed">
                          {issue.rootCause}
                        </p>
                      </div>

                      {/* Commercial Impact */}
                      <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5">
                        <span className="font-semibold text-rose-300 block mb-1">
                          Commercial Risk / Downstream Impact:
                        </span>
                        <p className="text-slate-300 leading-relaxed">
                          {issue.commercialImpact}
                        </p>
                      </div>
                    </div>

                    {/* Remediation Details */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3.5">
                      <span className="font-semibold text-emerald-300 block mb-1">
                        Remediation & Business Logic Applied:
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {issue.remediationDetails}
                      </p>
                    </div>

                    {/* Senior Analyst Note */}
                    <div className="bg-indigo-950/30 border border-indigo-900/50 rounded-lg p-3.5">
                      <span className="font-semibold text-indigo-200 flex items-center gap-1.5 mb-1">
                        <FileText className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Eyasin's Lead Analyst Commentary:</span>
                      </span>
                      <p className="text-slate-300 italic leading-relaxed">
                        "{issue.seniorAnalystNote}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
